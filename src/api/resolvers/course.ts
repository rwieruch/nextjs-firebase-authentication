import { combineResolvers } from 'graphql-resolvers';

import { ResolverContext } from '@typeDefs/resolver';

import { isAuthenticated } from '@api/authorization/isAuthenticated';
import { isFreeCourse } from '@api/authorization/isFreeCourse';

import { createCourse } from '@services/firebase/course';

import { COURSE } from '../../../content/course-keys';
import { BUNDLE } from '../../../content/course-keys';

export default {
  Mutation: {
    createFreeCourse: combineResolvers(
      isAuthenticated,
      isFreeCourse,
      async (
        parent: any,
        {
          courseId,
          bundleId,
        }: { courseId: COURSE; bundleId: BUNDLE },
        { me }: ResolverContext
      ) => {
        await createCourse({
          uid: me.uid,
          courseId,
          bundleId,
          amount: 0,
          paymentType: 'FREE',
        });

        return true;
      }
    ),
  },
};
