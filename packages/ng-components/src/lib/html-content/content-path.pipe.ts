import {
  Inject,
  LOCALE_ID,
  Pipe,
  PipeTransform,
  PLATFORM_ID,
} from '@angular/core';
import { UrlSegment } from '@angular/router';
import { transformPaths } from './content-path.utils';
import { isPlatformBrowser } from '@angular/common';

/**
 * transform relative path to load content from "assets/content/${locale}/..."
 */
@Pipe({
  name: 'contentPath',
  standalone: true,
})
export class ContentPathPipe implements PipeTransform {
  private readonly prefix: string;

  constructor(
    @Inject(LOCALE_ID) private readonly locale: string,
    @Inject(PLATFORM_ID) platformId: NonNullable<unknown>,
  ) {
    this.prefix = isPlatformBrowser(platformId) ? '' : '/';
  }

  transform(paths: UrlSegment[] | string | null | undefined): string | null {
    return this.prefix + transformPaths(paths, this.locale);
  }
}
