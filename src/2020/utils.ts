export function printArray(array: unknown[]): void {
  // eslint-disable-next-line no-console
  console.log(array.map((row) => (Array.isArray(row) ? row.join('') : row)).join('\n'));
}
