// src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module'; // Если есть зависимость от модуля пользователей
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'your-secret-key', // Замените на более безопасный ключ
            signOptions: { expiresIn: '60m' }, // Токен будет действовать 60 минут
        }),
        UsersModule, // Если сервис авторизации зависит от пользователей
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService, LocalStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
