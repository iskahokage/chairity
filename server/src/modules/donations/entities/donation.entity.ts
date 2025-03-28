import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { BeneficiaryEntity } from '../../beneficiaries/entities/beneficiary.entity';
import { TransactionEntity } from '../../transactions/entities/transaction.entity';

export enum PaymentMethod {
    CARD = 'card',
    CRYPTO = 'crypto',
    BANK_TRANSFER = 'bank_transfer',
}

export enum DonationStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed',
}

@Entity('donations')
export class DonationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, (user) => user.donations, { nullable: true })
    user: UserEntity;

    @ManyToOne(() => BeneficiaryEntity, (beneficiary) => beneficiary.donations)
    beneficiary: BeneficiaryEntity;

    @OneToMany(
        () => TransactionEntity,
        (transactions) => transactions.donations,
    )
    transactions: TransactionEntity[];

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'enum', enum: PaymentMethod })
    paymentMethod: PaymentMethod;

    @Column({ type: 'enum', enum: DonationStatus })
    status: DonationStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
