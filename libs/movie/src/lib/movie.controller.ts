import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, Role } from '@prisma/client';
import { IMovieGateway } from './gateway/gateway';
import { Public, Roles } from '@cineman/authorization';
import { RateMovieDto } from './movie.module';

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
  findAll(@Query('includeRating') rating?: boolean): Promise<Movie[]> {
    return this.movieService.findAll({ include: { rating } });
  }

  @Public()
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('includeRating') rating?: boolean
  ): Promise<Movie> {
    return this.movieService.findOne({ where: { id }, include: { rating } });
  }

  @Public()
  @Get('/name/:name')
  findOneByName(@Param('name') name: string): Promise<Movie | null> {
    return this.movieService.findOne({ where: { name } }).catch(() => null);
  }

  @Roles(Role.USER)
  @Post(':id/rate')
  rateOne(
    @Param('id') id: string,
    @Body() rateMovieDto: RateMovieDto,
    @Req() req: any
  ) {
    const userId = req.user.userId;

    return this.movieService.rate(
      { id },
      { userId },
      rateMovieDto.stars,
      rateMovieDto.review
    );
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
