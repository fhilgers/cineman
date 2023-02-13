import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { PrismaModule } from '@cineman/prisma';
import { UniqueMovieRatingForCustomerRule } from './rating.validator';

export { CreateRatingDto } from './dto/create-rating.dto';
export { UpdateRatingDto } from './dto/update-rating.dto';
export { IRatingGateway } from './gateway/gateway';

@Module({
  imports: [PrismaModule],
  controllers: [RatingController],
  providers: [RatingService, UniqueMovieRatingForCustomerRule],
})
export class RatingModule {}
