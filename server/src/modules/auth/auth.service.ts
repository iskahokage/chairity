// src/modules/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/services/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from '../users/entities/user.entity';
import { JwtPayloadDto } from './dto/jwt.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser({
        username,
        password,
    }: LoginUserDto): Promise<UserEntity | null> {
        const user = await this.usersService.findByEmail(username);
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }

    login(user: UserEntity) {
        const payload: JwtPayloadDto = {
            email: user.email,
            sub: user.id,
            role: user.role,
        }; // Можно добавить другие данные
        return {
            access_token: this.jwtService.sign(payload),
            id: user.id,
        };
    }
    register(user: CreateUserDto) {
        return this.usersService.create(user);
    }
}
