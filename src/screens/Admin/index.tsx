import React from 'react';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/react-hooks';

import { Session } from '@typeDefs/session';
import { CREATE_ADMIN_COURSE } from '@queries/course';

const AdminPage = () => {
  const apolloClient = useApolloClient();
  const { query } = useRouter();

  React.useEffect(() => {
    apolloClient.mutate({
      mutation: CREATE_ADMIN_COURSE,
      variables: {
        uid:
          query.uid instanceof Array ? query.uid.join('') : query.uid,
        courseId:
          query.courseId instanceof Array
            ? query.courseId.join('')
            : query.courseId,
        bundleId:
          query.bundleId instanceof Array
            ? query.bundleId.join('')
            : query.bundleId,
      },
    });
  }, []);

  return null;
};

AdminPage.isAuthorized = (session: Session) => !!session;

export default AdminPage;
