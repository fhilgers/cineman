import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  Max,
  MaxDate,
  Min,
  MinDate,
} from 'class-validator';
import { IsUniqueMovieName } from '../movie.validator';

export class CreateMovieDto {
  @ApiProperty({
    description: 'The name of the Movie',
    uniqueItems: true,
  })
  @IsNotEmpty()
  @IsUniqueMovieName()
  name: string;

  @ApiProperty({
    description: 'The description of the Movie',
    required: false,
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'The duration of the Movie',
  })
  @IsDateString()
  duration: Date;

  @ApiProperty({
    description: 'The age restriction of the Movie',
    minimum: 0,
    maximum: 18,
  })
  @IsOptional()
  @Max(18)
  @Min(0)
  age: number;
}
