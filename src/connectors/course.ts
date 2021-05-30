import { Connection, Repository } from 'typeorm';

import { COURSE } from '@data/course-keys-types';
import { BUNDLE } from '@data/bundle-keys-types';
import { Course } from '@models/course';

export class CourseConnector {
  courseRepository: Repository<Course>;

  constructor(connection: Connection) {
    this.courseRepository =
      connection?.getRepository<Course>('Course');
  }

  async createCourse({
    userId,
    courseId,
    bundleId,
    price,
    currency,
    paymentType,
    coupon,
  }: {
    userId: string;
    courseId: COURSE;
    bundleId: BUNDLE;
    price: number;
    currency: string;
    paymentType: string;
    coupon: string;
  }) {
    const course = new Course();

    course.userId = userId;
    course.courseId = courseId;
    course.bundleId = bundleId;
    course.price = price;
    course.currency = currency;
    course.paymentType = paymentType;
    course.coupon = coupon;

    return await this.courseRepository.save(course);
  }

  async getCoursesByUserId(userId: string) {
    return await this.courseRepository.find({
      where: { userId },
    });
  }

  async getCoursesByUserIdAndCourseId(
    userId: string,
    courseId: COURSE
  ) {
    return await this.courseRepository.find({
      where: { userId, courseId },
    });
  }
}
