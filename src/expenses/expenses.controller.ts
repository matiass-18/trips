import { Controller, Post, Get, Param, Body, NotFoundException, UseGuards } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ParseIntPipe } from '../common/pipes/validation.pipe';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('trips/:tripId/expenses')
@UseGuards(JwtAuthGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async create(
    @Param('tripId', ParseIntPipe) tripId: number,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    createExpenseDto.tripId = tripId;
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  async findByTripId(@Param('tripId', ParseIntPipe) tripId: number) {
    const expenses = await this.expensesService.findByTripId(tripId);
    if (!expenses.length) {
      throw new NotFoundException('No se encontraron gastos para este viaje');
    }
    return expenses;
  }

  @Get(':expenseId')
  async findById(
    @Param('tripId', ParseIntPipe) tripId: number,
    @Param('expenseId', ParseIntPipe) expenseId: number,
  ) {
    const expense = await this.expensesService.findById(expenseId);
    if (!expense || expense.trip.id !== tripId) {
      throw new NotFoundException('Gasto no encontrado para este viaje');
    }
    return expense;
  }
}
