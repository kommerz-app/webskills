import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { FileDropDirective } from './file-drop.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  declarations: [FileUploadComponent, FileDropDirective],
  exports: [FileUploadComponent, FileDropDirective],
})
export class FileUploadModule {}
