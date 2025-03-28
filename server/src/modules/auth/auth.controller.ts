import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtGuard } from './guards/jwt.guard';
import { Request } from 'express';
import { UserEntity, UserRole } from '../users/entities/user.entity';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    create(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Post('/login')
    @UseGuards(LocalGuard)
    login(@Req() req: Request) {
        if (req.user) {
            const user = this.authService.login(req.user as UserEntity);
            return user;
        }
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JwtGuard, RolesGuard)
    @Get('/status')
    status(@Req() req: Request) {
        console.log(req.user);
        return req.user;
    }
}
