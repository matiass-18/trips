import { IsString, IsArray, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  title: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNumber()
  payerId: number;

  @IsArray()
  participants: number[];

  @IsOptional()
  @IsNumber()
  tripId?: number;
}
