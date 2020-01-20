import Router from 'next/router';
import cookie from 'js-cookie';

import * as ROUTES from '@constants/routes';

export default () => {
  Router.push(ROUTES.SIGN_IN);
  cookie.remove('session');
};
