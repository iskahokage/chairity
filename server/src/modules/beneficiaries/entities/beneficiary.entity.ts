import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { DonationEntity } from '../../donations/entities/donation.entity';

@Entity('beneficiaries')
export class BeneficiaryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    fullName: string;

    @Column({ type: 'varchar', length: 255 })
    beneficiary_pin: string;

    @Column({ type: 'int' })
    age: number;

    @Column({ type: 'varchar', length: 255 })
    location: string;

    @Column({ type: 'text' })
    medicalCondition: string;

    @Column({ type: 'text' })
    story: string;

    @Column({ type: 'varchar', nullable: true })
    photoUrl: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    neededAmount: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    collectedAmount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => DonationEntity, (donations) => donations.beneficiary)
    donations: DonationEntity[];
}
