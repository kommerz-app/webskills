import {
  ChangeDetectionStrategy,
  Component,
  Input,
  isDevMode,
} from '@angular/core';
import { isBlank } from '@webskills/ts-utils';

@Component({
  selector: 'wsk-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class PictureComponent {
  @Input() src?: string;
  @Input() alt?: string;
  @Input() imgclass?: string;
  @Input() sizes = [150, 300, 600, 900, 1200, 2000];

  get extension(): string | undefined {
    return this.src?.split('.').slice(-1).join();
  }

  get webpSrcset(): string {
    return this.getSrcset('webp');
  }

  get origSrcset(): string {
    return this.getSrcset(this.extension);
  }

  private getSrcset(extension?: string): string {
    if (isDevMode()) {
      return '';
    }

    if (isBlank(this.src)) {
      return '';
    }

    if (this.src?.endsWith('svg')) {
      return '';
    }

    const baseFilePath = this.src?.split('.').slice(0, -1).join('.');

    return this.sizes
      .map((size) => `${baseFilePath}_${size}.${extension} ${size}w`)
      .join(',');
  }
}
