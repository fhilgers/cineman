import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Prisma } from '@prisma/client';
import {
  MovieService,
  MovieWithRating,
  RatingService,
  LoginService,
} from '@cineman/services';

import { concat, map, mergeMap, Observable, of, shareReplay, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { RatingDialogComponent } from '../rating-dialog/rating-dialog.component';

@Component({
  selector: 'cineman-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  isUser$: Observable<boolean>;

  movie$: Observable<MovieWithRating>;
  ratings$: Observable<
    Prisma.RatingGetPayload<{ include: { customer: true; movie: true } }>[]
  >;

  constructor(
    private readonly loginService: LoginService,
    private readonly location: Location,
    private readonly movieService: MovieService,
    private readonly ratingService: RatingService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const movieFromParam$ = this.activatedRoute.params.pipe(
      map((params: Params) => params['id']),
      mergeMap((id) => this.movieService.findOne(id))
    );

    this.movie$ = concat(
      of(this.location.getState() as MovieWithRating),
      movieFromParam$
    ).pipe(shareReplay(1));

    this.ratings$ = this.movie$.pipe(
      mergeMap((movie) => this.ratingService.findAll({ movieId: movie.id }))
    );
    this.isUser$ = this.loginService.isUser();
  }

  openDialog(movieId: string): void {
    const dialogRef = this.dialog.open(RatingDialogComponent, {
      data: {},
    });

    dialogRef
      .afterClosed()
      .pipe(
        tap(console.log),
        mergeMap((starsAndReview) =>
          this.movieService.rate(movieId, starsAndReview)
        )
      )
      .subscribe(
        () =>
          (this.ratings$ = this.movie$.pipe(
            mergeMap((movie) =>
              this.ratingService.findAll({ movieId: movie.id })
            )
          ))
      );
  }
}
