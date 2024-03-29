import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectPageComponent } from './object-page.component';
import { DynamicPageHeaderComponent } from './dynamic-page-header/dynamic-page-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [ObjectPageComponent, DynamicPageHeaderComponent],
  exports: [ObjectPageComponent],
})
export class ObjectPageModule {}
