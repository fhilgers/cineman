import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Theater } from '@prisma/client';

@Component({
  selector: 'cineman-theater-card',
  templateUrl: './theater-card.component.html',
  styleUrls: ['./theater-card.component.scss'],
})
export class TheaterCardComponent {
  @Input() theater: Theater;
  @Input() isAdmin: boolean;
  @Input() showActions: boolean;

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  editEvent(): void {
    this.edit.emit();
  }

  deleteEvent(): void {
    this.delete.emit();
  }
}
