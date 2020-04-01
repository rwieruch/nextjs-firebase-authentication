import {
  Index,
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
