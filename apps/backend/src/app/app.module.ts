import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TheaterModule } from '@cineman/theater';
import { MovieModule } from '@cineman/movie';
import { CustomerModule } from '@cineman/customer';
import { RatingModule } from '@cineman/rating';
import { ShowModule } from '@cineman/show';
import { TicketModule } from '@cineman/ticket';
import { SeatModule } from '@cineman/seat';
import { FeatureModule } from '@cineman/feature';
import { AuthModule } from '@cineman/auth';
import { JwtAuthGuard } from '@cineman/auth';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@cineman/authorization';
import { UserModule } from '@cineman/user';

@Module({
  imports: [
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
