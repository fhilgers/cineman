import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface QrcodeDialogData {
  title: string;
  qrdata: string;
  qrwidth: number;
  qrErrorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
}

@Component({
  selector: 'cineman-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrls: ['./qrcode-dialog.component.scss'],
})
export class QrcodeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<QrcodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QrcodeDialogData
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
