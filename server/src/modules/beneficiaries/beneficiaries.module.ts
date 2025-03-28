import { Module } from '@nestjs/common';
import { BeneficiariesController } from './controllers/beneficiaries/beneficiaries.controller';
import { BeneficiariesService } from './services/beneficiaries/beneficiaries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeneficiaryEntity } from './entities/beneficiary.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BeneficiaryEntity])],
    controllers: [BeneficiariesController],
    providers: [BeneficiariesService],
})
export class BeneficiariesModule {}
