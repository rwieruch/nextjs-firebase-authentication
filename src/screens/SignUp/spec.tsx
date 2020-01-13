import * as renderer from 'react-test-renderer';

import { SignUpFormEnhanced } from '.';

jest.mock('@services/firebase/auth', () => ({
  doCreateUserWithEmailAndPassword: Promise.resolve(),
}));

describe('SignUpFormEnhanced', () => {
  let component: any;
  let getComponent: any;
  let defaultProps: any;

  beforeEach(() => {
    defaultProps = {};

    getComponent = (props: any = defaultProps) => (
      <SignUpFormEnhanced {...props} />
    );

    component = renderer.create(getComponent());
  });

  it('renders', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
