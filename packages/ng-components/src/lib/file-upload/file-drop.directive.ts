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

  @HostListener('dragover', ['$event']) onDragOver(evt: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.isDragOver = true;
    this.hasFile = false;
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.isDragOver = false;
  }

  @HostListener('drop', ['$event'])
  public ondrop(evt: {
    preventDefault: () => void;
    stopPropagation: () => void;
    dataTransfer: { files: FileList };
  }): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.hasFile = true;
    this.isDragOver = false;

    const files = evt.dataTransfer.files;
    const filesToEmit: File[] = [];

    for (let i = 0; i < files.length; i++) {
      filesToEmit.push(files[i]);
    }

    if (files.length > 0) {
      this.fileDropped.emit(filesToEmit);
    }
  }
}
