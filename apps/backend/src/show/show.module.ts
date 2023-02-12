import { Module } from '@nestjs/common';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TheaterModule } from '../theater/theater.module';
import { MovieModule } from '../movie/movie.module';
import { NotOverlappingForTheaterRule, ShowExistsRule } from './show.validator';

@Module({
  imports: [PrismaModule, TheaterModule, MovieModule],
  controllers: [ShowController],
  providers: [ShowService, NotOverlappingForTheaterRule, ShowExistsRule],
  exports: [ShowExistsRule]
})
export class ShowModule {}
