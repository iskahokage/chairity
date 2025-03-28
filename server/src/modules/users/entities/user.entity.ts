import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { DonationEntity } from '../../donations/entities/donation.entity';
import { VolunteerEntity } from '../../volunteers/entities/volunteer.entity';
import { OrganizationEntity } from '../../organizations/entities/organization.entity';

export enum UserRole {
    DONOR = 'donor',
    VOLUNTEER = 'volunteer',
    ORGANIZER = 'organizer',
    ADMIN = 'admin',
    USER = 'user',
}

@Entity('users')
export class UserEntity {
    @OneToMany(() => DonationEntity, (donations) => donations.user)
    donations: DonationEntity[];

    @OneToMany(() => VolunteerEntity, (volunteers) => volunteers.user)
    volunteers: VolunteerEntity[];

    @OneToMany(
        () => OrganizationEntity,
        (organizations) => organizations.createdBy,
    )
    organizations: OrganizationEntity[];

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    surname: string;

    @Column({ type: 'varchar', length: 255 })
    pin: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'enum', enum: UserRole })
    role: UserRole;

    @Column({ type: 'boolean', default: false })
    isActive: boolean;

    @Column({ type: 'boolean', default: false })
    isVerified: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
