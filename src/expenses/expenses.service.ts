import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Trip } from '../trips/entities/trip.entity';
import { User } from '../users/entities/user.entity';


@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expensesRepository: Repository<Expense>,
    @InjectRepository(Trip)
    private tripsRepository: Repository<Trip>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const trip = await this.tripsRepository.findOne({ where: { id: createExpenseDto.tripId } });
    if (!trip) {
      throw new NotFoundException('Viaje no encontrado');
    }
    const payer = await this.usersRepository.findOne({ where: { id: createExpenseDto.payerId } });
    if (!payer) {
      throw new NotFoundException('Pagador no encontrado');
    }
    const expense = this.expensesRepository.create({
      ...createExpenseDto,
      trip,
      paidBy: payer, 
    });
    await this.expensesRepository.save(expense);
    return expense;
  }

  async findByTripId(tripId: number): Promise<Expense[]> {
    return this.expensesRepository.find({
      where: { trip: { id: tripId } },
      relations: ['trip', 'paidBy'],
    });
  }

  async findById(expenseId: number): Promise<Expense | null> {
    return this.expensesRepository.findOne({
      where: { id: expenseId },
      relations: ['trip', 'paidBy'],
    });
  }
}
