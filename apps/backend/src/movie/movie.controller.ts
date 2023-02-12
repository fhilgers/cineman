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
import { Movie, Role } from '@prisma/client';
import { IMovieGateway } from './gateway/gateway';
import { Public } from '../public.decorator';
import { Roles } from '../roles.decorator';

@Controller('movies')
export class MovieController implements IMovieGateway {
  constructor(private readonly movieService: MovieService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieService.create(createMovieDto);
  }

  @Public()
  @Get()
  findAll(): Promise<Movie[]> {
    return this.movieService.findAll({});
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Movie> {
    return this.movieService.findOne({ id });
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto
  ): Promise<Movie> {
    return this.movieService.update({ where: { id }, data: updateMovieDto });
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Movie> {
    return this.movieService.remove({ id });
  }
}
