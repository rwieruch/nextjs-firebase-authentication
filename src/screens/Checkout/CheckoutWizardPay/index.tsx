import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

import { StorefrontCourse } from '@generated/client';
import FormIcon from '@components/Form/Icon';

import FreeCheckoutButton from './FreeCheckout';
import PaypalCheckout from './Adapters/paypal';
import StripeCheckoutButton from './Adapters/stripe';

const SELECTIONS = {
  IDLE: 'IDLE',
  PAYPAL: 'PAYPAL',
};

type IdleFormProps = {
  coupon: string;
  storefrontCourse: StorefrontCourse;
  onCouponChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  freeButton: React.ReactNode;
  stripeButton: React.ReactNode;
  paypalButton: React.ReactNode;
};

const IdleForm = ({
  storefrontCourse,
  coupon,
  onCouponChange,
  freeButton,
  stripeButton,
  paypalButton,
}: IdleFormProps) => {
  const { courseId, header: courseHeader } = storefrontCourse;
  const {
    bundleId,
    header: bundleHeader,
    price,
  } = storefrontCourse.bundle;

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

  const isFree = price === 0;

  return (
    <Form {...formItemLayout}>
      {courseHeader && (
        <Form.Item style={{ margin: 0 }} label="Course">
          <span className="ant-form-text">{courseHeader}</span>
        </Form.Item>
      )}

      {bundleHeader && (
        <Form.Item style={{ margin: 0 }} label="Bundle">
          <span className="ant-form-text">{bundleHeader}</span>
        </Form.Item>
      )}

      {!isFree && (
        <Form.Item style={{ margin: 0 }} label="Price">
          <span className="ant-form-text">
            {(price / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </span>
        </Form.Item>
      )}

      {!isFree && (
        <Form.Item label="Coupon">
          <Input
            value={coupon}
            onChange={onCouponChange}
            prefix={<FormIcon type="tag" />}
            placeholder="Receive an optional discount"
            aria-label="coupon"
          />
        </Form.Item>
      )}

      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          {!isFree && paypalButton}

          {!isFree && stripeButton}

          {isFree && freeButton}
        </Col>
      </Row>
    </Form>
  );
};

type PayProps = {
  imageUrl: string;
  storefrontCourse: StorefrontCourse;
  onSuccess: () => void;
};

const Pay = ({ imageUrl, storefrontCourse, onSuccess }: PayProps) => {
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

  return (
    <>
      <PaypalCheckout
        isShow={currentSelection === SELECTIONS.PAYPAL}
        storefrontCourse={storefrontCourse}
        coupon={coupon}
        onSuccess={onSuccess}
        onBack={handleSelectIdle}
      />

      {currentSelection === SELECTIONS.IDLE && (
        <IdleForm
          storefrontCourse={storefrontCourse}
          coupon={coupon}
          onCouponChange={handleCouponChange}
          freeButton={
            <FreeCheckoutButton
              courseId={storefrontCourse.courseId}
              bundleId={storefrontCourse.bundle.bundleId}
              onSuccess={onSuccess}
            />
          }
          stripeButton={
            <StripeCheckoutButton
              storefrontCourse={storefrontCourse}
              imageUrl={imageUrl}
              coupon={coupon}
            />
          }
          paypalButton={
            <Button
              onClick={handleSelectPaypal}
              type="primary"
              style={{ marginRight: '8px' }}
              aria-label="paypal"
            >
              PayPal
            </Button>
          }
        />
      )}
    </>
  );
};

export default Pay;
