import { Module } from '@nestjs/common';
import { OrganizationsController } from './controllers/organizations/organizations.controller';
import { OrganizationsService } from './services/organizations/organizations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from './entities/organization.entity';
import { UsersModule } from '../users/users.module';
import { VolunteersModule } from '../volunteers/volunteers.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([OrganizationEntity]),
        UsersModule,
        VolunteersModule,
    ],
    controllers: [OrganizationsController],
    providers: [OrganizationsService],
    exports: [OrganizationsService],
})
export class OrganizationsModule {}
