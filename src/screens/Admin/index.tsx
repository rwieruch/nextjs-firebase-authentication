import React from 'react';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/react-hooks';

import { Session } from '@typeDefs/session';
import { MIGRATE } from '@queries/migrate';
import { CREATE_ADMIN_COURSE } from '@queries/course';
import { PROMOTE_TO_PARTNER } from '@queries/partner';
import { formatRouteQuery } from '@services/format';

const TYPES = {
  MIGRATE: 'MIGRATE',

  COURSE_CREATE: 'COURSE_CREATE',

  PROMOTE_TO_PARTNER: 'PROMOTE_TO_PARTNER',
};

const AdminPage = () => {
  const apolloClient = useApolloClient();
  const { query } = useRouter();

  React.useEffect(() => {
    const type = formatRouteQuery(query.type);

    if (type === TYPES.COURSE_CREATE) {
      apolloClient.mutate({
        mutation: CREATE_ADMIN_COURSE,
        variables: {
          uid: formatRouteQuery(query.uid),
          courseId: formatRouteQuery(query.courseId),
          bundleId: formatRouteQuery(query.bundleId),
        },
      });
    }

    if (type === TYPES.MIGRATE) {
      apolloClient.mutate({
        mutation: MIGRATE,
        variables: {
          migrationType: formatRouteQuery(query.migrationType),
        },
      });
    }

    if (type === TYPES.PROMOTE_TO_PARTNER) {
      apolloClient.mutate({
        mutation: PROMOTE_TO_PARTNER,
        variables: {
          uid: formatRouteQuery(query.uid),
        },
      });
    }
  }, []);

  return null;
};

AdminPage.isAuthorized = (session: Session) => !!session;

export default AdminPage;
