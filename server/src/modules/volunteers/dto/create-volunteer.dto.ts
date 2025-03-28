import {
    IsUUID,
    IsEnum,
    IsOptional,
    IsString,
    ArrayNotEmpty,
    ArrayUnique,
} from 'class-validator';
import { VolunteerStatus } from '../entities/volunteer.entity';

export class CreateVolunteerDto {
    @IsUUID()
    userId: string;

    @IsUUID()
    organizationId: string;

    @IsEnum(VolunteerStatus)
    status: VolunteerStatus;

    @IsOptional()
    @IsString()
    assignedRegion?: string | null;

    @IsOptional()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsUUID('4', { each: true })
    campaignIds?: string[];
}
