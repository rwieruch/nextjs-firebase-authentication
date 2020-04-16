import {
  ObjectType,
  Field,
  Arg,
  Ctx,
  Resolver,
  Query,
  Mutation,
} from 'type-graphql';

import { StorefrontCourse } from '@api/resolvers/storefront';
import { ResolverContext } from '@typeDefs/resolver';
import { createCourse } from '@services/firebase/course';
import { mergeCourses } from '@services/course';
import { COURSE } from '@data/course-keys-types';
import { BUNDLE } from '@data/bundle-keys-types';

@ObjectType()
class CurriculumItem {
  @Field()
  label: string;

  @Field()
  url: string;

  @Field()
  description: string;

  @Field()
  kind: 'Article' | 'Video';

  @Field({ nullable: true })
  secondaryUrl: string;
}

@ObjectType()
class CurriculumSection {
  @Field()
  label: string;

  @Field(type => [CurriculumItem])
  items: CurriculumItem[];
}

@ObjectType()
class CurriculumData {
  @Field(type => [CurriculumSection])
  sections: CurriculumSection[];
}

@ObjectType()
class Curriculum {
  @Field()
  label: string;

  @Field({ nullable: true })
  data: CurriculumData;
}
@ObjectType()
class BookSection {
  @Field()
  label: string;

  @Field()
  url: string;
}

@ObjectType()
class BookChapter {
  @Field()
  label: string;

  @Field({ nullable: true })
  url: string;

  @Field(type => [BookSection], { nullable: true })
  sections: BookSection[];
}

@ObjectType()
class BookOnlineData {
  @Field(type => [BookChapter])
  chapters: BookChapter[];
}

@ObjectType()
class BookOnline {
  @Field()
  label: string;

  @Field({ nullable: true })
  data: BookOnlineData;
}

@ObjectType()
class BookDownloadItem {
  @Field()
  label: string;

  @Field()
  description: string;

  @Field()
  url: string;

  @Field()
  fileName: string;
}

@ObjectType()
class BookDownloadData {
  @Field()
  label: string;

  @Field(type => [BookDownloadItem])
  items: BookDownloadItem[];
}
@ObjectType()
class BookDownload {
  @Field()
  label: string;

  @Field({ nullable: true })
  data: BookDownloadData;
}

@ObjectType()
class OnboardingItem {
  @Field()
  label: string;

  @Field()
  url: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  secondaryUrl: string;
}
@ObjectType()
class OnboardingData {
  @Field(type => [OnboardingItem])
  items: OnboardingItem[];
}
@ObjectType()
class Onboarding {
  @Field()
  label: string;

  @Field({ nullable: true })
  data: OnboardingData;
}
@ObjectType()
class IntroductionData {
  @Field()
  label: string;

  @Field()
  url: string;

  @Field()
  description: string;
}
@ObjectType()
class Introduction {
  @Field()
  label: string;

  @Field({ nullable: true })
  data: IntroductionData;
}
@ObjectType()
class UnlockedCourse {
  @Field()
  courseId: string;

  @Field()
  bundleId: string;

  @Field()
  header: string;

  @Field()
  url: string;

  @Field()
  imageUrl: string;

  @Field()
  canUpgrade: boolean;

  @Field({ nullable: true })
  introduction: Introduction;

  @Field({ nullable: true })
  onboarding: Onboarding;

  @Field({ nullable: true })
  bookDownload: BookDownload;

  @Field({ nullable: true })
  bookOnline: BookOnline;

  @Field({ nullable: true })
  curriculum: Curriculum;
}

@Resolver()
export default class CourseResolver {
  @Query(() => [StorefrontCourse])
  async unlockedCourses(@Ctx() ctx: ResolverContext) {
    if (!ctx.me) {
      return [];
    }

    const courses = await ctx.courseConnector.getCoursesByUserId(
      ctx.me.uid
    );

    const unlockedCourses = mergeCourses(courses);

    return Object.values(unlockedCourses).map(unlockedCourse => ({
      courseId: unlockedCourse.courseId,
      header: unlockedCourse.header,
      url: unlockedCourse.url,
      imageUrl: unlockedCourse.imageUrl,
      canUpgrade: unlockedCourse.canUpgrade,
    }));
  }

  @Query(() => UnlockedCourse, { nullable: true })
  async unlockedCourse(
    @Arg('courseId') courseId: string,
    @Ctx() ctx: ResolverContext
  ): Promise<UnlockedCourse | null> {
    if (!ctx.me) {
      return null;
    }

    const courses = await ctx.courseConnector.getCoursesByUserIdAndCourseId(
      ctx.me.uid,
      courseId as COURSE
    );

    const unlockedCourses = mergeCourses(courses);

    const unlockedCourse = unlockedCourses.find(
      unlockedCourse => unlockedCourse.courseId === courseId
    );

    return unlockedCourse;
  }

  @Mutation(() => Boolean)
  async createFreeCourse(
    @Arg('courseId') courseId: string,
    @Arg('bundleId') bundleId: string,
    @Ctx() ctx: ResolverContext
  ): Promise<boolean> {
    if (!ctx.me) {
      return false;
    }

    await ctx.courseConnector.createCourse({
      userId: ctx.me.uid,
      courseId: courseId as COURSE,
      bundleId: bundleId as BUNDLE,
      price: 0,
      currency: 'USD',
      paymentType: 'FREE',
      coupon: '',
    });

    // LEGACY
    await createCourse({
      uid: ctx.me?.uid,
      courseId: courseId as COURSE,
      bundleId: bundleId as BUNDLE,
      amount: 0,
      paymentType: 'FREE',
      coupon: '',
    });
    // LEGACY END

    return true;
  }

  @Mutation(() => Boolean)
  async createAdminCourse(
    @Arg('courseId') courseId: string,
    @Arg('bundleId') bundleId: string,
    @Arg('uid') uid: string,
    @Ctx() ctx: ResolverContext
  ): Promise<boolean> {
    await ctx.courseConnector.createCourse({
      userId: uid,
      courseId: courseId as COURSE,
      bundleId: bundleId as BUNDLE,
      price: 0,
      currency: 'USD',
      paymentType: 'MANUAL',
      coupon: '',
    });

    // LEGACY
    await createCourse({
      uid,
      courseId: courseId as COURSE,
      bundleId: bundleId as BUNDLE,
      amount: 0,
      paymentType: 'MANUAL',
      coupon: '',
    });
    // LEGACY END

    return true;
  }
}
