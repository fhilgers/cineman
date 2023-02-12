import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MovieExistsRule, UniqueMovieNameRule } from './movie.validator';

@Module({
  imports: [PrismaModule],
  controllers: [MovieController],
  providers: [MovieService, MovieExistsRule, UniqueMovieNameRule],
  exports: [MovieExistsRule]
})
export class MovieModule {}
