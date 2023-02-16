import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateMovieDto } from '@cineman/movie';
import { Movie } from '@prisma/client';
import { map, mergeMap, Observable, Subject, tap } from 'rxjs';
import { LoginService, MovieService, MovieWithRating } from '@cineman/services';
import { MovieCreateComponent } from '../movie-create/movie-create.component';

@Component({
  selector: 'cineman-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.scss'],
})
export class MovieGridComponent implements OnInit {
  
  movies$: Observable<MovieWithRating[]>;
  isAdmin$: Observable<boolean>;

  constructor(
    private readonly movieService: MovieService,
    private readonly loginService: LoginService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.movies$ = this.movieService.findAll();
    this.isAdmin$ = this.loginService.isAdmin();
  }

  openDialog(): void {
    const dto$ = new Subject<CreateMovieDto>();
    const res$ = new Subject<boolean>();

    const dialogRef = this.dialog.open(MovieCreateComponent, {
      data: { dto$, res$ },
    });

    dto$
      .pipe(
        mergeMap((dto) => this.movieService.create(dto)),
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
      this.movies$ = this.movieService.findAll();
    });
  }

  delete(movie: Movie): void {
    this.movieService
      .remove(movie.id)
      .subscribe({ next: () => (this.movies$ = this.movieService.findAll()) });
  }

  edit(movie: Movie): void {
    const dto$ = new Subject<CreateMovieDto>();
    const res$ = new Subject<boolean>();

    const { name, description, age } = movie;
    const duration = new Date(movie.duration);

    const dialogRef = this.dialog.open(MovieCreateComponent, {
      data: { name, description, age, duration, dto$, res$ },
    });

    dto$
      .pipe(
        map((dto) => {
          const { name, description, age, duration } = dto;
          console.log(duration);
          if (name == movie.name) return { description, age, duration };
          return dto;
        }),
        mergeMap((dto) => this.movieService.update(movie.id, dto)),
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
      this.movies$ = this.movieService.findAll();
    });
  }
}
