import { IsEmail, MinLength } from 'class-validator';

export class LoginUserDto {
    @IsEmail()
    username: string;

    @MinLength(6)
    password: string;
}
