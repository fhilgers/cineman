import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class RateMovieDto {
  @ApiProperty({
    description: 'The Customer Rating of a movie',
    minimum: 0,
    maximum: 5,
  })
  @IsNumber()
  @Min(0)
  @Max(5)
  stars: number;

  @ApiProperty({
    description: 'The Customer Review of a movie',
  })
  @IsNotEmpty()
  review: string;
}
