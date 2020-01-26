import scriptLoader from 'react-async-script-loader';

import StripeCheckout from '../StripeCheckout';

export default scriptLoader(`https://js.stripe.com/v3/`)(
  StripeCheckout
);
