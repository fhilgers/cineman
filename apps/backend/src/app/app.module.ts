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
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../roles.guard';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PrismaModule,
    TheaterModule,
    MovieModule,
    CustomerModule,
    RatingModule,
    ShowModule,
    TicketModule,
    SeatModule,
    FeatureModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
