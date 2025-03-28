import { UserRole } from '../../users/entities/user.entity';

export class JwtPayloadDto {
    email: string;
    role: UserRole;
    sub: string; // Это будет ID пользователя
    iat?: number; // Время создания токена
    exp?: number; // Время истечения токена
}
