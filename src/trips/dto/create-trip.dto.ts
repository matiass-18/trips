import { IsString, IsArray, IsOptional, IsEnum } from 'class-validator';

export enum Currency {
  COP = 'COP',
  USD = 'USD',
}

export class CreateTripDto {
  @IsString()
  name: string;

  @IsEnum(Currency)
  currency: Currency;

  @IsArray()
  @IsOptional()  
  participants?: number[];
}
