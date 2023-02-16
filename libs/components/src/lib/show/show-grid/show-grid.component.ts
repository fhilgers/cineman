import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role, Show } from '@prisma/client';
import { catchError, map, mergeMap, Observable, of, tap } from 'rxjs';

import {
  LoginService,
  ShowService,
  TheaterService,
  MovieService,
} from '@cineman/services';
import { ShowCreateComponent } from '../show-create/show-create.component';

@Component({
  selector: 'cineman-show-grid',
  templateUrl: './show-grid.component.html',
  styleUrls: ['./show-grid.component.scss'],
})
export class ShowGridComponent implements OnInit {
  shows$: Observable<Show[]>;
  isAdmin$: Observable<boolean>;

  constructor(
    private readonly showService: ShowService,
    private readonly movieService: MovieService,
    private readonly theaterService: TheaterService,

    private readonly loginService: LoginService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.shows$ = this.showService.findAll({});
    this.isAdmin$ = this.loginService.isAdmin();
  }

  openDialog(): void {
    const movies$ = this.movieService.findAll();
    const theaters$ = this.theaterService.findAll();

    const dialogRef = this.dialog.open(ShowCreateComponent, {
      data: { movies$, theaters$ },
    });

    dialogRef.componentInstance.dto
      .pipe(
        mergeMap((dto) => this.showService.create(dto)),
        catchError((err) => {
          this.snackBar.open(err.error.message[0]);
          throw err;
        }),
        tap(() => (this.shows$ = this.showService.findAll({}))),
        tap(() => dialogRef.close())
      )

      .subscribe(() => ({}));
  }

  delete(show: Show): void {
    this.showService
      .remove(show.id)
      .subscribe(() => (this.shows$ = this.showService.findAll({})));
  }

  edit(show: Show): void {
    const movies$ = this.movieService.findAll();
    const theaters$ = this.theaterService.findAll();

    const dialogRef = this.dialog.open(ShowCreateComponent, {
      data: { movies$, theaters$, show },
    });

    dialogRef.componentInstance.dto
      .pipe(
        mergeMap((dto) => this.showService.update(show.id, dto)),
        catchError((err) => {
          this.snackBar.open(err.error.message[0]);
          throw err;
        }),
        tap(() => (this.shows$ = this.showService.findAll({}))),
        tap(() => dialogRef.close())
      )

      .subscribe(() => ({}));
  }
}
