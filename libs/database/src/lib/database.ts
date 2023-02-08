import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { Prisma } from '@prisma/client';

enum SeatType {
    NORMAL = "NORMAL", DELUXE = "DELUXE", REMOVABLE = "REMOVABLE"
}

export class CreateSeatWithoutTheaterDto {

  @IsNumber()
  @Min(1)
  number: number;

  @IsNumber()
  @Min(1)
  row: number;


  @IsOptional()
  @IsEnum(SeatType)
  type: SeatType = SeatType.NORMAL;
}

export class CreateTheaterDto {

  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  features: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSeatWithoutTheaterDto)
  seats: CreateSeatWithoutTheaterDto[];

  public toPrisma() : Prisma.TheaterCreateInput {
    return { 
      name: this.name, 
      seats: { 
        create: this.seats 
      },
      features: {
        connectOrCreate: this.features.map(name => {
          return { where: { name }, create: { name } };
        }),
      },
    };
  }
}
