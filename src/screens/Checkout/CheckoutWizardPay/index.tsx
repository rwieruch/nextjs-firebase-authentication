import React from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Button, Row, Col } from 'antd';

import { StorefrontCourse } from '@generated/client';
import FormIcon from '@components/Form/Icon';
import { formatPrice, formatRouteQuery } from '@services/format';

import FreeCheckoutButton from './FreeCheckout';
import PaypalCheckout from './Adapters/paypal';
import StripeCheckoutButton from './Adapters/stripe';

const SELECTIONS = {
  IDLE: 'IDLE',
  PAYPAL: 'PAYPAL',
};

type IdleFormProps = {
  storefrontCourse: StorefrontCourse;
  coupon: string;
  redeemed: boolean;
  onCouponChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onRedeemedChange: () => void;
  freeButton: React.ReactNode;
  stripeButton: React.ReactNode;
  paypalButton: React.ReactNode;
};

const IdleForm = ({
  storefrontCourse,
  coupon,
  redeemed,
  onCouponChange,
  onRedeemedChange,
  freeButton,
  stripeButton,
  paypalButton,
}: IdleFormProps) => {
  const { header: courseHeader } = storefrontCourse;
  const { header: bundleHeader, price } = storefrontCourse.bundle;

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
          <span
            className="ant-form-text"
            style={{
              textDecoration: redeemed ? 'line-through' : 'none',
            }}
          >
            {formatPrice(price)}
          </span>

          {redeemed && (
            <span className="ant-form-text">new price</span>
          )}
        </Form.Item>
      )}

      {!isFree && (
        <Form.Item label="Coupon">
          <Row gutter={8}>
            <Col span={14}>
              <Input
                value={coupon}
                disabled={redeemed}
                onChange={onCouponChange}
                prefix={<FormIcon type="tag" />}
                placeholder="Receive an optional discount"
                aria-label="coupon"
              />
            </Col>
            <Col span={6}>
              <Button onClick={onRedeemedChange}>
                {redeemed ? 'Clear' : 'Apply'}
              </Button>
            </Col>
          </Row>
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
  storefrontCourse: StorefrontCourse;
  onSuccess: () => void;
};

const Pay = ({ storefrontCourse, onSuccess }: PayProps) => {
  const { query } = useRouter();

  const [coupon, setCoupon] = React.useState(
    formatRouteQuery(query.coupon) || ''
  );
  const [redeemed, setRedeemed] = React.useState(
    formatRouteQuery(query.coupon) ? true : false
  );

  const [currentSelection, setCurrentSelection] = React.useState(
    SELECTIONS.IDLE
  );

  const handleCouponChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCoupon(event.target.value);
  };

  const handledRedeemedChange = () => {
    setRedeemed(!redeemed);
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
        coupon={redeemed ? coupon : ''}
        onSuccess={onSuccess}
        onBack={handleSelectIdle}
      />

      {currentSelection === SELECTIONS.IDLE && (
        <IdleForm
          storefrontCourse={storefrontCourse}
          coupon={coupon}
          redeemed={redeemed}
          onCouponChange={handleCouponChange}
          onRedeemedChange={handledRedeemedChange}
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
              coupon={redeemed ? coupon : ''}
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
