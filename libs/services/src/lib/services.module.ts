import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from './customer.service';
import { LoginService } from './login.service';
import { MovieService } from './movie.service';
import { RatingService } from './rating.service';
import { ShowService } from './show.service';
import { TheaterService } from './theater.service';
import { TicketService } from './ticket.service';

export {
  CustomerService,
  LoginService,
  MovieService,
  RatingService,
  ShowService,
  TheaterService,
  TicketService
};

@NgModule({
  imports: [CommonModule],
  providers: [
    CustomerService,
    LoginService,
    MovieService,
    RatingService,
    ShowService,
    TheaterService,
    TicketService
  ],
})
export class ServicesModule {}
