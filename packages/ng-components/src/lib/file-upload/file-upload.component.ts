import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { isUndefined, removeElement } from '@webskills/ts-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { $localize } from '@angular/localize/init';

@Component({
  selector: 'wsk-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  @Output() fileSelected = new EventEmitter<File[]>();
  @Input() isMultiUpload = false;
  @Input() showFileName?: boolean;
  @Input() fileExtensions!: string[];

  files: File[] = [];

  constructor(private snackBar: MatSnackBar) {}

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
    if (!this.isMultiUpload && lastAddedFiles.length > 1) {
      this.snackBar.open(
        $localize`You have tried to upload multiple files. Please select only one file.`,
        undefined,
        { duration: 6000 }
      );
    }

    this.addFiles(lastAddedFiles);
    this.fileSelected.emit(this.files);
  }

  removeFile(file: File): void {
    removeElement(this.files, file);
  }

  private addFiles(files: FileList | File[]): void {
    if (this.isMultiUpload) {
      this.addMultipleFiles(files);
    } else {
      this.addSingleFiles(files);
    }
  }

  private addMultipleFiles(files: FileList | File[]): void {
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

  private addSingleFiles(files: FileList | File[]): void {
    if (isUndefined(files) || files?.length === 0) {
      return;
    }

    this.files = [];
    this.files.push(files[0]);
  }
}
