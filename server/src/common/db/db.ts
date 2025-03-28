import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserEntity } from '../../modules/users/entities/user.entity';
import { VolunteerEntity } from '../../modules/volunteers/entities/volunteer.entity';
import { OrganizationEntity } from '../../modules/organizations/entities/organization.entity';
import { DonationEntity } from '../../modules/donations/entities/donation.entity';
import { BeneficiaryEntity } from '../../modules/beneficiaries/entities/beneficiary.entity';
import { TransactionEntity } from '../../modules/transactions/entities/transaction.entity';
import { CampaignEntity } from '../../modules/campaigns/entities/campaign.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false, // В сидах лучше работать с миграциями
    logging: true,
    entities: [
        UserEntity,
        VolunteerEntity,
        OrganizationEntity,
        DonationEntity,
        BeneficiaryEntity,
        TransactionEntity,
        CampaignEntity,
    ], // Добавь все нужные сущности
});
