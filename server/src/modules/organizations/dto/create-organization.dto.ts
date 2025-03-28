import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateOrganizationDto {
    @IsNotEmpty()
    name: string;

    @MaxLength(500)
    description: string;

    @IsString()
    website: string;

    @IsEmail()
    contact_email: string;

    @MaxLength(20, {
        message: 'Max phone number length 20',
    })
    phone: string;
}
