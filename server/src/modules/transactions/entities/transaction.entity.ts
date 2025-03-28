import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { DonationEntity } from '../../donations/entities/donation.entity';

export enum TransactionStatus {
    PROCESSING = 'processing',
    SUCCESSFUL = 'successful',
    FAILED = 'failed',
}

@Entity('transactions')
export class TransactionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => DonationEntity, (donation) => donation.transactions)
    donations: DonationEntity;

    @Column({ type: 'varchar', unique: true })
    transactionId: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'varchar', default: 'USD' })
    currency: string;

    @Column({ type: 'enum', enum: TransactionStatus })
    status: TransactionStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
