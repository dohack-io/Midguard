export class MapService {
  /*
  0   1

  3   2
   */

  squareAroundMarker(position: number[]): number[][] {
    const lbc = [position[0] - 0.00025, position[1] - 0.0004];
    const rbc = [position[0] - 0.00025, position[1] + 0.0004];
    const ltc = [position[0] + 0.00025, position[1] - 0.0004];
    const rtc = [position[0] + 0.00025, position[1] + 0.0004];
    return [ltc, rtc, rbc, lbc];
  }

  nextSquare(square: number[][], direction: string) {
    switch (direction) {
      case 'Right':
        return [
          [square[1][0], square[1][1]],
          [square[1][0], square[1][1] + 0.0008],
          [square[2][0], square[2][1] + 0.0008],
          [square[2][0], square[2][1]]
        ];
      case 'Left':
        return [
          [square[0][0], square[0][1] - 0.0008],
          [square[0][0], square[0][1]],
          [square[3][0], square[3][1]],
          [square[3][0], square[3][1] - 0.0008]
        ];
      case 'Top':
        return [
          [square[0][0] + 0.0005, square[0][1]],
          [square[1][0] + 0.0005, square[1][1]],
          [square[1][0], square[1][1]],
          [square[0][0], square[0][1]]
        ];
      case 'Bottom':
        return [
          [square[3][0], square[3][1]],
          [square[2][0], square[2][1]],
          [square[2][0] - 0.0005, square[2][1]],
          [square[3][0] - 0.0005, square[3][1]]
        ];
      case 'Top Right':
        return this.nextSquare(this.nextSquare(square, 'Top'), 'Right');
      case 'Top Left':
        return this.nextSquare(this.nextSquare(square, 'Top'), 'Left');
      case 'Bottom Right':
        return this.nextSquare(this.nextSquare(square, 'Bottom'), 'Right');
      case 'Bottom Left':
        return this.nextSquare(this.nextSquare(square, 'Bottom'), 'Left');
    }
  }

  positionInsideSquare(position: number[], square: number[][]): boolean {
    const x = position[0];
    const y = position[1];

    let inside = false;
    for (let i = 0, j = square.length - 1; i < square.length; j = i++) {
      const xi = square[i][0],
        yi = square[i][1];
      const xj = square[j][0],
        yj = square[j][1];

      const intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) {
        inside = !inside;
      }
    }
    return inside;
  }

  getCurrentTile(position: number[], posTiles: number[][][]): number[][] {
    for (const tile of posTiles) {
      if (this.positionInsideSquare(position, tile)) {
        return tile;
      }
    }
    return this.squareAroundMarker(position);
  }
}
