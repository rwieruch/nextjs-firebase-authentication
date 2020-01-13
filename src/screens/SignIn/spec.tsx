import * as renderer from 'react-test-renderer';

import { SignInFormEnhanced } from '.';

jest.mock('@services/firebase/auth', () => ({
  doSignInWithEmailAndPassword: Promise.resolve(),
}));

describe('SignInFormEnhanced', () => {
  let component: any;
  let getComponent: any;
  let defaultProps: any;

  beforeEach(() => {
    defaultProps = {};

    getComponent = (props: any = defaultProps) => (
      <SignInFormEnhanced {...props} />
    );

    component = renderer.create(getComponent());
  });

  it('renders', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
