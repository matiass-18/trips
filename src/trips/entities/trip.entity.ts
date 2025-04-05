// src/trips/entities/trip.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Expense } from '../../expenses/entities/expense.entity';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['COP', 'USD'] })
  currency: string;

  @ManyToMany(() => User, user => user.trips)
  @JoinTable()
  participants: User[];

  @OneToMany(() => Expense, expense => expense.trip)
  expenses: Expense[];
}
