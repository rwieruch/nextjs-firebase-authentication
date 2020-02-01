import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

import { GetStorefront_storefront_course } from '@generated/GetStorefront';
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
  courseHeader: string;
  bundleHeader: string;
  price: number;
  onCouponChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  freeButton: React.ReactNode;
  stripeButton: React.ReactNode;
  paypalButton: React.ReactNode;
};

const IdleForm = ({
  coupon,
  courseHeader,
  bundleHeader,
  price,
  onCouponChange,
  freeButton,
  stripeButton,
  paypalButton,
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
  course: GetStorefront_storefront_course;
  onSuccess: () => void;
};

const Pay = ({ imageUrl, course, onSuccess }: PayProps) => {
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
        courseId={course.courseId}
        bundleId={course.bundle.bundleId}
        coupon={coupon}
        onSuccess={onSuccess}
        onBack={handleSelectIdle}
      />

      {currentSelection === SELECTIONS.IDLE && (
        <IdleForm
          courseHeader={course.header}
          bundleHeader={course.bundle.header}
          price={course.bundle.price}
          coupon={coupon}
          onCouponChange={handleCouponChange}
          freeButton={
            <FreeCheckoutButton
              courseId={course.courseId}
              bundleId={course.bundle.bundleId}
              onSuccess={onSuccess}
            />
          }
          stripeButton={
            <StripeCheckoutButton
              imageUrl={imageUrl}
              courseId={course.courseId}
              bundleId={course.bundle.bundleId}
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
