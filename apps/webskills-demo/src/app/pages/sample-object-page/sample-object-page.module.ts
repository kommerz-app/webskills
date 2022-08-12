import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleObjectPageComponent } from './sample-object-page.component';
import { NumberModule, ObjectPageModule } from '@webskills/ng-components';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [SampleObjectPageComponent],
  imports: [
    CommonModule,
    ObjectPageModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    NumberModule,
    MatMenuModule,
  ],
  exports: [SampleObjectPageComponent],
})
export class SampleObjectPageModule {}
