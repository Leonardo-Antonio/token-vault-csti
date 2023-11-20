import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
} from 'typeorm';

@Entity('Cards')
@Index('idx_digits_bin', ['bin', 'last4'])
export class CardEntity {
  @PrimaryGeneratedColumn()
  cardId?: number;

  @Column()
  merchantId: string;

  @Column()
  reqId: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  expirationYear: string;

  @Column({ nullable: false })
  expirationMonth: string;

  @Column({ nullable: false })
  cvv: string;

  @Column({ name: 'last4', nullable: false })
  last4: string;

  @Column({ nullable: false })
  bin: string;

  @Column({ nullable: false })
  network: string;
  
  @Column({ name: 'regDate' })
  regDate: string;

  @Column({ name: 'regDatetime' })
  regDatetime: string;

  @Column({ name: 'regTimestamp' })
  regTimestamp: number;
}
