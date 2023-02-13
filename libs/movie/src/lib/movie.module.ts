import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { PrismaModule } from '@cineman/prisma';
import { MovieExistsRule, UniqueMovieNameRule } from './movie.validator';

export { CreateMovieDto } from './dto/create-movie.dto';
export { UpdateMovieDto } from './dto/update-movie.dto';
export { IMovieGateway } from './gateway/gateway';

export { IsMovie, IsUniqueMovieName } from './movie.validator';
export { MovieExistsRule };

@Module({
  imports: [PrismaModule],
  controllers: [MovieController],
  providers: [MovieService, MovieExistsRule, UniqueMovieNameRule],
  exports: [MovieExistsRule],
})
export class MovieModule {}
