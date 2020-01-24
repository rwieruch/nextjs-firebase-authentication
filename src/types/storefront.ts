export type Storefront = {
  course: StorefrontCourse;
} | null;

type StorefrontCourse = {
  header: string;
  courseId: string;
  bundle: StorefrontBundle;
};

type StorefrontBundle = {
  header: string;
  bundleId: string;
  price: number;
};
