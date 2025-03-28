import { Module } from '@nestjs/common';
import { DonationsController } from './controllers/donations/donations.controller';
import { DonationsService } from './services/donations/donations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationEntity } from './entities/donation.entity';

@Module({
    imports: [TypeOrmModule.forFeature([DonationEntity])],
    controllers: [DonationsController],
    providers: [DonationsService],
})
export class DonationsModule {}
