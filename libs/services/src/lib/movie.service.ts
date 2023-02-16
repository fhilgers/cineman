import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Movie, Prisma, Rating } from '@prisma/client';
import { CreateMovieDto, RateMovieDto, UpdateMovieDto } from '@cineman/movie';

export type MovieWithRating = Prisma.MovieGetPayload<{
  include: { rating: true };
}>;

@Injectable()
export class MovieService {
  moviePath = 'movies';

  constructor(private http: HttpClient) {}

  create(createMovieDto: CreateMovieDto) {
    return this.http.post<Movie>(this.moviePath, createMovieDto);
  }

  findOne(id: string) {
    const params = new HttpParams().set('includeRating', true);
    return this.http.get<MovieWithRating>(`${this.moviePath}/${id}`, {
      params,
    });
  }

  findOneByName(name: string) {
    return this.http.get<Movie>(`${this.moviePath}/name/${name}`);
  }

  update(id: string, updateMovieDto: UpdateMovieDto) {
    return this.http.patch<Movie>(`${this.moviePath}/${id}`, updateMovieDto);
  }

  remove(id: string) {
    return this.http.delete<Movie>(`${this.moviePath}/${id}`);
  }

  findAll() {
    const params = new HttpParams().set('includeRating', true);
    return this.http.get<MovieWithRating[]>(this.moviePath, { params });
  }

  rate(id: string, rateMovieDto: RateMovieDto) {
    return this.http.post<Rating>(`${this.moviePath}/${id}/rate`, rateMovieDto);
  }

  getAvgRating(id: string) {
    return this.http.get<{ stars: number }>(`${this.moviePath}/${id}/rating`);
  }
}
