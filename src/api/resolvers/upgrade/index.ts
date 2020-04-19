import {
  Arg,
  Ctx,
  Resolver,
  Query,
  UseMiddleware,
} from 'type-graphql';

import { StorefrontCourse } from '@api/resolvers/storefront';
import { ResolverContext } from '@typeDefs/resolver';
import { getUpgradeableCourses } from '@services/course';
import { COURSE } from '@data/course-keys-types';
import { isAuthenticated } from '@api/middleware/resolver/isAuthenticated';

@Resolver()
export default class UpgradeResolver {
  @Query(() => [StorefrontCourse])
  @UseMiddleware(isAuthenticated)
  async upgradeableCourses(
    @Arg('courseId') courseId: string,
    @Ctx() ctx: ResolverContext
  ) {
    const courses = await ctx.courseConnector.getCoursesByUserIdAndCourseId(
      ctx.me!.uid,
      courseId as COURSE
    );

    return getUpgradeableCourses(courseId as COURSE, courses);
  }
}
