import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private tripsRepository: Repository<Trip>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createTripDto: CreateTripDto): Promise<Trip> {
    const participantIds = createTripDto.participants ?? [];
    const participants = await this.usersRepository.findByIds(participantIds);

    const trip = this.tripsRepository.create({
      ...createTripDto,
      participants,
    });
    await this.tripsRepository.save(trip);
    return trip;
  }

  async findAllByUser(email: string): Promise<Trip[]> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return this.tripsRepository
      .createQueryBuilder('trip')
      .leftJoinAndSelect('trip.participants', 'participant')
      .where('participant.id = :userId', { userId: user.id })
      .getMany();
  }

  async findOne(id: number): Promise<Trip> {
    const trip = await this.tripsRepository.findOne({
      where: { id },
      relations: ['participants', 'expenses'],
    });
    if (!trip) {
      throw new NotFoundException('Viaje no encontrado');
    }
    return trip;
  }

  async joinTrip(tripId: number, userEmail: string): Promise<Trip> {
    const trip = await this.findOne(tripId);
    const user = await this.usersRepository.findOne({ where: { email: userEmail } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if (!trip.participants.find(participant => participant.id === user.id)) {
      trip.participants.push(user);
      await this.tripsRepository.save(trip);
    }
    return trip;
  }
}
