import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from './customer.service';
import { LoginService } from './login.service';
import { MovieService } from './movie.service';
import { RatingService } from './rating.service';
import { ShowService } from './show.service';
import { TheaterService } from './theater.service';
import { TicketService } from './ticket.service';
import { SeatService } from './seat.service';
import { ApiInterceptor } from './api.interceptor';
import { AuthInterceptor, AuthGuard } from './auth.interceptor';

export {
  CustomerService,
  LoginService,
  MovieService,
  RatingService,
  SeatService,
  ShowService,
  TheaterService,
  TicketService,
  ApiInterceptor,
  AuthInterceptor,
  AuthGuard
};

export { MovieWithRating } from './movie.service';
export { TicketWithSeatAndOwnerAndShow } from './ticket.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    CustomerService,
    LoginService,
    MovieService,
    RatingService,
    SeatService,
    ShowService,
    TheaterService,
    TicketService,
    ApiInterceptor,
    AuthInterceptor,
    AuthGuard,
  ],
})
export class ServicesModule {}
