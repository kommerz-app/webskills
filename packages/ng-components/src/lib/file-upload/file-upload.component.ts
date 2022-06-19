import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { isUndefined, removeElement } from '@webskills/ts-utils';

@Component({
  selector: 'wsk-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  @Output() fileSelected = new EventEmitter<File[]>();
  @Input() showFileName?: boolean;
  @Input() fileExtensions!: string[];

  files: File[] = [];

  onFileInputSelected(fileEventTarget: EventTarget | null): void {
    const fileEvent = <HTMLInputElement>fileEventTarget;
    const files = fileEvent?.files;

    if (isUndefined(files)) {
      return;
    }
    this.addFiles(files);
    this.fileSelected.emit(this.files);
  }

  onFileDropped(lastAddedFiles: File[]): void {
    this.addFiles(lastAddedFiles);
    this.fileSelected.emit(this.files);
  }

  removeFile(file: File): void {
    removeElement(this.files, file);
  }

  private addFiles(files: FileList | File[]): void {
    const filesAmount = files?.length;

    for (let i = 0; i < filesAmount; i++) {
      const isAlreadyIncluded = this.files?.some(
        (file) => file.name === files[i].name
      );

      if (!isAlreadyIncluded) {
        this.files?.push(files[i]);
      }
    }
  }
}
