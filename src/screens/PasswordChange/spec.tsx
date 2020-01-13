import renderer from 'react-test-renderer';

import PasswordChangePage from '.';

jest.mock('@services/firebase/auth', () => ({
  doPasswordUpdate: Promise.resolve(),
}));

describe('PasswordChangePage', () => {
  let component: any;
  let getComponent: any;
  let defaultProps: any;

  beforeEach(() => {
    defaultProps = {};

    getComponent = (props: any = defaultProps) => (
      <PasswordChangePage {...props} />
    );

    component = renderer.create(getComponent());
  });

  it('renders', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
