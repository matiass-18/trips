import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { ParseIntPipe } from '../common/pipes/validation.pipe';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('trips/:tripId/balances')
@UseGuards(JwtAuthGuard)
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}

  @Get()
  async getBalance(@Param('tripId', ParseIntPipe) tripId: number) {
    const balances = await this.balancesService.calculateBalance(tripId);
    return balances;
  }

  @Post('settle')
  async settleBalances(@Param('tripId', ParseIntPipe) tripId: number) {
    return this.balancesService.settleBalances(tripId);
  }
}
