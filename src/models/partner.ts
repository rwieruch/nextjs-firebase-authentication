import {
  Index,
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Course } from './course';

@Entity()
export class PartnerVisitor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column('varchar')
  partnerId: string;

  @CreateDateColumn()
  createdAt: Date;
}

@Entity()
export class PartnerSale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column('varchar')
  partnerId: string;

  @OneToOne(type => Course)
  @JoinColumn()
  course: Course;

  @CreateDateColumn()
  createdAt: Date;
}
