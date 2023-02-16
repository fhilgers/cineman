import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from './add-button/add-button.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { MatIconModule } from '@angular/material/icon';

export {
  AddButtonComponent,
  GridListComponent,
}

@NgModule({
  imports: [
    CommonModule,
    MatIconModule
  ],
  declarations: [
    AddButtonComponent,
    GridListComponent,
  ],
  exports: [
    AddButtonComponent,
    GridListComponent,
  ]
})
export class ComponentsModule {}
