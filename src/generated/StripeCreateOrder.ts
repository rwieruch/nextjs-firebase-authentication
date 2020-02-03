/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CourseId, BundleId } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: StripeCreateOrder
// ====================================================

export interface StripeCreateOrder_stripeCreateOrder {
  __typename: "StripeId";
  id: string;
}

export interface StripeCreateOrder {
  stripeCreateOrder: StripeCreateOrder_stripeCreateOrder;
}

export interface StripeCreateOrderVariables {
  imageUrl: string;
  courseId: CourseId;
  bundleId: BundleId;
  coupon?: string | null;
}
