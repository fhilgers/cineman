import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateSeatWithoutTheaterDto } from '@cineman/database';
import { Seat, SeatType } from '@prisma/client';
import { first, Observable, Observer, Subject, tap } from 'rxjs';
import { TheaterService } from '@cineman/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateTheaterDto } from '@cineman/theater';

export interface TheaterCreateDialogData {
  rows: SeatType[][];
  name: string;
  dto$: Subject<CreateTheaterDto>;
  res$: Subject<boolean>;
}

@Component({
  selector: 'cineman-theater-create',
  templateUrl: './theater-create.component.html',
  styleUrls: ['./theater-create.component.scss'],
})
export class TheaterCreateComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  seatMatrix: SeatType[][];

  constructor(
    private dialogRef: MatDialogRef<TheaterCreateComponent>,
    private readonly snackBar: MatSnackBar,
    private readonly theaterService: TheaterService,
    @Inject(MAT_DIALOG_DATA) private data: TheaterCreateDialogData
  ) {
    this.form.setValue({ name: data.name });

    this.seatMatrix = data.rows || [];
  }

  submitForm(): void {
    if (this.form.valid) {
      let seatNumber = 1;

      const seats = this.seatMatrix.flatMap((row: SeatType[], rowI) => {
        return row.map((seatType: SeatType) => {
          return {
            number: seatNumber++,
            row: rowI + 1,
            type: seatType as SeatType,
          };
        });
      });

      this.data.dto$.next({ name: this.form.value.name ?? '', seats: seats });

      this.data.res$.subscribe({ next: () => this.dialogRef.close() });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addRow(): void {
    this.seatMatrix.push(['NORMAL', 'NORMAL', 'NORMAL']);
  }

  removeRow(): void {
    this.seatMatrix.pop();
  }

  addCol(rowI: number) {
    this.seatMatrix[rowI].push('NORMAL');
  }

  removeCol(rowI: number) {
    this.seatMatrix[rowI].pop();
  }

  changeType(rowI: number, colI: number, type: SeatType): void {
    this.seatMatrix[rowI][colI] = type;
  }
}
