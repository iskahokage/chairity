import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { OrganizationEntity } from '../../organizations/entities/organization.entity';
import { VolunteerEntity } from '../../volunteers/entities/volunteer.entity';

export enum CampaignStatus {
    ACTIVE = 'active',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

@Entity('campaigns')
export class CampaignEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @ManyToOne(
        () => OrganizationEntity,
        (organization) => organization.campaigns,
    )
    organization: OrganizationEntity;

    @ManyToMany(() => VolunteerEntity, (volunteer) => volunteer.campaigns)
    @JoinTable()
    volunteers: VolunteerEntity[];

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    targetAmount: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    collectedAmount: number;

    @Column({ type: 'enum', enum: CampaignStatus })
    status: CampaignStatus;

    @Column({ type: 'timestamp' })
    startDate: Date;

    @Column({ type: 'timestamp', nullable: true })
    endDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
