import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AlertComponent],
})
export class SharedModule {}
