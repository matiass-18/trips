// src/balances/balances.module.ts
import { Module } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { BalancesController } from './balances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from '../expenses/entities/expense.entity';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense, User]),
    JwtModule.register({
      secret: 'your-secret-key', 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [BalancesService],
  controllers: [BalancesController],
})
export class BalancesModule {}
