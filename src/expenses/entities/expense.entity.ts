// src/expenses/entities/expense.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Trip } from '../../trips/entities/trip.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => User)
  paidBy: User;

  // Se almacenarán los IDs de los participantes como una lista separada por comas.
  @Column('simple-array')
  participants: number[];

  @ManyToOne(() => Trip, trip => trip.expenses)
  trip: Trip;
}
