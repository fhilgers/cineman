import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie, Show, Theater } from '@prisma/client';
import * as dayjs from 'dayjs';
import { MovieService, TheaterService } from '@cineman/services';

@Component({
  selector: 'cineman-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.scss'],
})
export class ShowCardComponent implements OnInit {
  @Input() show: Show;
  @Input() isAdmin: boolean;

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  theater?: Theater;
  movie?: Movie;

  startStr: string;
  endStr: string;

  constructor(
    private readonly movieService: MovieService,
    private readonly theaterService: TheaterService
  ) {}

  ngOnInit(): void {
    this.movieService
      .findOne(this.show.movieId)
      .subscribe((movie) => (this.movie = movie));
    this.theaterService
      .findOne(this.show.theaterId)
      .subscribe((theater) => (this.theater = theater));

    this.startStr = dayjs(this.show.start).format('D MMM, HH:mm A');
    this.endStr = dayjs(this.show.end).format('D MMM, HH:mm A');
  }

  editEvent(): void {
    this.edit.emit();
  }

  deleteEvent(): void {
    this.delete.emit();
  }
}
