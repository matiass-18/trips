// src/expenses/expenses.module.ts
import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Trip } from '../trips/entities/trip.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, Trip, User])],
  providers: [ExpensesService],
  controllers: [ExpensesController],
})
export class ExpensesModule {}
