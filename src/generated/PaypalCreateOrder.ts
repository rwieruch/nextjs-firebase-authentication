/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CourseId, BundleId } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: PaypalCreateOrder
// ====================================================

export interface PaypalCreateOrder_paypalCreateOrder {
  __typename: "OrderId";
  orderId: string;
}

export interface PaypalCreateOrder {
  paypalCreateOrder: PaypalCreateOrder_paypalCreateOrder;
}

export interface PaypalCreateOrderVariables {
  courseId: CourseId;
  bundleId: BundleId;
  coupon?: string | null;
}
