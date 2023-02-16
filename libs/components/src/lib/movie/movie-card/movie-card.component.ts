import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie, Rating } from '@prisma/client';
import * as dayjs from 'dayjs';
import { MovieWithRating } from '../../movie.service';

@Component({
  selector: 'cineman-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  @Input() movie: MovieWithRating;

  @Input() isAdmin: boolean;
  @Input() isUser: boolean;

  @Input() showEdit: boolean;
  @Input() showDelete: boolean;
  @Input() showMore: boolean;
  @Input() showRate: boolean;

  @Output() rate = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  rateEvent(): void {
    this.rate.emit();
  }

  editEvent(): void {
    this.edit.emit();
  }

  deleteEvent(): void {
    this.delete.emit();
  }

  formatDuration(movie: Movie): string {
    return dayjs(movie.duration).format('HH:mm:ss');
  }

  getRating(movie: MovieWithRating): string {
    if (movie.rating.length == 0) return 'No ratings yet';
    return String(
      movie.rating.reduce((sum, rating: Rating) => (sum += rating.stars), 0) /
        movie.rating.length
    );
  }
}
