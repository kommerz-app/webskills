export function idCompare(c1: { id?: unknown }, c2: { id?: unknown }): boolean {
  return c1 && c2 ? c1.id === c2.id : c1 === c2;
}
