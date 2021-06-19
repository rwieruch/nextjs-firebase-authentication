import React from 'react';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/react-hooks';
import { Form, Input, Button, Row, Col, message } from 'antd';

import { StorefrontCourse } from '@generated/client';
import FormIcon from '@components/Form/Icon';
import { formatPrice, formatRouteQuery } from '@services/format';
import { GET_DISCOUNTED_PRICE } from '@queries/coupon';

import FreeCheckoutButton from './FreeCheckout';
import PaypalCheckout from './Adapters/paypal';
import StripeCheckoutButton from './Adapters/stripe';

const SELECTIONS = {
  IDLE: 'IDLE',
  PAYPAL: 'PAYPAL',
};

type Discount = {
  isRedeemed: boolean;
  price: number;
};

type IdleFormProps = {
  storefrontCourse: StorefrontCourse;
  coupon: string;
  discount: Discount;
  discountLoading: boolean;
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
  discount,
  discountLoading,
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

  const isFree = price === 0 || (discount.isRedeemed && discount.price === 0);

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

      <Form.Item style={{ margin: 0 }} label="Price">
        <span
          className="ant-form-text"
          style={{
            textDecoration: discount.isRedeemed
              ? 'line-through'
              : 'none',
          }}
        >
          {formatPrice(price)}
        </span>

        {discount.isRedeemed && (
          <span className="ant-form-text">
            {formatPrice(discount.price)}
          </span>
        )}
      </Form.Item>

      <Form.Item label="Coupon">
        <Row gutter={8}>
          <Col span={16}>
            <Input
              value={coupon}
              disabled={discount.isRedeemed}
              onChange={onCouponChange}
              prefix={<FormIcon type="tag" />}
              placeholder="Discount Code"
              aria-label="coupon"
            />
          </Col>
          <Col span={8}>
            <Button
              loading={discountLoading}
              onClick={onRedeemedChange}
            >
              {discount.isRedeemed ? 'Clear' : 'Apply'}
            </Button>
          </Col>
        </Row>
      </Form.Item>

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
  const [discount, setDiscount] = React.useState({
    isRedeemed: false,
    price: 0,
  });
  const [discountLoading, setDiscountLoading] = React.useState(false);

  const apolloClient = useApolloClient();

  const [currentSelection, setCurrentSelection] = React.useState(
    SELECTIONS.IDLE
  );

  const handleCouponChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCoupon(event.target.value);
  };

  const handledRedeemedChange = async () => {
    if (!discount.isRedeemed) {
      setDiscountLoading(true);

      const { data } = await apolloClient.query({
        query: GET_DISCOUNTED_PRICE,
        variables: {
          courseId: storefrontCourse.courseId,
          bundleId: storefrontCourse.bundle.bundleId,
          coupon,
        },
      });

      setDiscountLoading(false);

      if (!data.discountedPrice.isDiscount) {
        message.error('Invalid coupon.');
        return;
      }

      setDiscount({
        isRedeemed: true,
        price: data.discountedPrice.price,
      });
    } else {
      setDiscount({ isRedeemed: false, price: 0 });
    }
  };

  React.useEffect(() => {
    if (formatRouteQuery(query.coupon)) {
      handledRedeemedChange();
    }
  }, []);

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
        coupon={discount.isRedeemed ? coupon : ''}
        onSuccess={onSuccess}
        onBack={handleSelectIdle}
      />

      {currentSelection === SELECTIONS.IDLE && (
        <IdleForm
          storefrontCourse={storefrontCourse}
          coupon={coupon}
          discount={discount}
          discountLoading={discountLoading}
          onCouponChange={handleCouponChange}
          onRedeemedChange={handledRedeemedChange}
          freeButton={
            <FreeCheckoutButton
              courseId={storefrontCourse.courseId}
              bundleId={storefrontCourse.bundle.bundleId}
              coupon={discount.isRedeemed ? coupon : ''}
              onSuccess={onSuccess}
            />
          }
          stripeButton={
            <StripeCheckoutButton
              storefrontCourse={storefrontCourse}
              coupon={discount.isRedeemed ? coupon : ''}
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
