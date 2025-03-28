import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { OrganizationEntity } from '../../organizations/entities/organization.entity';
import { CampaignEntity } from '../../campaigns/entities/campaign.entity';

export enum VolunteerStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

@Entity('volunteers')
export class VolunteerEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, (user) => user.volunteers)
    user: UserEntity;

    @ManyToOne(
        () => OrganizationEntity,
        (organization) => organization.volunteers,
    )
    organization: OrganizationEntity;

    @ManyToMany(() => CampaignEntity, (campaign) => campaign.volunteers)
    campaigns: CampaignEntity[];

    @Column({ type: 'enum', enum: VolunteerStatus })
    status: VolunteerStatus;

    @Column({ type: 'varchar', nullable: true })
    assignedRegion: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
