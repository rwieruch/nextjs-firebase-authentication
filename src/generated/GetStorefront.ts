/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetStorefront
// ====================================================

export interface GetStorefront_storefront_course_bundle {
  __typename: "Bundle";
  header: string;
  bundleId: string;
  price: number;
}

export interface GetStorefront_storefront_course {
  __typename: "Course";
  header: string;
  courseId: string;
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
  courseId?: string | null;
  bundleId?: string | null;
}
