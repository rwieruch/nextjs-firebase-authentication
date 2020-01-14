import { render } from '@testing-library/react';

import { Session } from '@typeDefs/session';
import SessionContext from '@context/session';

import ReferralPage from '.';

describe('ReferralPage', () => {
  let component: any;
  let getComponent: any;
  let defaultProps: any;

  beforeEach(() => {
    defaultProps = {};

    getComponent = (props: any = defaultProps, session: Session) => (
      <SessionContext.Provider value={session}>
        <ReferralPage {...props} />
      </SessionContext.Provider>
    );
  });

  it('does not render when not authorized', () => {
    component = render(
      getComponent(null, { authUser: null, isSessionChecked: true })
    );

    expect(component.container.querySelector('h1')).toBeFalsy();
  });

  it('renders when authorized', () => {
    component = render(
      getComponent(null, {
        authUser: { uid: '1' },
        isSessionChecked: true,
      })
    );

    expect(component.container.querySelector('h1')).toBeTruthy();
  });
});
