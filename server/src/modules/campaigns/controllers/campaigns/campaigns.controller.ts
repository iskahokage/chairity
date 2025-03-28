import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { CampaignsService } from '../../services/campaigns/campaigns.service';
import { JwtGuard } from '../../../auth/guards/jwt.guard';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { UserRole } from '../../../users/entities/user.entity';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Request } from 'express';
import { CreateCampaignDto } from '../../dto/create-campaign.dto';
import { JwtPayloadDto } from '../../../auth/dto/jwt.dto';
import { CampaignEntity } from '../../entities/campaign.entity';

@Controller('campaigns')
export class CampaignsController {
    constructor(private readonly campaignsService: CampaignsService) {}

    @Post('/:organizationId')
    @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
    @UseGuards(RolesGuard)
    @UseGuards(JwtGuard)
    async createCampaign(
        @Req() req: Request,
        @Param('organizationId') organizationId: string,
        @Body() createCampaignDto: CreateCampaignDto,
    ) {
        const user = <JwtPayloadDto>req.user;

        const result = await this.campaignsService.createCampaign(
            user.sub,
            organizationId,
            createCampaignDto,
        );
        return result;
    }

    @Post('/:campaignId/assign-volunteer/:volunteerId')
    async assignVolunteerToCampaign(
        @Param('campaignId') campaignId: string,
        @Param('volunteerId') volunteerId: string,
    ) {
        await this.campaignsService.assignVolunteerToCampaign(
            campaignId,
            volunteerId,
        );
    }

    @Get()
    async getCampaigns(): Promise<CampaignEntity[]> {
        return await this.campaignsService.getCampaigns();
    }
}
