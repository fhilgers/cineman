import { Component, OnInit } from '@angular/core';
import { SeatType, Theater } from '@prisma/client';
import {
  filter,
  first,
  map,
  mergeMap,
  Observable,
  Observer,
  of,
  pipe,
  ReplaySubject,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { LoginService, TheaterService, SeatService } from '@cineman/services';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { TheaterCreateComponent } from '../theater-create/theater-create.component';
import { CreateTheaterDto } from '@cineman/theater';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'cineman-theater-grid',
  templateUrl: './theater-grid.component.html',
  styleUrls: ['./theater-grid.component.scss'],
})
export class TheaterGridComponent implements OnInit {
  private reloadSubject = new Subject<void>();

  theaters$: Observable<Theater[]>;

  isAdmin$: Observable<boolean>;

  constructor(
    private readonly loginService: LoginService,
    private readonly theaterService: TheaterService,
    private readonly seatService: SeatService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.theaters$ = this.reloadSubject.pipe(
      startWith(null),
      switchMap(() => this.theaterService.findAll())
    );
    this.isAdmin$ = this.loginService.isAdmin();
  }

  openDialog(): void {
    const dto$ = new Subject<CreateTheaterDto>();
    const res$ = new Subject<boolean>();

    const dialogRef = this.dialog.open(TheaterCreateComponent, {
      data: { name: '', rows: [], dto$, res$ },
    });

    dto$
      .pipe(
        mergeMap((dto) => this.theaterService.create(dto)),
        tap({
          next: () =>
            this.snackBar.open('create success', 'close', { duration: 2000 }),
          error: () =>
            this.snackBar.open('create failure', 'close', { duration: 2000 }),
        })
      )
      .subscribe({
        next: () => res$.next(true),
        error: (err) => res$.error(err),
      });

    dialogRef.afterClosed().subscribe(() => {
      this.theaters$ = this.theaterService.findAll();
    });
  }

  delete(theater: Theater): void {
    this.theaterService
      .remove(theater.id)
      .subscribe(() => this.reloadSubject.next());
  }

  edit(theater: Theater): void {
    this.seatService.findAll(theater.id).subscribe((seats) => {
      const groupedSeats = seats.reduce((group, seat) => {
        (group[seat.row] = group[seat.row] || []).push(seat);
        return group;
      }, Object.create(null));

      console.log(groupedSeats);

      const rows: SeatType[][] = [];
      Object.keys(groupedSeats)
        .sort()
        .forEach((key) => {
          rows.push(groupedSeats[key].map((seat: any) => seat.type));
        });

      const dto$ = new Subject<CreateTheaterDto>();
      const res$ = new Subject<boolean>();

      const dialogRef = this.dialog.open(TheaterCreateComponent, {
        data: { name: theater.name, rows, dto$, res$ },
      });

      dto$
        .pipe(
          map((dto) => {
            if (dto.name == theater.name) return { seats: dto.seats };
            else return dto;
          }),
          mergeMap((dto) => this.theaterService.update(theater.id, dto)),
          tap({
            next: () =>
              this.snackBar.open('update success', 'close', { duration: 2000 }),
            error: () =>
              this.snackBar.open('update failure', 'close', { duration: 2000 }),
          })
        )
        .subscribe({
          next: () => res$.next(true),
          error: (err) => res$.error(err),
        });

      dialogRef.afterClosed().subscribe(() => {
        this.theaters$ = this.theaterService.findAll();
      });
    });
  }
}
