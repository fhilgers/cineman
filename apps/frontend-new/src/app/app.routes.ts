import { Route } from '@angular/router';
import { AuthGuard } from '@cineman/services';
import {
  MovieCreateComponent,
  MovieDetailComponent,
  MovieGridComponent,
} from '@cineman/components';
import {
  ShowDetailComponent,
  ShowGridComponent,
  RatingGridComponent,
  TicketGridComponent,
  LoginComponent,
  PagenotfoundComponent,
} from '@cineman/components';
import {
  TheaterGridComponent,
  TheaterDetailComponent,
} from '@cineman/components';

export const appRoutes: Route[] = [
  { path: '', component: MovieGridComponent },
  { path: 'movies', component: MovieGridComponent },
  { path: 'movies/add', component: MovieCreateComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: 'theaters', component: TheaterGridComponent },
  { path: 'theaters/:id', component: TheaterDetailComponent },
  { path: 'shows', component: ShowGridComponent },
  { path: 'shows/:id', component: ShowDetailComponent },
  { path: 'ratings', component: RatingGridComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'account/tickets',
    component: TicketGridComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];
