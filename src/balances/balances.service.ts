import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../expenses/entities/expense.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BalancesService {
  constructor(
    @InjectRepository(Expense)
    private expensesRepository: Repository<Expense>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async calculateBalance(tripId: number): Promise<any> {
    const expenses = await this.expensesRepository.find({ where: { trip: { id: tripId } } });
    const participants = await this.usersRepository.find();
    const totalSpent = new Map<number, number>();

    expenses.forEach(expense => {
      const participantsList = Array.isArray(expense.participants) ? expense.participants : [];
      
      participantsList.forEach(participantIdStr => {
        const participantId = Number(participantIdStr);
        const currentSpent = totalSpent.get(participantId) || 0;
        totalSpent.set(participantId, currentSpent + expense.amount / participantsList.length);
      });
    });

    const balances: { user: User; spent: number }[] = [];
    participants.forEach(user => {
      const spent = totalSpent.get(user.id) || 0;
      balances.push({ user, spent });
    });
    return balances;
  }

  async settleBalances(tripId: number): Promise<any> {
    return this.calculateBalance(tripId);
  }
}
