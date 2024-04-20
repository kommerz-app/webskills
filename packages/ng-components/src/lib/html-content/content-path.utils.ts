import { UrlSegment } from '@angular/router';
import { isBlank } from '@webskills/ts-utils';

export function transformPaths(
  paths: UrlSegment[] | string | null | undefined,
  locale: string,
) {
  if (typeof paths === 'string') {
    return buildPath(paths, locale);
  }
  if (Array.isArray(paths)) {
    const pathFragment = paths.reduce((a, b) => a + '/' + b.path, '');
    return buildPath(pathFragment, locale);
  }
  return null;
}

function buildPath(pathFragment: string, locale: string): string | null {
  if (isBlank(pathFragment)) {
    return null;
  }

  if (!pathFragment.startsWith('/')) {
    pathFragment = '/' + pathFragment;
  }

  if (pathFragment.endsWith('/')) {
    pathFragment += 'index.html';
  }

  if (!pathFragment.endsWith('.html')) {
    pathFragment = pathFragment + '.html';
  }

  return `assets/content/${locale}${pathFragment}`;
}
