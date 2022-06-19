import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VegaComponent } from './vega.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VegaComponent],
  exports: [VegaComponent],
})
export class VegaModule {}
