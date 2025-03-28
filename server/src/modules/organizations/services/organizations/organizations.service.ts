import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../../../users/services/users/users.service';
import { VolunteersService } from '../../../volunteers/services/volunteers/volunteers.service';
import { UserRole } from '../../../users/entities/user.entity';
import {
    VolunteerEntity,
    VolunteerStatus,
} from '../../../volunteers/entities/volunteer.entity';
import { CreateOrganizationDto } from '../../dto/create-organization.dto';
import { OrganizationEntity } from '../../entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateOrganizationDto } from '../../dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
    constructor(
        private readonly usersService: UsersService,
        private volunteersService: VolunteersService,

        @InjectRepository(OrganizationEntity)
        private readonly organizationRepository: Repository<OrganizationEntity>,
    ) {}

    async becomeOrganizer(userId: string) {
        const user = await this.usersService.findOne(userId);
        if (!user) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }
        if (user.role === UserRole.VOLUNTEER) {
            const volunteerRecord: VolunteerEntity =
                await this.volunteersService.findVolunteerByUserId(user.id);

            volunteerRecord.status = VolunteerStatus.INACTIVE;
        }
        user.role = UserRole.ORGANIZER;
        await this.usersService.update(userId, user);
    }

    async createOrganization(
        userId: string,
        createOrganizationDto: CreateOrganizationDto,
    ): Promise<OrganizationEntity> {
        const user = await this.usersService.findOne(userId);
        if (!user) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }
        const organization = this.organizationRepository.create({
            ...createOrganizationDto,
            createdBy: user,
        });

        await this.organizationRepository.save(organization);

        return organization;
    }

    async updateOrganization(
        id: string,
        updateOrganizationDto: UpdateOrganizationDto,
    ): Promise<OrganizationEntity> {
        const organization = await this.organizationRepository.findOne({
            where: { id },
        });

        if (!organization) {
            throw new NotFoundException(`Организация с id ${id} не найдена`);
        }

        Object.assign(organization, updateOrganizationDto);
        return await this.organizationRepository.save(organization);
    }

    async findOrganizationById(
        organizationId: string,
    ): Promise<OrganizationEntity> {
        const organization = await this.organizationRepository.findOne({
            where: { id: organizationId },
            relations: ['createdBy'],
        });
        if (!organization) {
            throw new NotFoundException(
                `Organization with id ${organizationId} not found`,
            );
        }

        return organization;
    }

    async getAllOrganizations(): Promise<OrganizationEntity[]> {
        return await this.organizationRepository.find({
            relations: ['createdBy', 'campaigns', 'volunteers'],
        });
    }
}
