import {
    IsString,
    IsInt,
    IsDecimal,
    IsOptional,
    IsUrl,
    Min,
    MaxLength,
} from 'class-validator';

export class CreateBeneficiaryDto {
    @IsString()
    @MaxLength(255)
    fullName: string;

    @IsString()
    @MaxLength(20)
    beneficiary_pin: string;

    @IsInt()
    @Min(0)
    age: number;

    @IsString()
    @MaxLength(255)
    location: string;

    @IsString()
    medicalCondition: string;

    @IsString()
    story: string;

    @IsOptional()
    @IsUrl()
    photoUrl?: string;

    @IsDecimal()
    @Min(0)
    neededAmount: number;
}
