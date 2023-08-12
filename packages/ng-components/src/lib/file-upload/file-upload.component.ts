import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  Output,
  Renderer2,
} from '@angular/core';
import { isUndefined, removeElement } from '@webskills/ts-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractControlValueAccessor } from '@webskills/ng-utils';
import { formatNumber } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'wsk-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent,
    },
  ],
})
export class FileUploadComponent extends AbstractControlValueAccessor<File[]> {
  @Input() isMultiUpload = false;
  @Input() showFileName?: boolean;

  /**
   * Max file size in bytes
   */
  @Input() maxFileSize?: number;

  @Input() fileExtensions!: string[];

  @Output() fileSelected = new EventEmitter<File[]>();

  files: File[] = [];

  constructor(
    private snackBar: MatSnackBar,
    _renderer: Renderer2,
    _elementRef: ElementRef,
    @Inject(LOCALE_ID) private locale: string
  ) {
    super(_renderer, _elementRef);
  }

  override writeValue(data?: File[]): void {
    this.files = data ?? [];
  }

  onFileInputSelected(fileEventTarget: EventTarget | null): void {
    const fileEvent = <HTMLInputElement>fileEventTarget;
    const files = fileEvent?.files;

    if (isUndefined(files)) {
      return;
    }

    this.addFiles(files);
  }

  onFileDropped(lastAddedFiles: File[]): void {
    if (!this.isMultiUpload && lastAddedFiles.length > 1) {
      this.snackBar.open(
        'You have tried to upload multiple files. Please select only one file.'
      );
      return;
    }

    this.addFiles(lastAddedFiles);
  }

  removeFile(file: File): void {
    removeElement(this.files, file);
    this.emitChange();
  }

  private addFiles(newFiles: FileList | File[]): void {
    if (this.isMultiUpload) {
      this.addMultipleFiles(newFiles);
    } else {
      this.addSingleFiles(newFiles);
    }
  }

  private addMultipleFiles(newFiles: FileList | File[]): void {
    const filesAmount = newFiles?.length;
    const tooLargeFiles: File[] = [];

    for (let i = 0; i < filesAmount; i++) {
      const newFile = newFiles[i];

      if (this.maxFileSize && newFile.size > this.maxFileSize) {
        tooLargeFiles.push(newFile);
        continue;
      }

      const isAlreadyIncluded = this.files?.some(
        (file) => file.name === newFile.name
      );

      if (!isAlreadyIncluded) {
        this.files?.push(newFile);
      }
    }

    if (tooLargeFiles.length > 0) {
      const combinedFiles = tooLargeFiles.map((file) => file.name).join(', ');
      this.snackBar.open(`The following files are too large: ${combinedFiles}`);
    }

    this.emitChange();
  }

  private addSingleFiles(newFiles: FileList | File[]): void {
    if (isUndefined(newFiles) || newFiles?.length === 0) {
      return;
    }

    if (this.maxFileSize && newFiles[0].size > this.maxFileSize) {
      this.snackBar.open('The file is too large.');
      return;
    }

    this.files = [];
    this.files.push(newFiles[0]);

    this.emitChange();
  }

  getMaxFileSizeInMb(): string {
    const mb = this.maxFileSize ? this.maxFileSize / 1_000_000 : 0;
    return formatNumber(mb, this.locale, '1.0-2');
  }

  private emitChange() {
    this.onChange?.(this.files);
    this.onTouched?.();

    this.fileSelected.emit(this.files);
  }
}
