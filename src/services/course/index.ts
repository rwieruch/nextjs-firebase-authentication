import omit from 'lodash.omit';

// import {
//   FirebaseCourseContent,
//   FirebaseCourse,
// } from '@services/firebase/course';

import { Course } from '@models/course';
import { COURSE } from '@data/course-keys';
import BUNDLE_LEGACY from '@data/bundle-legacy';
import allCourseContent from '@data/courses';
import storefront from '@data/course-storefront';

export const getUpgradeableCourses = (
  courseId: COURSE,
  courses: Course[]
) => {
  const purchasedBundlesByCourseId = courses.map(course => {
    const bundleId = course.bundleId;

    const storefrontCourse = storefront[courseId];
    const storefrontBundle = storefrontCourse.bundles[bundleId];

    return storefrontBundle;
  });

  const availableBundlesByCourseId = Object.values(
    storefront[courseId].bundles
  );

  const highestPurchasedBundleByCourseId = purchasedBundlesByCourseId.reduce(
    (acc, storefrontBundle) =>
      storefrontBundle.weight > acc.weight ? storefrontBundle : acc,
    { weight: 0, price: 0 }
  );

  const upgradeableBundles = availableBundlesByCourseId.filter(
    bundle => bundle.weight > highestPurchasedBundleByCourseId.weight
  );

  const upgradeableCourses = upgradeableBundles.map(bundle => ({
    ...storefront[courseId],
    bundle: {
      ...bundle,
      price: bundle.price - highestPurchasedBundleByCourseId.price,
    },
  }));

  return upgradeableCourses;
};

export const mergeCourses = (courses: Course[]) => {
  return courses.reduce((result: any[], course: Course) => {
    // MIGRATION START

    // There is no courseId mirgation yet.
    let courseId = course.courseId;

    // @ts-ignore
    let bundleId = BUNDLE_LEGACY[courseId][course.bundleId];
    if (!bundleId) {
      bundleId = course.bundleId;
    }

    // MIGRATION END

    const storefrontCourse = storefront[courseId];
    const storefrontBundle = storefrontCourse.bundles[bundleId];

    const {
      introduction,
      onboarding,
      bookDownload,
      bookOnline,
      curriculum,
    } = allCourseContent[courseId];

    const hasIntroduction = introduction.roles
      ? introduction.roles.includes(bundleId)
      : true;
    const allowedIntroduction = hasIntroduction
      ? introduction
      : omit(introduction, 'data');

    const hasOnboarding = onboarding.roles
      ? onboarding.roles.includes(bundleId)
      : true;
    const allowedOnboarding = hasOnboarding
      ? onboarding
      : omit(onboarding, 'data');

    const hasBookDownload = bookDownload.roles
      ? bookDownload.roles.includes(bundleId)
      : true;
    const allowedBookDownload = hasBookDownload
      ? bookDownload
      : omit(bookDownload, 'data');

    const hasBookOnline = bookOnline.roles
      ? bookOnline.roles.includes(bundleId)
      : true;
    const allowedBookOnline = hasBookOnline
      ? bookOnline
      : omit(bookOnline, 'data');

    const hasCurriculum = curriculum.roles
      ? curriculum.roles.includes(bundleId)
      : true;
    const allowedCurriculum = hasCurriculum
      ? curriculum
      : omit(curriculum, 'data');

    const canUpgrade =
      !hasIntroduction ||
      !hasOnboarding ||
      !hasBookDownload ||
      !hasBookOnline ||
      !hasCurriculum;

    const unlockedCourse = {
      courseId: courseId,
      bundleId: bundleId,

      header: storefrontCourse.header,
      url: storefrontCourse.url,
      imageUrl: storefrontBundle.imageUrl,

      weight: storefrontBundle.weight,
      canUpgrade,

      introduction: allowedIntroduction,
      onboarding: allowedOnboarding,
      bookDownload: allowedBookDownload,
      bookOnline: allowedBookOnline,
      curriculum: allowedCurriculum,
    };

    const index = result.findIndex(
      prevCourse => prevCourse.courseId === courseId
    );

    const mergeIfSame = (prevCourse: any, i: number) => {
      if (i === index) {
        const { courseId, header, url } = prevCourse;

        const moreWeight = prevCourse.weight >= unlockedCourse.weight;

        const imageUrl = moreWeight
          ? prevCourse.imageUrl
          : unlockedCourse.imageUrl;

        const bundleId = moreWeight
          ? prevCourse.bundleId
          : unlockedCourse.bundleId;

        const canUpgrade =
          prevCourse.canUpgrade && unlockedCourse.canUpgrade;

        const introduction = {
          ...prevCourse.introduction,
          ...unlockedCourse.introduction,
        };

        const onboarding = {
          ...prevCourse.onboarding,
          ...unlockedCourse.onboarding,
        };

        const bookDownload = {
          ...prevCourse.bookDownload,
          ...unlockedCourse.bookDownload,
        };

        const bookOnline = {
          ...prevCourse.bookOnline,
          ...unlockedCourse.bookOnline,
        };

        const curriculum = {
          ...prevCourse.curriculum,
          ...unlockedCourse.curriculum,
        };

        const mergedCourse = {
          courseId,
          bundleId,
          header,
          url,
          imageUrl,
          canUpgrade,
          introduction,
          onboarding,
          bookDownload,
          bookOnline,
          curriculum,
        };

        return mergedCourse;
      } else {
        return prevCourse;
      }
    };

    if (index > -1) {
      return result.map(mergeIfSame);
    } else {
      return result.concat(unlockedCourse);
    }
  }, []);
};
