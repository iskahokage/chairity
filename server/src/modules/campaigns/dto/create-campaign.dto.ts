import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
} from 'class-validator';
import { CampaignStatus } from '../entities/campaign.entity';

export class CreateCampaignDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @MaxLength(500)
    description: string;

    @IsNumber()
    targetAmount: number;

    @IsNumber()
    collectedAmount: number;

    @IsEnum(CampaignStatus)
    status: CampaignStatus;

    @IsDateString()
    startDate: Date;

    @IsOptional()
    @IsDateString()
    endDate?: Date;
}
