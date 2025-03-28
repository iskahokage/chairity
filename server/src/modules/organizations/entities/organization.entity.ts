import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { CampaignEntity } from '../../campaigns/entities/campaign.entity';
import { VolunteerEntity } from '../../volunteers/entities/volunteer.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('organizations')
export class OrganizationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'varchar', nullable: true })
    website: string;

    @Column({ type: 'varchar' })
    contact_email: string;

    @Column({ type: 'varchar', nullable: true })
    phone: string;

    @OneToMany(() => CampaignEntity, (campaign) => campaign.organization)
    campaigns: CampaignEntity[];

    @OneToMany(() => VolunteerEntity, (volunteers) => volunteers.organization)
    volunteers: VolunteerEntity;

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: 'createdBy' })
    createdBy: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
