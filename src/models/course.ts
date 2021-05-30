import {
  Index,
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import type { COURSE } from '@data/course-keys-types';
import type { BUNDLE } from '@data/bundle-keys-types';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column('varchar')
  userId: string;

  @Column('varchar')
  courseId: COURSE;

  @Column('varchar')
  bundleId: BUNDLE;

  @CreateDateColumn()
  createdAt: Date;

  @Column('int')
  price: number;

  @Column('varchar')
  currency: string;

  @Column('varchar')
  paymentType: string;

  @Column('varchar')
  coupon: string;
}
