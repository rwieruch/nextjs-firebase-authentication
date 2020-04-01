import { Between } from 'typeorm';
import { Connection, Repository } from 'typeorm';

import { VisitorByDay, PartnerPayment } from '@generated/client';
import { PartnerVisitor, PartnerSale } from '@models/partner';
import { Course } from '@models/course';
import { PARTNER_PERCENTAGE } from '@constants/partner';

const sameDay = (x: Date, y: Date) => {
  return (
    x.getFullYear() === y.getFullYear() &&
    x.getMonth() === y.getMonth() &&
    x.getDate() === y.getDate()
  );
};

const sameMonth = (x: Date, y: Date) => {
  return (
    x.getFullYear() === y.getFullYear() &&
    x.getMonth() === y.getMonth()
  );
};

export class PartnerConnector {
  partnerVisitorRepository: Repository<PartnerVisitor>;
  partnerSaleRepository: Repository<PartnerSale>;

  constructor(connection: Connection) {
    this.partnerVisitorRepository = connection?.getRepository(
      PartnerVisitor
    );

    this.partnerSaleRepository = connection?.getRepository(
      PartnerSale
    );
  }

  async createSale(course: Course, partnerId: string) {
    const royalty = Math.round(
      (course.price / 100) * PARTNER_PERCENTAGE
    );

    const partnerSale = new PartnerSale();

    partnerSale.partnerId = partnerId;
    partnerSale.royalty = royalty;
    partnerSale.course = course;

    return await this.partnerSaleRepository.save(partnerSale);
  }

  async getSalesByPartner(
    userId: string,
    offset: number,
    limit: number
  ) {
    const edges = await this.partnerSaleRepository.find({
      where: { partnerId: userId },
      relations: ['course'],
      skip: offset,
      take: limit,
    });

    const total = await this.partnerSaleRepository.count({
      partnerId: userId,
    });

    return { edges, total };
  }

  async getPaymentsByPartner(userId: string) {
    const partnerSales = await this.partnerSaleRepository.find({
      where: { partnerId: userId },
    });

    const aggregateByMonth = (
      acc: PartnerPayment[],
      dbValue: PartnerSale
    ) => {
      const prevValue = acc[acc.length - 1];

      const newEntry =
        !acc.length ||
        !sameMonth(prevValue.createdAt, dbValue.createdAt);

      if (newEntry) {
        acc = acc.concat({
          createdAt: dbValue.createdAt,
          royalty: dbValue.royalty,
        });
      } else {
        acc[acc.length - 1].royalty =
          prevValue.royalty + dbValue.royalty;
      }

      return acc;
    };

    return partnerSales.reduce(aggregateByMonth, []);
  }

  async createVisitor(partnerId: string) {
    const partnerVisitor = new PartnerVisitor();

    partnerVisitor.partnerId = partnerId;

    return await this.partnerVisitorRepository.save(partnerVisitor);
  }

  async getVisitorsBetween(from: Date, to: Date) {
    return await this.partnerVisitorRepository.find({
      createdAt: Between(from, to),
    });
  }

  async getVisitorsBetweenAggregatedByDate(from: Date, to: Date) {
    const visitors = await this.getVisitorsBetween(from, to);

    const aggregateByDay = (
      acc: VisitorByDay[],
      dbValue: PartnerVisitor
    ) => {
      const prevValue = acc[acc.length - 1];

      const newEntry =
        !acc.length || !sameDay(prevValue.date, dbValue.createdAt);

      if (newEntry) {
        acc = acc.concat({
          date: dbValue.createdAt,
          count: 1,
        });
      } else {
        acc[acc.length - 1].count = prevValue.count + 1;
      }

      return acc;
    };

    return visitors.reduce(aggregateByDay, []);
  }
}
