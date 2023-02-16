import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateMovieDto } from '@cineman/movie';
import { catchError, map, Observable, of, Subject, tap } from 'rxjs';
import { MovieService } from '@cineman/services';

export interface MovieCreateDialogData {
  name: string;
  description: string;
  age: number;
  duration: Date;
  dto$: Subject<CreateMovieDto>;
  res$: Subject<boolean>;
}

export function uniqueMovieNameValidator(
  movieService: MovieService,
  whitelist: string[]
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (whitelist.includes(control.value)) return of(null);

    return movieService.findOneByName(control.value).pipe(
      map((res) => (res ? { movieNameExists: true } : null)),
      catchError(() => of(null))
    );
  };
}

@Component({
  selector: 'cineman-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss'],
})
export class MovieCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [
        uniqueMovieNameValidator(this.movieService, [this.data.name]),
      ],
    }),
    description: new FormControl(''),
    age: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(18),
    ]),
    hours: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(10),
    ]),
    minutes: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(59),
    ]),
    seconds: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(59),
    ]),
  });

  constructor(
    private readonly movieService: MovieService,
    private dialogRef: MatDialogRef<MovieCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: MovieCreateDialogData
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    const { name, description, age, duration } = this.data;
    const [hours, minutes, seconds] = duration
      ? [duration.getHours(), duration.getMinutes(), duration.getSeconds()]
      : [0, 0, 0];
    this.form.setValue({
      name: name ?? '',
      description: description ?? '',
      age: age ?? 0,
      hours,
      minutes,
      seconds,
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      const { name, description, age } = this.form.value;
      const duration = new Date(
        0,
        0,
        0,
        this.form.value.hours,
        this.form.value.minutes,
        this.form.value.seconds
      );

      this.data.dto$.next({ name, description, age, duration });

      this.data.res$.subscribe({ next: () => this.dialogRef.close() });
    }
  }
}
