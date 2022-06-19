import { ElementRef } from '@angular/core';
import { isInRect, Point, Rect } from './graphic.utils';

export function isElementInViewport(el: ElementRef): boolean {
  const rect = el.nativeElement.getBoundingClientRect();
  // const w = rect.width;
  // const h = rect.height;

  const box: Rect = {
    tl: { x: 0, y: 0 },
    br: {
      x: window.innerWidth || document.documentElement.clientWidth,
      y: window.innerHeight || document.documentElement.clientHeight,
    },
  };

  const tl: Point = { x: rect.left, y: rect.top };
  const tr: Point = { x: rect.right, y: rect.top };
  const bl: Point = { x: rect.left, y: rect.bottom };
  const br: Point = { x: rect.right, y: rect.bottom };

  return (
    isInRect(tl, box) ||
    isInRect(tr, box) ||
    isInRect(bl, box) ||
    isInRect(br, box)
  );
}
