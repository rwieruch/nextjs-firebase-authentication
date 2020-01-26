import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

import { GetStorefront_storefront_course } from '@generated/GetStorefront';
import FormIcon from '@components/Form/Icon';

import PaypalCheckout from './Adapters/paypal';
import StripeCheckout from './Adapters/stripe';

const SELECTIONS = {
  IDLE: 'IDLE',
  PAYPAL: 'PAYPAL',
  STRIPE: 'STRIPE',
};

type IdleFormProps = {
  coupon: string;
  courseHeader: string | undefined;
  bundleHeader: string | undefined;
  price: number | undefined;
  onCouponChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onSelectPaypal: () => void;
  onSelectStripe: () => void;
  onSelectFree: () => void;
};

const IdleForm = ({
  coupon,
  courseHeader,
  bundleHeader,
  price,
  onCouponChange,
  onSelectPaypal,
  onSelectStripe,
  onSelectFree,
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

      {price && !isFree && (
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
          {!isFree && (
            <Button
              onClick={onSelectPaypal}
              type="primary"
              style={{ marginRight: '8px' }}
              aria-label="paypal"
            >
              PayPal
            </Button>
          )}
          {!isFree && (
            <Button
              onClick={onSelectStripe}
              type="primary"
              aria-label="stripe"
            >
              Credit Card
            </Button>
          )}

          {isFree && (
            <Button
              onClick={onSelectFree}
              type="primary"
              aria-label="stripe"
            >
              Unlock
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  );
};

type PayProps = {
  imageUrl: string;
  course: GetStorefront_storefront_course;
  onSuccess: () => void;
  onError: (error: Error) => void;
};

const Pay = ({ imageUrl, course, onSuccess, onError }: PayProps) => {
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

  const handleSelectFree = async () => {
    // TODO
    try {
      // API request with course addition in DB
      // but check if it's really free first
      // onSuccess();
    } catch (error) {
      onError(error);
    }
  };

  return (
    <>
      <PaypalCheckout
        isShow={currentSelection === SELECTIONS.PAYPAL}
        courseId={course.courseId}
        bundleId={course.bundle.bundleId}
        coupon={coupon}
        onSuccess={onSuccess}
        onError={onError}
        onBack={handleSelectIdle}
      />

      <StripeCheckout
        isShow={currentSelection === SELECTIONS.STRIPE}
        imageUrl={imageUrl}
        courseId={course.courseId}
        bundleId={course.bundle.bundleId}
        coupon={coupon}
        onSuccess={onSuccess}
        onError={onError}
        onBack={handleSelectIdle}
      />

      {currentSelection === SELECTIONS.IDLE && (
        <IdleForm
          courseHeader={course.header}
          bundleHeader={course.bundle.header}
          price={course.bundle.price}
          coupon={coupon}
          onCouponChange={handleCouponChange}
          onSelectPaypal={handleSelectPaypal}
          onSelectStripe={handleSelectStripe}
          onSelectFree={handleSelectFree}
        />
      )}
    </>
  );
};

export default Pay;
