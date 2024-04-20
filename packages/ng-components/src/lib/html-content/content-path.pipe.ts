import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { UrlSegment } from '@angular/router';
import { transformPaths } from './content-path.utils';

/**
 * transform relative path to load content from "assets/content/${locale}/..."
 */
@Pipe({
  name: 'content-path',
  standalone: true,
})
export class ContentPathPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private readonly locale: string) {}

  transform(paths: UrlSegment[] | string | null | undefined): string | null {
    return transformPaths(paths, this.locale);
  }
}
