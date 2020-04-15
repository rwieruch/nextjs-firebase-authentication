import { Arg, Ctx, Resolver, Query } from 'type-graphql';

import { StorefrontCourse } from '@api/resolvers/storefront';
import { ResolverContext } from '@typeDefs/resolver';
import { getUpgradeableCourses } from '@services/course';
import { COURSE } from '@data/course-keys-types';

@Resolver()
export default class UpgradeResolver {
  @Query(() => [StorefrontCourse])
  async upgradeableCourses(
    @Arg('courseId') courseId: string,
    @Ctx() ctx: ResolverContext
  ) {
    if (!ctx.me) {
      return [];
    }

    const courses = await ctx.courseConnector.getCoursesByUserIdAndCourseId(
      ctx.me.uid,
      courseId as COURSE
    );

    return getUpgradeableCourses(courseId as COURSE, courses);
  }
}
