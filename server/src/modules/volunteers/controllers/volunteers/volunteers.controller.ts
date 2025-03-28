import { Controller, Get, Param, Post } from '@nestjs/common';
import { VolunteersService } from '../../services/volunteers/volunteers.service';

@Controller('volunteers')
export class VolunteersController {
    constructor(private readonly volunteersService: VolunteersService) {}
    @Post(':userId')
    async createVolunteer(@Param('userId') userId: string) {
        return this.volunteersService.createVolunteer(userId);
    }

    @Get('/user/:id')
    async getVolunteerByUserId(@Param('id') id: string) {
        return this.volunteersService.findVolunteerByUserId(id);
    }
    @Get(':id')
    async getVolunteerById(@Param('id') id: string) {
        return this.volunteersService.findVolunteer(id);
    }

    @Get('')
    async getVolunteers() {
        return this.volunteersService.getVolunteers();
    }
}
