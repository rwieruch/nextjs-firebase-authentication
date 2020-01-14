import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Session } from '@typeDefs/session';
import SessionContext from '@context/session';

import SignInPage from '.';

describe('SignInPage', () => {
  const noSession = { authUser: null, isSessionChecked: true };
  const session = {
    authUser: { uid: '1' },
    isSessionChecked: true,
  };

  let getComponent: any;
  let defaultProps: any;

  beforeEach(() => {
    defaultProps = {};

    getComponent = (props: any = defaultProps, session: Session) => (
      <SessionContext.Provider value={session}>
        <SignInPage {...props} />
      </SessionContext.Provider>
    );
  });

  it('renders when not authorized', () => {
    render(getComponent(null, noSession));

    expect(
      screen.queryByText('Log in and get to learn')
    ).toBeInTheDocument();
  });

  it('renders when authorized', () => {
    render(getComponent(null, session));

    expect(
      screen.queryByText('Log in and get to learn')
    ).toBeInTheDocument();
  });
});
