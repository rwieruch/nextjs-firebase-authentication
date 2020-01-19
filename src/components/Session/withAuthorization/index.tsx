import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import * as ROUTES from '@constants/routes';
import SessionContext from '@context/session';

import { Session } from '@typeDefs/session';

type Condition = (session: Session) => boolean;

interface WithAuthorizationProps {}

const withAuthorization = (condition: Condition) => (
  Component: React.ComponentType
) => {
  const WithAuthorization: NextPage<WithAuthorizationProps> = (
    props: any
  ) => {
    const router = useRouter();
    const session = React.useContext(SessionContext);

    React.useEffect(() => {
      if (!session.isSessionChecked) {
        return;
      }

      if (!condition(session)) {
        router.push('/error', ROUTES.SIGN_IN);
      }
    }, [session]);

    return condition(session) ? <Component {...props} /> : null;
  };

  return WithAuthorization;
};

export default withAuthorization;
