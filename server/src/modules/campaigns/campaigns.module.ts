import { Module } from '@nestjs/common';
import { CampaignsController } from './controllers/campaigns/campaigns.controller';
import { CampaignsService } from './services/campaigns/campaigns.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignEntity } from './entities/campaign.entity';
import { UsersModule } from '../users/users.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { VolunteersModule } from '../volunteers/volunteers.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CampaignEntity]),
        UsersModule,
        OrganizationsModule,
        VolunteersModule,
    ],
    controllers: [CampaignsController],
    providers: [CampaignsService],
})
export class CampaignsModule {}
