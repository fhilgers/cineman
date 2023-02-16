import { Component, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateSeatWithoutTheaterDto } from '@cineman/database';
import { Movie, Seat, SeatType, Show, Theater } from '@prisma/client';
import { first, Observable, Observer, Subject, tap } from 'rxjs';
import { CreateSeatDto } from '@cineman/seat';
import { CreateShowDto } from '@cineman/show';
import * as dayjs from 'dayjs';

export interface ShowCreateDialogData {
  show?: Show;
  movies$: Observable<Movie[]>;
  theaters$: Observable<Theater[]>;
}

@Component({
  selector: 'cineman-show-create',
  templateUrl: './show-create.component.html',
  styleUrls: ['./show-create.component.scss'],
})
export class ShowCreateComponent {
  dto = new EventEmitter<CreateShowDto>();

  form = new FormGroup({
    theaterId: new FormControl<string>(''),
    movieId: new FormControl<string>(''),
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    startTime: new FormControl<string>(''),
    endTime: new FormControl<string>(''),
  });

  constructor(
    private dialogRef: MatDialogRef<ShowCreateComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: ShowCreateDialogData
  ) {
    if (data.show) {
      const { theaterId, movieId } = data.show;

      const startDate = new Date(data.show.start);
      const endDate = new Date(data.show.end);

      const startTime = dayjs(startDate).format('HH:mm');
      const endTime = dayjs(endDate).format('HH:mm');

      console.log(startTime);
      console.log(endTime);

      startDate.setHours(0);
      startDate.setMinutes(0);
      endDate.setHours(0);
      endDate.setMinutes(0);

      this.form.setValue({
        theaterId,
        movieId,
        startDate,
        endDate,
        startTime,
        endTime,
      });
    }
  }

  submitForm(): void {
    if (this.form.valid) {
      const { theaterId, movieId, startDate, endDate, startTime, endTime } =
        this.form.value;

      if (
        theaterId &&
        movieId &&
        startDate &&
        endDate &&
        startTime &&
        endTime
      ) {
        const start = startDate;
        const end = endDate;

        const [startHours, startMinutes] = startTime.split(':');
        const [endHours, endMinutes] = endTime.split(':');

        start.setHours(Number(startHours));
        start.setMinutes(Number(startMinutes));

        end.setHours(Number(endHours));
        end.setMinutes(Number(endMinutes));

        this.dto.emit({ theaterId, movieId, start, end });
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
