import React from 'react';

type PaypalCheckoutProps = {
  coupon: string;
};

const PaypalCheckout = ({ coupon }: PaypalCheckoutProps) => {
  React.useLayoutEffect(() => {
    (window as any).paypal
      .Buttons()
      .render('#paypal-button-container');
  }, []);

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

export default PaypalCheckout;
