import { SeatType } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, IsUUID, Min } from 'class-validator';
import { IsTheater } from '@cineman/theater';
import { IsSeatUniqueForTheater } from '../seat.validator';

export class CreateRatingDto {
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
