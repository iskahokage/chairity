import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from '../../users/entities/user.entity';

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    surname: string;

    @IsNotEmpty()
    pin: string;

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;

    @IsEnum(UserRole)
    role: UserRole;
}
