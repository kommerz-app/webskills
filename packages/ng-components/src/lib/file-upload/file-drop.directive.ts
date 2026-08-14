import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[wskFileDrop]',
})
export class FileDropDirective {
  @Output() fileDropped = new EventEmitter<File[]>();

  @HostBinding('class.fileDropArea') fileDropArea = true;
  @HostBinding('class.isDragOver') isDragOver?: boolean;
  @HostBinding('class.hasFile') hasFile?: boolean;

  @HostListener('dragover', ['$event']) onDragOver(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.isDragOver = true;
    this.hasFile = false;
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.isDragOver = false;
  }

  @HostListener('drop', ['$event'])
  public ondrop(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.hasFile = true;
    this.isDragOver = false;

    const filesToEmit = Array.from(evt.dataTransfer?.files ?? []);

    if (filesToEmit.length > 0) {
      this.fileDropped.emit(filesToEmit);
    }
  }
}
