import React from 'react';
import scriptLoader from 'react-async-script-loader';
import { Form, Input } from 'antd';

import FormIcon from '@components/Form/Icon';
import FormItem from '@components/Form/Item';
import FormStretchedButton from '@components/Form/StretchedButton';
import FormAtomButton from '@components/Form/AtomButton';

const PaypalCheckoutBase = ({ coupon }) => {
  React.useLayoutEffect(() => {
    window.paypal.Buttons().render('#paypal-button-container');
  }, []);

  console.log(coupon);

  // const handleSubmit = async event => {
  //   event.preventDefault();

  //   const session = await axios.post(
  //     `${PAYMENT_SERVER_URL}/payment/session-initiate/ROADTOREACT_COM`,
  //     {
  //       customerEmail: authUser.email,
  //       clientReferenceId: authUser.uid,
  //       courseId,
  //       packageId,
  //       images: [`https://roadtoreact.com${image}`],
  //       // lineItem: {
  //       //   name: courseId,
  //       //   description: packageId,
  //       //   images: [`https://roadtoreact.com${image}`],
  //       //   amount: fromTalerToCent(amount),
  //       //   currency: CURRENCIES.USD.toLowerCase(),
  //       //   quantity: 1,
  //       // },
  //       coupon,
  //       successUrl: 'https://roadtoreact.com/my-courses',
  //       cancelUrl: 'https://roadtoreact.com',
  //     }
  //   );

  //   const result = await stripe.redirectToCheckout({
  //     sessionId: session.data.id,
  //   });

  //   onError(result.error.message);
  // };

  return <div id="paypal-button-container"></div>;
};

const PaypalCheckoutMediator = ({
  isScriptLoaded,
  isScriptLoadSucceed,
  isShow,
  ...props
}) =>
  isScriptLoaded &&
  isScriptLoadSucceed &&
  isShow && <PaypalCheckoutBase {...props} />;

const PaypalCheckout = scriptLoader(
  'https://www.paypal.com/sdk/js?client-id=sb'
)(PaypalCheckoutMediator);

const SELECTIONS = {
  IDLE: 'IDLE',
  PAYPAL: 'PAYPAL',
  STRIPE: 'STRIPE',
};

const IdleFormBase = ({
  form,
  coupon,
  onCouponChange,
  onSelectPaypal,
  onSelectStripe,
}) => {
  return (
    <Form>
      <FormItem label="Coupon Code">
        <Input
          value={coupon}
          onChange={onCouponChange}
          prefix={<FormIcon type="tag" />}
          placeholder="Receive an optional discount"
          aria-label="coupon"
        />
      </FormItem>

      <FormItem>
        <FormStretchedButton
          onClick={onSelectPaypal}
          type="primary"
          aria-label="paypal"
        >
          PayPal
        </FormStretchedButton>

        <FormStretchedButton
          onClick={onSelectStripe}
          type="primary"
          aria-label="stripe"
        >
          Credit Card
        </FormStretchedButton>
      </FormItem>
    </Form>
  );
};

const IdleForm = Form.create({
  name: 'idle',
})(IdleFormBase);

const Pay = ({ onSuccess }) => {
  const [coupon, setCoupon] = React.useState('');
  const [currentSelection, setCurrentSelection] = React.useState(
    SELECTIONS.IDLE
  );

  const handleCouponChange = event => {
    setCoupon(event.target.value);
  };

  const handleSelectIdle = () => {
    setCurrentSelection(SELECTIONS.IDLE);
  };

  const handleSelectPaypal = () => {
    setCurrentSelection(SELECTIONS.PAYPAL);
  };

  const handleSelectStripe = () => {
    setCurrentSelection(SELECTIONS.STRIPE);
  };

  return (
    <>
      <PaypalCheckout
        isShow={currentSelection === SELECTIONS.PAYPAL}
        coupon={coupon}
      />

      {/*
        <StripeCheckout
          isShow={currentSelection === SELECTIONS.STRIPE}
        />
      */}

      {currentSelection !== SELECTIONS.IDLE && (
        <FormAtomButton type="link" onClick={handleSelectIdle}>
          Go back
        </FormAtomButton>
      )}

      {currentSelection === SELECTIONS.IDLE && (
        <IdleForm
          coupon={coupon}
          onCouponChange={handleCouponChange}
          onSelectPaypal={handleSelectPaypal}
          onSelectStripe={handleSelectStripe}
        />
      )}
    </>
  );
};

export default Pay;
