import { Movie } from '@prisma/client';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';

export interface IMovieGateway {
  create(createMovieDto: CreateMovieDto): Promise<Movie | undefined>;
  findAll(): Promise<Movie[] | undefined>;
  findOne(id: string): Promise<Movie | undefined>;
  update(
    id: string,
    updateMovieDto: UpdateMovieDto
  ): Promise<Movie | undefined>;
  remove(id: string): Promise<Movie | undefined>;
}
