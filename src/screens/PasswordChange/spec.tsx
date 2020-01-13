import * as renderer from 'react-test-renderer';

import { PasswordChangeFormEnhanced } from '.';

jest.mock('@services/firebase/auth', () => ({
  doPasswordUpdate: Promise.resolve(),
}));

describe('PasswordChangeFormEnhanced', () => {
  let component: any;
  let getComponent: any;
  let defaultProps: any;

  beforeEach(() => {
    defaultProps = {};

    getComponent = (props: any = defaultProps) => (
      <PasswordChangeFormEnhanced {...props} />
    );

    component = renderer.create(getComponent());
  });

  it('renders', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
