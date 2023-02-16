import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from './add-button/add-button.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { MatIconModule } from '@angular/material/icon';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatCardModule } from '@angular/material/card';

import { HttpClientModule  } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatDialogModule } from '@angular/material/dialog';

import { MatMenuModule } from '@angular/material/menu';


import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import { QRCodeModule } from 'angularx-qrcode';
import { MovieCardComponent } from './movie/movie-card/movie-card.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import { MovieGridComponent } from './movie/movie-grid/movie-grid.component';
import { MovieCreateComponent } from './movie/movie-create/movie-create.component';
import { RatingDialogComponent } from './movie/rating-dialog/rating-dialog.component';
import { ServicesModule } from '@cineman/services';
import { Route, RouterModule } from '@angular/router';
import { RatingCardComponent } from './rating/rating-card/rating-card.component';
import { TheaterCardComponent } from './theater/theater-card/theater-card.component';
import { TheaterDetailComponent } from './theater/theater-detail/theater-detail.component';
import { TheaterCreateComponent } from './theater/theater-create/theater-create.component';
import { TheaterGridComponent } from './theater/theater-grid/theater-grid.component';
import { ShowCardComponent } from './show/show-card/show-card.component';
import { ShowGridComponent } from './show/show-grid/show-grid.component';
import { ShowCreateComponent } from './show/show-create/show-create.component';
import { ShowDetailComponent } from './show/show-detail/show-detail.component';
import { BuyTicketDialogComponent, SeatsComponent } from './seats/seats.component';

export {
  AddButtonComponent,
  GridListComponent,
  MovieCardComponent,
  MovieDetailComponent,
  MovieGridComponent,
  MovieCreateComponent,
  TheaterCardComponent,
  TheaterDetailComponent,
  TheaterGridComponent,
  TheaterCreateComponent,
  ShowCardComponent,
  ShowDetailComponent,
  ShowGridComponent,
  ShowCreateComponent,
  SeatsComponent,
  BuyTicketDialogComponent,
  RatingDialogComponent,
  RatingCardComponent
}

export const appRoutes: Route[] = [
  { path: '', component: MovieGridComponent },
  { path: 'movies', component: MovieGridComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: 'theaters', component: TheaterGridComponent },
  { path: 'theaters/:id', component: TheaterDetailComponent },
  { path: 'shows', component: ShowGridComponent },
  { path: 'shows/:id', component: ShowDetailComponent },
];


@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatDialogModule,
    QRCodeModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatDividerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    OverlayModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatToolbarModule,
    MatChipsModule,
    MatGridListModule,
    MatListModule,
    MatIconModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ServicesModule,
    RouterModule.forChild(appRoutes),
  ],
  declarations: [
    AddButtonComponent,
    GridListComponent,
    MovieCardComponent,
    MovieDetailComponent,
    MovieGridComponent,
    MovieCreateComponent,
    TheaterCardComponent,
    TheaterDetailComponent,
    TheaterGridComponent,
    TheaterCreateComponent,
    ShowCardComponent,
    ShowDetailComponent,
    ShowGridComponent,
    ShowCreateComponent,
    SeatsComponent,
    BuyTicketDialogComponent,
    RatingDialogComponent,
    RatingCardComponent,
  ],
  exports: [
    AddButtonComponent,
    GridListComponent,
    MovieCardComponent,
    MovieDetailComponent,
    MovieGridComponent,
    MovieCreateComponent,
    TheaterCardComponent,
    TheaterDetailComponent,
    TheaterGridComponent,
    TheaterCreateComponent,
    ShowCardComponent,
    ShowDetailComponent,
    ShowGridComponent,
    ShowCreateComponent,
    SeatsComponent,
    BuyTicketDialogComponent,
    RatingDialogComponent,
    RatingCardComponent,
    RouterModule,
  ]
})
export class ComponentsModule {}
