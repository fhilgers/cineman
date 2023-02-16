import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Show, Theater } from '@prisma/client';
import { map, mergeMap, Observable, of, shareReplay, tap } from 'rxjs';
import { ShowService, TheaterService } from '@cineman/services';

@Component({
  selector: 'cineman-theater-detail',
  templateUrl: './theater-detail.component.html',
  styleUrls: ['./theater-detail.component.scss'],
})
export class TheaterDetailComponent implements OnInit {
  theater$: Observable<Theater>;
  shows$: Observable<Show[]>;

  constructor(
    private readonly location: Location,
    private readonly activatedRoute: ActivatedRoute,
    private readonly theaterService: TheaterService,
    private readonly showService: ShowService
  ) {}

  ngOnInit(): void {
    const theater = this.location.getState() as Theater;

    this.theater$ = this.activatedRoute.params.pipe(
      map((params: Params) => params['id']),
      mergeMap((id) => {
        if (id == theater.id) {
          return of(theater);
        } else {
          return this.theaterService.findOne(id);
        }
      }),
      shareReplay(1)
    );

    this.shows$ = this.theater$.pipe(
      mergeMap((theater) => {
        return this.showService.findAll({ theaterId: theater.id });
      })
    );
  }
}
