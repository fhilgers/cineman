import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';

import { map, Observable } from 'rxjs';

interface Movie {
  name: string;
  description: string;
  age: number;
  duration: string;
}

@Component({
  selector: 'cineman-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend-new';

  movies: Movie[] = [];

  constructor(private readonly movieService: MovieService) {}

  showMovies() {
    this.movieService.findAll()
      .subscribe(movies => this.movies = movies.map(movie => {
        const date = new Date(movie.duration);
        const duration = date.toTimeString().split(" ")[0];
        const { name, description, age } = movie;

        return { name, description, age, duration};
      }));
  }

  ngOnInit(): void {
    this.showMovies()
}
}
