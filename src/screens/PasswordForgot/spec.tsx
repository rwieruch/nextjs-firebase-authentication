import * as renderer from 'react-test-renderer';

import { PasswordForgotFormEnhanced } from '.';

jest.mock('@services/firebase/auth', () => ({
  doPasswordReset: Promise.resolve(),
}));

describe('PasswordForgotFormEnhanced', () => {
  let component: any;
  let getComponent: any;
  let defaultProps: any;

  beforeEach(() => {
    defaultProps = {};

    getComponent = (props: any = defaultProps) => (
      <PasswordForgotFormEnhanced {...props} />
    );

    component = renderer.create(getComponent());
  });

  it('renders', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
