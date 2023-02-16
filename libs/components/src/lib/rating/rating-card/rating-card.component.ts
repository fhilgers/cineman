import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Prisma, Rating } from '@prisma/client';

@Component({
  selector: 'cineman-rating-card',
  templateUrl: './rating-card.component.html',
  styleUrls: ['./rating-card.component.scss'],
})
export class RatingCardComponent {
  @Input() rating: Prisma.RatingGetPayload<{
    include: { customer: true; movie: true };
  }>;

  @Input() showDelete: boolean;

  @Output() delete = new EventEmitter();

  deleteEvent(): void {
    this.delete.emit();
  }
}
