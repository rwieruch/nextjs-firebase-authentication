import { Between } from 'typeorm';
import { Connection, Repository } from 'typeorm';

import { Coupon } from '@models/coupon';

export class CouponConnector {
  couponRepository: Repository<Coupon>;

  constructor(connection: Connection) {
    this.couponRepository = connection?.getRepository(Coupon);
  }

  async createCoupons(
    coupon: string,
    discount: number,
    count: number
  ) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const couponEntity = new Coupon();

    couponEntity.coupon = coupon;
    couponEntity.discount = discount;
    couponEntity.count = count;
    couponEntity.expiresAt = expiresAt;

    return await this.couponRepository.save(couponEntity);
  }
}
