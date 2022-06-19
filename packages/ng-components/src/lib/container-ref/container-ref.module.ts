import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerRefDirective } from './container-ref.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ContainerRefDirective],
  exports: [ContainerRefDirective],
})
export class ContainerRefModule {}
