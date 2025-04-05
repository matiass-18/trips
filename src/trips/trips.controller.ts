import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ParseIntPipe } from '../common/pipes/validation.pipe';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTripDto: CreateTripDto, @Request() req) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    return this.tripsService.findAllByUser(req.user.email);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripsService.findOne(id);
  }

  @Post('join')
  @UseGuards(JwtAuthGuard)
  async joinTrip(@Request() req, @Body() body: { tripId: number }) {
    return this.tripsService.joinTrip(body.tripId, req.user.email);
  }
}
