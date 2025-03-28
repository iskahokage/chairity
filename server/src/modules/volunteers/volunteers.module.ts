import { Module } from '@nestjs/common';
import { VolunteersController } from './controllers/volunteers/volunteers.controller';
import { VolunteersService } from './services/volunteers/volunteers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VolunteerEntity } from './entities/volunteer.entity';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([VolunteerEntity]), UsersModule],
    controllers: [VolunteersController],
    providers: [VolunteersService],
    exports: [VolunteersService],
})
export class VolunteersModule {}
