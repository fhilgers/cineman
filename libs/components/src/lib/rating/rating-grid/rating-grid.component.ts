import { Component, OnInit } from '@angular/core';
import { Prisma } from '@prisma/client';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { LoginService, RatingService } from '@cineman/services';

@Component({
  selector: 'cineman-rating-grid',
  templateUrl: './rating-grid.component.html',
  styleUrls: ['./rating-grid.component.scss'],
})
export class RatingGridComponent implements OnInit {
  private reloadSubject = new Subject<void>();

  ratings$: Observable<
    Prisma.RatingGetPayload<{ include: { customer: true; movie: true } }>[]
  >;

  isAdmin$: Observable<boolean>;

  constructor(
    private readonly loginService: LoginService,
    private readonly ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.ratings$ = this.reloadSubject.pipe(
      startWith(null),
      switchMap(() => this.ratingService.findAll({}))
    );
    this.isAdmin$ = this.loginService.isAdmin();
  }

  delete(ratingId: string): void {
    this.ratingService
      .remove(ratingId)
      .subscribe(() => this.reloadSubject.next());
  }
}
