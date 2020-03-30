import {
  Index,
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Index()
  @Column('varchar')
  saleId: string;

  @CreateDateColumn()
  createdAt: Date;
}
