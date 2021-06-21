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
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Index({ unique: true })
  @Column('varchar')
  coupon: string;

  @Column('int')
  discount: number;

  @Column('int')
  count: number;

  @Column('timestamp')
  expiresAt: Date;

  @Column({ type: 'varchar', nullable: true })
  courseId: COURSE;

  @Column({ type: 'varchar', nullable: true })
  bundleId: BUNDLE;
}
