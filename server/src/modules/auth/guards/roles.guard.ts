import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../users/entities/user.entity';
import { ROLES_KEY } from '../../../common/decorators/roles.decorator';
import { Request } from 'express';
import { JwtPayloadDto } from '../dto/jwt.dto';
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requiredRoles) {
            return true; // Если роли не заданы, доступ открыт для всех
        }

        const request = context.switchToHttp().getRequest<Request>();
        const user = request.user as JwtPayloadDto; // Извлекаем пользователя из запроса
        if (!user) {
            throw new ForbiddenException('Пользователь не авторизован');
        }
        if (!requiredRoles.includes(user.role)) {
            throw new ForbiddenException('У вас нет доступа к этому ресурсу');
        }
        return user && user.role && requiredRoles.includes(user.role);
    }
}
