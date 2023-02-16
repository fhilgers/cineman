import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { IsUniqueTheaterName } from '../theater.validator';
import { Type } from 'class-transformer';
import { SeatType } from '@prisma/client';

export class CreateSeatWithoutTheaterDto {
  @Min(1)
  @IsInt()
  number: number;

  @Min(1)
  @IsInt()
  row: number;

  @IsOptional()
  @IsEnum(SeatType)
  type?: SeatType;
}

export class CreateTheaterDto {
  @IsNotEmpty()
  @IsUniqueTheaterName()
  name: string;

  @IsOptional()
  @IsArray()
  seats?: CreateSeatWithoutTheaterDto[];
}
