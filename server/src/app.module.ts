import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { DonationsModule } from './modules/donations/donations.module';
import { VolunteersModule } from './modules/volunteers/volunteers.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { BeneficiariesModule } from './modules/beneficiaries/beneficiaries.module';
import { UsersModule } from './modules/users/users.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './modules/users/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';
import { AdminModule } from './modules/admin/admin.module';

@Module({
    imports: [
        UsersModule,
        BeneficiariesModule,
        OrganizationsModule,
        VolunteersModule,
        DonationsModule,
        CampaignsModule,
        TransactionsModule,
        CommonModule,
        ConfigModule.forRoot({ isGlobal: true }), // Читаем .env
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: +configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                autoLoadEntities: true,
                synchronize: true,
                entities: [UserEntity],
            }),
        }),
        AuthModule,
        AdminModule,
    ],
    controllers: [AppController, AuthController],
    providers: [AppService],
})
export class AppModule {}
