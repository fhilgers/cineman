import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MovieModule } from '../movie/movie.module';
import { CustomerModule } from '../customer/customer.module';
import { UniqueMovieRatingForCustomerRule } from './rating.validator';

@Module({
  imports: [PrismaModule, MovieModule, CustomerModule],
  controllers: [RatingController],
  providers: [RatingService, UniqueMovieRatingForCustomerRule],
})
export class RatingModule {}
