import {
    HttpException,
    HttpStatus,
    Injectable,
    UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity, UserRole } from '../../entities/user.entity';
import { UpdateUserDto } from '../../dto/update-user.dto/update-user.dto';
import { CreateUserDto } from '../../../auth/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { RolesGuard } from '../../../auth/guards/roles.guard';

@Injectable()
@UseGuards(RolesGuard)
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find({ relations: ['organizations'] });
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return await this.userRepository.findOne({ where: { email } });
    }

    async findOne(id: string): Promise<UserEntity | null> {
        return await this.userRepository.findOne({ where: { id } });
    }

    async findUserWithOrganization(id: string): Promise<UserEntity | null> {
        return await this.userRepository.findOne({
            where: { id },
            relations: ['organizations'],
        });
    }

    async update(
        id: string,
        updateUserDto: UpdateUserDto,
    ): Promise<UserEntity | null> {
        await this.userRepository.update(id, updateUserDto);
        return await this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const password = String(createUserDto.password);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        const { role } = createUserDto;
        if (role === UserRole.ORGANIZER) {
            throw new HttpException(
                'Organizers can be added by Admins only',
                HttpStatus.FORBIDDEN,
            );
        }
        return await this.userRepository.save(user);
    }
}
