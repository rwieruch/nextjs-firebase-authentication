import renderer from 'react-test-renderer';

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
    component = renderer.create(
      getComponent(null, { authUser: null, isSessionChecked: true })
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('renders when authorized', () => {
  //   component = renderer.create(
  //     getComponent(null, {
  //       authUser: { uid: '1' },
  //       isSessionChecked: true,
  //     })
  //   );

  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
