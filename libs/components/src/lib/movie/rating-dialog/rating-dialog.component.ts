import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface RatingDialogData {
  movieId: string;
}

@Component({
  selector: 'cineman-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.scss'],
})
export class RatingDialogComponent {
  form = new FormGroup({
    stars: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(5),
    ]),
    review: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<RatingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RatingDialogData
  ) {}

  submitForm(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
