export function inputToNumberMap(input: string) {
  const rows = input.split('\n');

  return {
    map: new Map(
      rows.flatMap((row, y) => row.split('').map((value, x) => [`${x},${y}`, Number(value)])),
    ),
    rowCount: rows.length,
    colCount: rows[0].length,
  };
}
