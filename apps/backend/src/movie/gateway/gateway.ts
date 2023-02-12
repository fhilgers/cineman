import { Movie } from "@prisma/client";
import { CreateMovieDto } from "../dto/create-movie.dto";
import { UpdateMovieDto } from "../dto/update-movie.dto";

export interface IMovieGateway {

  create(createMovieDto: CreateMovieDto): Promise<Movie>;
  findAll() : Promise<Movie[]>;
  findOne(id: string) : Promise<Movie>;
  update(id: string, updateMovieDto: UpdateMovieDto) : Promise<Movie>;
  remove(id: string) : Promise<Movie>;
}
