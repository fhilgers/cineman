import { IsDateString, IsUUID } from "class-validator";
import { IsMovie } from "../../movie/movie.validator";
import { IsTheater } from "../../theater/theater.validator";
import { IsNotOverlappingForTheater } from "../show.validator";

export class CreateShowDto {

  @IsUUID()
  @IsTheater()
  theaterId: string;

  @IsUUID()
  @IsMovie()
  movieId: string;

  @IsDateString()
  @IsNotOverlappingForTheater('end', 'theaterId')
  start: Date;

  @IsDateString()
  end: Date;
}
