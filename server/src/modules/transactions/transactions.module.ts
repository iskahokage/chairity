import { Module } from '@nestjs/common';
import { TransactionsController } from './controllers/transactions/transactions.controller';
import { TransactionsService } from './services/transactions/transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TransactionEntity])],
    controllers: [TransactionsController],
    providers: [TransactionsService],
})
export class TransactionsModule {}
