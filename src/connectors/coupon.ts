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

  async redeemCoupon(coupon: string, price: number) {
    const couponEntity = await this.couponRepository.findOne({
      coupon,
    });

    if (!couponEntity) {
      return price;
    }

    const isExpired =
      new Date().getTime() >
      new Date(couponEntity.expiresAt).getTime();

    if (isExpired) {
      await this.couponRepository.delete(couponEntity.id);
      return price;
    }

    const discountPrice = Number(
      ((price / 100) * (100 - couponEntity.discount)).toFixed(0)
    );

    return discountPrice;
  }

  async removeCoupon(coupon: string) {
    const couponEntity = await this.couponRepository.findOne({
      coupon,
    });

    if (!couponEntity) {
      return;
    }

    if (couponEntity.count > 1) {
      couponEntity.count = couponEntity.count - 1;
      await this.couponRepository.save(couponEntity);
    } else {
      await this.couponRepository.remove(couponEntity);
    }

    return;
  }
}
