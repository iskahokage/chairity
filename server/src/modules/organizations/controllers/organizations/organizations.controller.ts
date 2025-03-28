import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { OrganizationsService } from '../../services/organizations/organizations.service';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { UserEntity, UserRole } from '../../../users/entities/user.entity';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { JwtGuard } from '../../../auth/guards/jwt.guard';
import { CreateOrganizationDto } from '../../dto/create-organization.dto';
import { OrganizationEntity } from '../../entities/organization.entity';
import { Request } from 'express';
import { JwtPayloadDto } from '../../../auth/dto/jwt.dto';

@Controller('organizations')
export class OrganizationsController {
    constructor(private readonly organizationService: OrganizationsService) {}

    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    @UseGuards(JwtGuard)
    @Post('/become-organizer/:id')
    async becomeOrganizer(@Param('id') id: string) {
        await this.organizationService.becomeOrganizer(id);
    }

    @Roles(UserRole.ADMIN, UserRole.ORGANIZER)
    @UseGuards(RolesGuard)
    @UseGuards(JwtGuard)
    @Post()
    async createOrganization(
        @Req() req: Request,
        @Body() createOrganizationDto: CreateOrganizationDto,
    ): Promise<OrganizationEntity> {
        const userId = <JwtPayloadDto>req.user;
        const result = await this.organizationService.createOrganization(
            userId.sub,
            createOrganizationDto,
        );
        return result;
    }

    @Get()
    async getOrganizations() {
        const result = await this.organizationService.getAllOrganizations();
        return result;
    }
    @Get(':id')
    async getOrganizationsById(@Param('id') id: string) {
        const result = await this.organizationService.findOrganizationById(id);
        return result;
    }
}
