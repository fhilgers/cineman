import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Movie } from '@prisma/client';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  moviePath = 'http://localhost:3333/movies';

  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<Movie[]>(this.moviePath);
  }
}
