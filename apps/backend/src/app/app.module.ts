import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TheaterModule } from '../theater/theater.module';
import { MovieModule } from '../movie/movie.module';
import { CustomerModule } from '../customer/customer.module';
import { RatingModule } from '../rating/rating.module';
import { ShowModule } from '../show/show.module';
import { TicketModule } from '../ticket/ticket.module';
import { SeatModule } from '../seat/seat.module';
import { FeatureModule } from '../feature/feature.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, TheaterModule, MovieModule, CustomerModule, RatingModule, ShowModule, TicketModule, SeatModule, FeatureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
