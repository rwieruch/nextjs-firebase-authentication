import {
  ObjectType,
  Field,
  Arg,
  Resolver,
  Query,
} from 'type-graphql';

import { COURSE } from '@data/course-keys-types';
import { BUNDLE } from '@data/bundle-keys-types';

import sortBy from 'lodash.sortby';

import storefront from '@data/course-storefront';

@ObjectType()
export class StorefrontBundle {
  @Field()
  header: string;

  @Field()
  bundleId: string;

  @Field()
  price: number;

  @Field()
  imageUrl: string;

  @Field(type => [String])
  benefits: string[];
}

@ObjectType()
export class StorefrontCourse {
  @Field()
  header: string;

  @Field()
  courseId: string;

  @Field()
  url: string;

  @Field()
  imageUrl: string;

  @Field()
  canUpgrade: boolean;

  @Field()
  bundle?: StorefrontBundle;
}

@Resolver()
export default class StorefrontResolver {
  @Query(() => StorefrontCourse)
  async storefrontCourse(
    @Arg('courseId') courseId: string,
    @Arg('bundleId') bundleId: string
  ): Promise<StorefrontCourse> {
    const course = storefront[courseId as COURSE];
    const bundle = course.bundles[bundleId as BUNDLE];

    return {
      ...course,
      header: course.header,
      courseId: course.courseId,
      url: course.url,
      imageUrl: course.imageUrl,
      canUpgrade: false,
      bundle,
    };
  }

  @Query(() => [StorefrontCourse])
  async storefrontCourses(): Promise<StorefrontCourse[]> {
    return Object.values(storefront).map(storefrontCourse => ({
      courseId: storefrontCourse.courseId,
      header: storefrontCourse.header,
      url: storefrontCourse.url,
      imageUrl: storefrontCourse.imageUrl,
      canUpgrade: false,
    }));
  }

  @Query(() => [StorefrontBundle])
  async storefrontBundles(
    @Arg('courseId') courseId: string
  ): Promise<StorefrontBundle[]> {
    const course = storefront[courseId as COURSE];

    return sortBy(
      Object.values(course.bundles),
      (bundle: any) => bundle.weight
    );
  }
}
