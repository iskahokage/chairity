import {
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../../users/services/users/users.service';
import { OrganizationsService } from '../../../organizations/services/organizations/organizations.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CampaignEntity } from '../../entities/campaign.entity';
import { CreateCampaignDto } from '../../dto/create-campaign.dto';
import { VolunteersService } from '../../../volunteers/services/volunteers/volunteers.service';
import { UpdateCampaignDto } from '../../dto/update-campaign.dto';
import { UserRole } from '../../../users/entities/user.entity';

@Injectable()
export class CampaignsService {
    constructor(
        private usersService: UsersService,
        private organizationsService: OrganizationsService,
        private volunteersService: VolunteersService,

        @InjectRepository(CampaignEntity)
        private readonly campaignRepository: Repository<CampaignEntity>,
    ) {}

    async createCampaign(
        userId: string,
        organizationId: string,
        campaignDto: CreateCampaignDto,
    ): Promise<CampaignEntity> {
        if (!userId) throw new UnauthorizedException('Not authorized');

        const user = await this.usersService.findUserWithOrganization(userId);

        if (!user?.organizations) {
            throw new ForbiddenException(
                'You do not have permission to create a campaign for this organization',
            );
        }
        const hasAccess = user.organizations.some(
            (org) => org.id === organizationId,
        );

        if (!hasAccess) {
            throw new ForbiddenException(
                'You do not have permission to create a campaign for this organization',
            );
        }

        const organization =
            await this.organizationsService.findOrganizationById(
                organizationId,
            );

        const campaign = this.campaignRepository.create({
            ...campaignDto,
            organization,
        });

        return await this.campaignRepository.save(campaign);
    }
    async assignVolunteerToCampaign(campaignId: string, userId: string) {
        const campaign = await this.campaignRepository.findOne({
            where: { id: campaignId },
            relations: ['volunteers'],
        });

        if (!campaign) {
            throw new NotFoundException('Кампания не найдена');
        }

        const volunteer = await this.volunteersService.findVolunteer(userId);

        if (!volunteer) {
            throw new ForbiddenException('Такого волонтера нет');
        }

        // Проверяем, не добавлен ли уже волонтер
        if (campaign.volunteers.some((v) => v.id === volunteer.id)) {
            throw new ConflictException('Волонтер уже привязан к кампании');
        }

        campaign.volunteers.push(volunteer);
        await this.campaignRepository.save(campaign);

        return { message: 'Волонтер успешно добавлен' };
    }

    async updateCampaign(
        id: string,
        updateCampaignDto: UpdateCampaignDto,
    ): Promise<CampaignEntity> {
        const campaign = await this.campaignRepository.findOne({
            where: { id },
        });

        if (!campaign) {
            throw new NotFoundException(`Кампания с id ${id} не найдена`);
        }

        Object.assign(campaign, updateCampaignDto);
        return await this.campaignRepository.save(campaign);
    }

    async getCampaigns(): Promise<CampaignEntity[]> {
        return await this.campaignRepository.find({
            relations: ['volunteers'],
        });
    }
}
