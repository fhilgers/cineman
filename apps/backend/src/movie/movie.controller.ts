import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from '@prisma/client';
import { IMovieGateway } from './gateway/gateway';

@Controller('movies')
export class MovieController implements IMovieGateway {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  findAll() : Promise<Movie[]> {
    return this.movieService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) : Promise<Movie> {
    return this.movieService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) : Promise<Movie> {
    return this.movieService.update({where : { id }, data: updateMovieDto});
  }

  @Delete(':id')
  remove(@Param('id') id: string) : Promise<Movie> {
    return this.movieService.remove({ id });
  }
}
