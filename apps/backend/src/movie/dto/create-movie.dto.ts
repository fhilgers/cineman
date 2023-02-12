import { IsDate, IsDateString, IsNotEmpty, IsOptional, Max, Min } from "class-validator";
import { IsUniqueMovieName } from "../movie.validator";

export class CreateMovieDto {

  @IsNotEmpty()
  @IsUniqueMovieName()
  name: string;

  @IsOptional()
  description: string;

  @IsDateString()
  duration: Date;

  @IsOptional()
  @Max(18)
  @Min(0)
  age: number;
}
