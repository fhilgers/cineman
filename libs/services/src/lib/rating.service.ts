import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Prisma, Rating } from '@prisma/client';
import { CreateRatingDto, UpdateRatingDto } from '@cineman/rating';

@Injectable()
export class RatingService {
  ratingPath = 'ratings';

  constructor(private http: HttpClient) {}

  create(createRatingDto: CreateRatingDto) {
    return this.http.post<Rating>(this.ratingPath, createRatingDto);
  }

  findOne(id: string) {
    return this.http.get<Rating>(`${this.ratingPath}/${id}`);
  }

  update(id: string, updateRatingDto: UpdateRatingDto) {
    return this.http.patch<Rating>(`${this.ratingPath}/${id}`, updateRatingDto);
  }

  remove(id: string) {
    return this.http.delete<Rating>(`${this.ratingPath}/${id}`);
  }

  findAll(query: { movieId?: string }) {
    let params = new HttpParams()
      .set('includeCustomer', true)
      .set('includeMovie', true);

    if (query.movieId) params = params.set('movieId', query.movieId);

    return this.http.get<
      Prisma.RatingGetPayload<{ include: { customer: true; movie: true } }>[]
    >(this.ratingPath, { params });
  }
}
