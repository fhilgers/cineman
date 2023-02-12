import { SeatType } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsUUID,
  Min,
  Validate,
} from 'class-validator';
import { IsTheater } from '../../theater/theater.validator';
import { IsSeatUniqueForTheater } from '../seat.validator';

export class CreateSeatDto {
  @Min(1)
  @IsInt()
  @IsSeatUniqueForTheater('theaterId')
  number: number;

  @Min(1)
  @IsInt()
  row: number;

  @IsOptional()
  @IsEnum(SeatType)
  type?: SeatType;

  @IsUUID()
  @IsTheater()
  theaterId: string;
}
