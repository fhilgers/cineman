import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  Movie,
  Show,
  Theater,
  Ticket,
  Prisma,
  Role,
  Seat,
} from '@prisma/client';
import * as dayjs from 'dayjs';
import { first, Observable, tap } from 'rxjs';
import {
  CustomerService,
  LoginService,
  MovieService,
  ShowService,
  TheaterService,
  TicketService,
  TicketWithSeatAndOwnerAndShow,
} from '@cineman/services';

@Component({
  selector: 'cineman-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss'],
})
export class ShowDetailComponent implements OnInit {
  id: string;

  show?: Show;
  movie?: Movie;
  theater?: Theater;

  tickets$: Observable<TicketWithSeatAndOwnerAndShow[]>;

  seats?: Seat[];

  startStr: string;
  endStr: string;

  isUser = false;

  constructor(
    private readonly location: Location,
    private readonly loginService: LoginService,
    private readonly customerService: CustomerService,
    private readonly showService: ShowService,
    private readonly movieService: MovieService,
    private readonly theaterService: TheaterService,
    private readonly ticketService: TicketService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginService.isUser().subscribe((isUser) => (this.isUser = isUser));

    const state = this.location.getState() as {
      show: Show;
      movie: Movie;
      theater: Theater;
    };

    this.show = state.show;
    this.movie = state.movie;
    this.theater = state.theater;

    if (this.show) {
      this.id = this.show.id;

      this.startStr = dayjs(this.show.start).format('D MMM, HH:mm A');
      this.endStr = dayjs(this.show.end).format('D MMM, HH:mm A');

      if (!this.movie) {
        this.movieService
          .findOne(this.show.movieId)
          .subscribe((movie) => (this.movie = movie));
      }

      if (!this.theater) {
        this.theaterService
          .findOne(this.show.theaterId)
          .subscribe((theater) => (this.theater = theater));
      }

      this.tickets$ = this.ticketService
        .findAll({ showId: this.show.id, includeSeat: true })
        .pipe(
          tap((tickets) => {
            this.seats = tickets.map((ticket) => ticket.seat);
          })
        );
    } else {
      this.activatedRoute.params.subscribe((params: Params) => {
        this.id = params['id'] ?? '';

        this.showService.findOne(this.id).subscribe((show) => {
          this.show = show;

          this.startStr = dayjs(this.show.start).format('D MMM, HH:mm A');
          this.endStr = dayjs(this.show.end).format('D MMM, HH:mm A');

          if (!this.movie) {
            this.movieService
              .findOne(this.show.movieId)
              .subscribe((movie) => (this.movie = movie));
          }

          if (!this.theater) {
            this.theaterService
              .findOne(this.show.theaterId)
              .subscribe((theater) => (this.theater = theater));
          }

          this.tickets$ = this.ticketService
            .findAll({ showId: this.show.id, includeSeat: true })
            .pipe(
              tap((tickets) => {
                this.seats = tickets.map((ticket) => ticket.seat);
              })
            );
        });
      });
    }
  }

  buy(ticketId: string) {
    this.ticketService
      .buy(ticketId)
      .pipe(
        tap(
          () =>
            (this.tickets$ = this.ticketService.findAll({
              showId: this.show?.id,
              includeSeat: true,
              includeOwner: true,
              includeShow: true,
            }))
        )
      )
      .subscribe(console.log);
  }

  buyTicket(ticket: Ticket) {
    this.ticketService.buy(ticket.id).pipe(first()).subscribe(console.log);
  }
}
