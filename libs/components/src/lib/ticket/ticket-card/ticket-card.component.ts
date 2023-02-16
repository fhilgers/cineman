import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie, Theater, Ticket } from '@prisma/client';
import * as dayjs from 'dayjs';
import { map, Observable, tap } from 'rxjs';
import { MovieService, TheaterService, TicketService, TicketWithSeatAndOwnerAndShow } from '@cineman/services';

@Component({
  selector: 'cineman-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss'],
})
export class TicketCardComponent implements OnInit {
  @Input() ticket: TicketWithSeatAndOwnerAndShow;

  @Output() returnEvent = new EventEmitter<string>();
  @Output() qrcodeEvent = new EventEmitter();

  theater: Observable<Theater>;
  movie: Observable<Movie>;

  movieName: Observable<string>;
  theaterName: Observable<string>;

  seatNumber: number;
  seatRow: number;
  ticketPrice: number;

  canReturn = false;

  constructor(
    private readonly ticketService: TicketService,
    private readonly theaterService: TheaterService,
    private readonly movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.theater = this.theaterService
      .findOne(this.ticket.show.theaterId)
      .pipe(tap(console.log));
    this.movie = this.movieService
      .findOne(this.ticket.show.movieId)
      .pipe(tap(console.log));

    this.movieName = this.movie.pipe(map((movie) => movie.name));
    this.theaterName = this.theater.pipe(map((theater) => theater.name));

    this.seatNumber = this.ticket.seat.number;
    this.seatRow = this.ticket.seat.row;
    this.ticketPrice = this.ticket.price;

    const now = dayjs();
    const showStart = dayjs(this.ticket.show.start);

    this.canReturn = showStart.diff(now, 'hours') >= 1;
  }

  qrcode(): void {
    this.qrcodeEvent.emit();
  }

  return(): void {
    this.returnEvent.emit(this.ticket.id);
  }
}
