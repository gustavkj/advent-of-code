const directions = <const>['north', 'east', 'south', 'west'];

type Direction = typeof directions[number];

interface Tile {
  id: number;
  edges: Record<Direction, string>;
  content: string[][];
  neighborsList: Set<number>;
  neighbors: {
    [P in Direction]?: number;
  };
}

function rotate(content: string[][]) {
  const newContent: string[][] = [];

  content.reverse().forEach((row) =>
    row.forEach((col, colIndex) => {
      if (!newContent[colIndex]) {
        newContent[colIndex] = [];
      }
      newContent[colIndex].push(col);
    }),
  );

  return newContent;
}

function flipHorizontally(content: string[][]) {
  return [...content.map((row) => [...row.reverse()])];
}

function flipVertically(content: string[][]) {
  return [...content].reverse().map((row) => [...row]);
}

function getOpposite(tile: Tile, neighborID: number) {
  const [neighborDir] = Object.entries(tile.neighbors)
    .filter(([, id]) => id === neighborID)
    .map(([dir]) => dir);

  const index = directions.findIndex((direction) => direction === (neighborDir as Direction));
  return tile.neighbors[directions[(index + 2) % 4]];
}

function reverse(str: string) {
  return [...str].reverse().join('');
}

function parseInput(input: string) {
  const tiles: Record<number, Tile> = {};
  const edges: Record<string, number[]> = {};

  input
    .split('\n\n')
    .map(
      (tileBlock): Tile => {
        const [tileIdRow, ...tileRows] = tileBlock.split('\n');

        const match = /Tile (\d+):/.exec(tileIdRow);

        if (!match) {
          throw new Error(`Failed to parse tile ID row: ${tileIdRow}`);
        }

        const id = Number(match[1]);
        let northEdge = '';
        let southEdge = '';
        let westEdge = '';
        let eastEdge = '';
        const content: string[][] = [];

        tileRows
          .map((row) => row.split(''))
          .forEach((row, rowIndex, rowsArray) => {
            if (rowIndex === 0) {
              northEdge = row.join('');
            }
            if (rowIndex === rowsArray.length - 1) {
              southEdge = row.join('');
            }
            if (![0, rowsArray.length - 1].includes(rowIndex)) {
              content.push(row.slice(1, -1));
            }

            row.forEach((cell, cellIndex) => {
              if (cellIndex === 0) {
                westEdge += cell;
              }
              if (cellIndex === row.length - 1) {
                eastEdge += cell;
              }
            });
          });

        return {
          id,
          edges: {
            north: northEdge,
            south: southEdge,
            west: westEdge,
            east: eastEdge,
          },
          content,
          neighborsList: new Set<number>(),
          neighbors: {},
        };
      },
    )
    .forEach((tile) => {
      tiles[tile.id] = tile;
      Object.values(tile.edges).forEach((edge) => {
        const reversedEdge = reverse(edge);

        if (!edges[edge]) {
          edges[edge] = [];
        }
        if (!edges[reversedEdge]) {
          edges[reversedEdge] = [];
        }

        edges[edge].push(tile.id);
        edges[reversedEdge].push(tile.id);
      });
    });

  Object.entries(edges).forEach(([edgePattern, tileIDs]) => {
    tileIDs.forEach((id) => {
      tileIDs
        .filter((tileId) => tileId !== id)
        .forEach((tileId) => {
          tiles[id].neighborsList.add(tileId);
          const [edgeDir] = Object.entries(tiles[id].edges)
            .filter(([, edge]) => edgePattern === edge || edgePattern === reverse(edge))
            .map(([dir]) => dir);

          tiles[id].neighbors[edgeDir as Direction] = tileId;
        });
    });
  });

  return { edges, tiles };
}

export function part1(input: string): number {
  const { tiles } = parseInput(input);

  const cornerIDs = Object.entries(tiles)
    .filter(([, tile]) => tile.neighborsList.size < 3)
    .map(([tileId]) => Number(tileId));

  if (cornerIDs.length > 4) {
    throw new Error('More than four corners');
  }

  // 14129524957217
  return cornerIDs.reduce((product, tileID) => product * tileID);
}

