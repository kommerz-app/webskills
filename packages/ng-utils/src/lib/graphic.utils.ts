export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  tl: Point;
  br: Point;
}

/**
 * Test whether the specified is within the rectangle.
 *
 * @param {Point} p
 * @param {Rect} b
 * @returns {boolean}
 */
export function isInRect(p: Point, b: Rect): boolean {
  return p.x >= b.tl.x && p.x <= b.br.x && p.y >= b.tl.y && p.y <= b.br.y;
}
