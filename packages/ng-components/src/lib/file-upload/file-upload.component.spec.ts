import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FileUploadComponent } from './file-upload.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploadComponent],
      imports: [MatIconModule, MatSnackBarModule, NoopAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const fileEventMock = {
    addEventListener: () => {
      return true;
    },
    dispatchEvent: () => {
      return true;
    },
    removeEventListener: () => {
      return true;
    },
    files: [
      {
        name: 'image.png',
        size: 50000,
        type: 'image/png',
      },
    ],
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a file via file selected', () => {
    const fileSelectedSpy = jest.spyOn(component.fileSelected, 'emit');

    component.onFileInputSelected(fileEventMock);

    expect(fileSelectedSpy).toHaveBeenCalledWith(fileEventMock.files);
  });

  it('should add multiple files via file selected', () => {
    const file1 = {
      name: 'test.png',
      size: 500000,
      type: 'image/png',
    };

    const file2 = {
      name: 'test2.png',
      size: 500000,
      type: 'image/png',
    };

    const files = [file1, file2];

    const fileEventMock = {
      addEventListener: () => {
        return true;
      },
      dispatchEvent: () => {
        return true;
      },
      removeEventListener: () => {
        return true;
      },
      files: files,
    };

    component.isMultiUpload = true;

    const fileSelectedSpy = jest.spyOn(component.fileSelected, 'emit');

    component.onFileInputSelected(fileEventMock);

    expect(fileSelectedSpy).toHaveBeenCalled();
    expect(fileSelectedSpy).toHaveBeenCalledWith(fileEventMock.files);
  });

  it('should add the same file via file selected only once', () => {
    const fileSelectedSpy = jest.spyOn(component.fileSelected, 'emit');

    component.onFileInputSelected(fileEventMock);
    component.onFileInputSelected(fileEventMock);

    expect(fileSelectedSpy).toHaveBeenCalledWith(fileEventMock.files);
  });

  it('should add a file via file dropped', () => {
    const file1 = new File([], 'foo.png', {
      type: 'image/png',
    });

    const fileSelectedSpy = jest.spyOn(component.fileSelected, 'emit');

    component.onFileDropped([file1]);

    expect(fileSelectedSpy).toHaveBeenCalledWith([file1]);
  });

  it('should add multiple files via file dropped', () => {
    const file1 = new File([], 'foo.png', {
      type: 'image/png',
    });

    const file2 = new File([], 'foo2.png', {
      type: 'image/png',
    });

    const files = [file1, file2];
    const fileSelectedSpy = jest.spyOn(component.fileSelected, 'emit');

    component.isMultiUpload = true;
    component.onFileDropped(files);

    expect(fileSelectedSpy).toHaveBeenCalledWith(files);
  });

  it('should add the same file via file dropped only once', () => {
    const file1 = new File([], 'foo.png', {
      type: 'image/png',
    });

    const file2 = new File([], 'foo.png', {
      type: 'image/png',
    });

    const file3 = new File([], 'foo3.png', {
      type: 'image/png',
    });

    const files = [file1, file2, file3];
    const expectedFiles = [file1, file3];
    const fileSelectedSpy = jest.spyOn(component.fileSelected, 'emit');

    component.isMultiUpload = true;
    component.onFileDropped(files);

    expect(fileSelectedSpy).toHaveBeenCalledWith(expectedFiles);
  });

  it('should remove file', () => {
    const file1 = new File([], 'test.png', {
      type: 'image/png',
    });

    const file2 = new File([], 'test2.png', {
      type: 'image/png',
    });

    const files = [file1, file2];

    const fileSelectedSpy = jest.spyOn(component.fileSelected, 'emit');

    component.isMultiUpload = true;
    component.onFileDropped(files);

    expect(fileSelectedSpy).toHaveBeenCalledWith(files);

    component.removeFile(file1);
    expect(fileSelectedSpy).toHaveBeenCalledWith([file2]);
  });

  it('should show snackbar if multiUpload is false and user selects more than one file', () => {
    const file1 = new File([], 'foo.png', {
      type: 'image/png',
    });

    const file2 = new File([], 'foo2.png', {
      type: 'image/png',
    });

    const files = [file1, file2];

    component.isMultiUpload = false;
    component.onFileDropped(files);
    fixture.detectChanges();
    const snackingBar = document.querySelector('mat-snack-bar-container');

    expect(snackingBar).toBeTruthy();
  });
});