export function part2(input: string): number {
  const { tiles } = parseInput(input);

  const [cornerID] = Object.entries(tiles)
    .filter(([, tile]) => tile.neighborsList.size < 3)
    .map(([tileId]) => Number(tileId));

  const [edgeRow, edgeCol] = Object.entries(tiles[cornerID].neighbors).map(([, neighborID]) => {
    let nextId: number | undefined = neighborID as number;
    let prevId = cornerID;
    const cells: number[] = [prevId];

    while (nextId) {
      cells.push(nextId);
      const tmpPrevId = nextId;
      nextId = getOpposite(tiles[nextId], prevId);
      prevId = tmpPrevId;
    }

    return cells;
  });

  const allTheIDs: number[][] = [edgeRow];

  edgeCol.forEach((edgeId, i, array) => {
    if (i === 0) {
      return;
    }

    let nextId: number | undefined = Object.values(tiles[edgeId].neighbors).find(
      (neighborId) => ![array[i + 1], array[i - 1]].includes(neighborId as number),
    );
    let prevId = edgeId;
    const cells: number[] = [prevId];

    while (nextId) {
      cells.push(nextId);
      const tmpPrevId = nextId;
      nextId = getOpposite(tiles[nextId], prevId);
      prevId = tmpPrevId;
    }

    allTheIDs.push(cells);
  });

  const orientedTiles = allTheIDs.map((row, rowIndex, rows) =>
    row.map((id, colIndex, cols) => {
      const tile = tiles[id];

      const wantedNeighbors = {
        north: rows[rowIndex - 1]?.[colIndex],
        east: cols[colIndex + 1],
        south: rows[rowIndex + 1]?.[colIndex],
        west: cols[colIndex - 1],
      };

      let index = 0;
      let { neighbors } = tile;
      let { content } = tile;

      while (index < 4) {
        if (
          neighbors.north === wantedNeighbors.north &&
          neighbors.east === wantedNeighbors.east &&
          neighbors.south === wantedNeighbors.south &&
          neighbors.west === wantedNeighbors.west
        ) {
          // Tile is already correct orientation.
          return content;
        }

        if (
          neighbors.north === wantedNeighbors.north &&
          neighbors.south === wantedNeighbors.south
        ) {
          // Tile needs to be flipped horizontally.
          return flipHorizontally(content);
        }

        if (neighbors.east === wantedNeighbors.east && neighbors.west === wantedNeighbors.west) {
          // Tile needs to be flipped horizontally.
          return flipVertically(content);
        }

        // Rotate and try again
        content = rotate(content);
        neighbors = {
          north: neighbors.west,
          east: neighbors.north,
          south: neighbors.east,
          west: neighbors.south,
        };

        index += 1;
      }

      throw new Error(`Didn't find the orientation of a tile`);
    }),
  );

  const image = orientedTiles.flatMap((row) =>
    row.reduce((newTile, tile) =>
      newTile.map((newTileRow, newRowIndex) => newTileRow.concat(tile[newRowIndex])),
    ),
  );

  const seamonsterRow1 = /(.{18})#(.)/;
  const seamonsterRow2 = /#(....)##(....)##(....)###/;
  const seamonsterRow3 = /(.)#(..)#(..)#(..)#(..)#(..)#(...)/;

  let foundSeaMonsters = 0;
  let iteration = 0;
  let imageToCheck = image;

  while (foundSeaMonsters === 0) {
    let rowIndex = 0;
    while (rowIndex < imageToCheck.length) {
      let row1 = imageToCheck[rowIndex].join('');
      let row2 = imageToCheck[rowIndex + 1]?.join('');
      let row3 = imageToCheck[rowIndex + 2]?.join('');

      if (!row1 || !row2 || !row3) {
        rowIndex += 1;
        // eslint-disable-next-line no-continue
        continue;
      }

      let foundSeaMonstersOnRow = 0;

      let rowOffset = 0;
      while (rowOffset <= row1.length - 20) {
        const match1 = seamonsterRow1.exec(row1.slice(rowOffset));
        const match2 = seamonsterRow2.exec(row2.slice(rowOffset));
        const match3 = seamonsterRow3.exec(row3.slice(rowOffset));

        if (!match1 || !match2 || !match3) {
          rowOffset += 1;
          // eslint-disable-next-line no-continue
          continue;
        }

        if (match1.index !== match2.index || match1.index !== match3.index) {
          rowOffset += 1;
          // eslint-disable-next-line no-continue
          continue;
        }

        imageToCheck[rowIndex] = (
          row1.slice(0, rowOffset) +
          row1.slice(rowOffset, rowOffset + 20).replace(seamonsterRow1, '$1O$2') +
          row1.slice(rowOffset + 20)
        ).split('');
        imageToCheck[rowIndex + 1] = (
          row2.slice(0, rowOffset) +
          row2.slice(rowOffset, rowOffset + 20).replace(seamonsterRow2, 'O$1OO$2OO$3OOO') +
          row2.slice(rowOffset + 20)
        ).split('');
        imageToCheck[rowIndex + 2] = (
          row3.slice(0, rowOffset) +
          row3.slice(rowOffset, rowOffset + 20).replace(seamonsterRow3, '$1O$2O$3O$4O$5O$6O$7') +
          row3.slice(rowOffset + 20)
        ).split('');

        row1 = imageToCheck[rowIndex].join('');
        row2 = imageToCheck[rowIndex + 1].join('');
        row3 = imageToCheck[rowIndex + 2].join('');

        foundSeaMonstersOnRow += 1;
        rowOffset += 1;
      }

      foundSeaMonsters += foundSeaMonstersOnRow;
      rowIndex += 1;
    }

    if (foundSeaMonsters === 0) {
      if (iteration % 4 === 0) {
        imageToCheck = flipHorizontally(imageToCheck);
      } else if (iteration % 4 === 1) {
        imageToCheck = flipVertically(imageToCheck);
      } else if (iteration % 4 === 2) {
        imageToCheck = flipHorizontally(imageToCheck);
      } else {
        imageToCheck = rotate(imageToCheck);
      }
    }

    if (iteration > 100) {
      throw new Error('Stopping loop');
    }

    iteration += 1;
  }

  // console.log(imageToCheck.reduce((output, row) => `${output + row.join('')}\n`, ''));

  const numberOfPoundSigns = imageToCheck.flatMap((row) => row.filter((cell) => cell === '#'))
    .length;

  // 1649
  return numberOfPoundSigns;
}
