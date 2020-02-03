/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CourseId, BundleId } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetStorefront
// ====================================================

export interface GetStorefront_storefront_course_bundle {
  __typename: "Bundle";
  header: string;
  bundleId: BundleId;
  price: number;
}

export interface GetStorefront_storefront_course {
  __typename: "Course";
  header: string;
  courseId: CourseId;
  bundle: GetStorefront_storefront_course_bundle;
}

export interface GetStorefront_storefront {
  __typename: "Storefront";
  course: GetStorefront_storefront_course;
}

export interface GetStorefront {
  storefront: GetStorefront_storefront | null;
}

export interface GetStorefrontVariables {
  courseId?: CourseId | null;
  bundleId?: BundleId | null;
}
