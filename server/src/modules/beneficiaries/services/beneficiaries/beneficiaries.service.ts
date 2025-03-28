import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BeneficiaryEntity } from '../../entities/beneficiary.entity';
import { CreateBeneficiaryDto } from '../../dto/create-beneficiary.dto';
import { UpdateBeneficiaryDto } from '../../dto/update-beneficiary.dto';

@Injectable()
export class BeneficiariesService {
    constructor(
        @InjectRepository(BeneficiaryEntity)
        private beneficiaryRepository: Repository<BeneficiaryEntity>,
    ) {}

    async updateBeneficiary(
        id: string,
        updateBeneficiaryDto: UpdateBeneficiaryDto,
    ): Promise<BeneficiaryEntity> {
        const beneficiary = await this.beneficiaryRepository.findOne({
            where: { id },
        });

        if (!beneficiary) {
            throw new NotFoundException(`Beneficiary with ID ${id} not found`);
        }

        Object.assign(beneficiary, updateBeneficiaryDto);
        return await this.beneficiaryRepository.save(beneficiary);
    }

    async createBeneficiary(
        createBeneficiaryDto: CreateBeneficiaryDto,
    ): Promise<BeneficiaryEntity> {
        const { beneficiary_pin } = createBeneficiaryDto;
        const oldBeneficiary = await this.findOneByPin(beneficiary_pin);

        if (oldBeneficiary) {
            throw new ConflictException('Beneficiary already exists');
        }
        const beneficiary =
            this.beneficiaryRepository.create(createBeneficiaryDto);

        return await this.beneficiaryRepository.save(beneficiary);
    }

    async findAll(): Promise<BeneficiaryEntity[]> {
        return await this.beneficiaryRepository.find();
    }

    async findOne(id: string): Promise<BeneficiaryEntity | null> {
        const beneficiary = await this.beneficiaryRepository.findOne({
            where: { id },
        });
        if (!beneficiary) {
            return null;
        }
        return beneficiary;
    }
    async findOneByPin(
        beneficiary_pin: string,
    ): Promise<BeneficiaryEntity | null> {
        const beneficiary = await this.beneficiaryRepository.findOne({
            where: { beneficiary_pin },
        });

        if (!beneficiary) {
            return null;
        }
        return beneficiary;
    }
}
