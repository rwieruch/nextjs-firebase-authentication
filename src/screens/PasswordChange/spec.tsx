import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Session } from '@typeDefs/session';
import SessionContext from '@context/session';

import PasswordChangePage from '.';

describe('PasswordChangePage', () => {
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
        <PasswordChangePage {...props} />
      </SessionContext.Provider>
    );
  });

  it('does not render when not authorized', () => {
    render(getComponent(null, noSession));

    expect(screen.queryByText('Change your password')).toBeNull();
  });

  it('renders when authorized', () => {
    render(getComponent(null, session));

    expect(
      screen.queryByText('Change your password')
    ).toBeInTheDocument();
  });
});
