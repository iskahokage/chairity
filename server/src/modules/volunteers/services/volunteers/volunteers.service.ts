import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../../../users/services/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    VolunteerEntity,
    VolunteerStatus,
} from '../../entities/volunteer.entity';
import { UserRole } from '../../../users/entities/user.entity';
import { UpdateVolunteerDto } from '../../dto/update-volunteer.dto';

@Injectable()
export class VolunteersService {
    constructor(
        private readonly usersService: UsersService,
        @InjectRepository(VolunteerEntity)
        private readonly volunteerRepository: Repository<VolunteerEntity>,
    ) {}
    //TO DO
    async createVolunteer(userId: string) {
        const user = await this.usersService.findOne(userId);

        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }

        if (user.role === UserRole.DONOR) {
            throw new BadRequestException(
                'Только донор может стать волонтёром',
            );
        }

        const volunteer = this.volunteerRepository.create({
            status: VolunteerStatus.ACTIVE,
            user,
        });
        await this.volunteerRepository.save(volunteer);

        // Обновляем роль пользователя
        user.role = UserRole.VOLUNTEER;
        await this.usersService.update(userId, user);

        return volunteer;
    }
    async findVolunteerByUserId(userId: string) {
        const user = await this.volunteerRepository.findOne({
            where: { user: { id: userId } },
            relations: ['user'],
        });

        if (!user) {
            throw new NotFoundException('Volunteer with userId not found');
        }
        return user;
    }

    async findVolunteer(id: string) {
        const volunteer = await this.volunteerRepository.findOne({
            where: { id },
            relations: ['user'],
        });

        if (!volunteer) {
            throw new NotFoundException('Volunteer not found');
        }
        return volunteer;
    }

    async getVolunteers() {
        return await this.volunteerRepository.find({
            relations: ['user', 'organization', 'campaigns'],
        });
    }

    async updateVolunteers(
        id: string,
        updateVolunteerDto: UpdateVolunteerDto,
    ): Promise<VolunteerEntity> {
        const volunteer = await this.volunteerRepository.findOne({
            where: { id },
        });

        if (!volunteer) {
            throw new NotFoundException(`Волонтер с id ${id} не найден`);
        }

        Object.assign(volunteer, updateVolunteerDto);
        return await this.volunteerRepository.save(volunteer);
    }
}
