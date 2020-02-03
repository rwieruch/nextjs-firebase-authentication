import { combineResolvers } from 'graphql-resolvers';

import { MutationResolvers } from '@generated/gen-types';
import { isAuthenticated } from '@api/authorization/isAuthenticated';
import { isFreeCourse } from '@api/authorization/isFreeCourse';
import { isAdmin } from '@api/authorization/isAdmin';
import { createCourse } from '@services/firebase/course';

interface Resolvers {
  Mutation: MutationResolvers;
}

export const resolvers: Resolvers = {
  Mutation: {
    createFreeCourse: combineResolvers(
      isAuthenticated,
      isFreeCourse,
      async (parent, { courseId, bundleId }, { me }) => {
        await createCourse({
          uid: me?.uid,
          courseId,
          bundleId,
          amount: 0,
          paymentType: 'FREE',
        });

        return true;
      }
    ),
    createAdminCourse: combineResolvers(
      isAuthenticated,
      isAdmin,
      async (parent, { uid, courseId, bundleId }) => {
        await createCourse({
          uid,
          courseId,
          bundleId,
          amount: 0,
          paymentType: 'MANUAL',
        });

        return true;
      }
    ),
  },
};
