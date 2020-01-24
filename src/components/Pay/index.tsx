import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

import { Storefront } from '@typeDefs/storefront';
import FormIcon from '@components/Form/Icon';
import FormAtomButton from '@components/Form/AtomButton';

import PaypalCheckout from './Adapters/paypal';

const SELECTIONS = {
  IDLE: 'IDLE',
  PAYPAL: 'PAYPAL',
  STRIPE: 'STRIPE',
};

type IdleFormProps = {
  coupon: string;
  storefront: Storefront;
  onCouponChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onSelectPaypal: () => void;
  onSelectStripe: () => void;
};

const IdleForm = ({
  coupon,
  storefront,
  onCouponChange,
  onSelectPaypal,
  onSelectStripe,
}: IdleFormProps) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

  return (
    <Form {...formItemLayout}>
      {storefront && (
        <Form.Item style={{ margin: 0 }} label="Course">
          <span className="ant-form-text">
            {storefront?.course.header}
          </span>
        </Form.Item>
      )}

      {storefront && (
        <Form.Item style={{ margin: 0 }} label="Bundle">
          <span className="ant-form-text">
            {storefront?.course.bundle.header}
          </span>
        </Form.Item>
      )}

      {storefront && (
        <Form.Item style={{ margin: 0 }} label="Price">
          <span className="ant-form-text">
            {(storefront?.course.bundle.price / 100).toLocaleString(
              'en-US',
              {
                style: 'currency',
                currency: 'USD',
              }
            )}
          </span>
        </Form.Item>
      )}

      <Form.Item label="Coupon">
        <Input
          value={coupon}
          onChange={onCouponChange}
          prefix={<FormIcon type="tag" />}
          placeholder="Receive an optional discount"
          aria-label="coupon"
        />
      </Form.Item>

      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button
            onClick={onSelectPaypal}
            type="primary"
            style={{ marginRight: '8px' }}
            aria-label="paypal"
          >
            PayPal
          </Button>

          <Button
            onClick={onSelectStripe}
            type="primary"
            aria-label="stripe"
          >
            Credit Card
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

type PayProps = {
  storefront: Storefront;
  onSuccess: () => void;
};

const Pay = ({ storefront, onSuccess }: PayProps) => {
  // TODO
  // if storefront is null, offer a redirect to available courses

  const [coupon, setCoupon] = React.useState('');
  const [currentSelection, setCurrentSelection] = React.useState(
    SELECTIONS.IDLE
  );

  const handleCouponChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
          storefront={storefront}
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
