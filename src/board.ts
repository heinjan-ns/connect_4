export enum Cell {
  Empty = '⚪',
  Player1 = '🟡',
  Player2 = '🔴',
}

export enum Player {
  One = 1,
  Two = 2,
}

const playerCoin: Record<Player, Cell> = {
  [Player.One]: Cell.Player1,
  [Player.Two]: Cell.Player2,
};

export class Board {
  lastRow = 6;
  lastColumn = 7;
  grid: Cell[][];

  constructor() {
    this.grid = Array.from({ length: this.lastRow }, () => Array(this.lastColumn).fill(Cell.Empty));
  }

  placeCoin(column: number, player: Player): { success: boolean; message?: string } {
    for (let row = 1; row <= this.lastRow; row++) {
      if (this.getCell({ row, column }) === Cell.Empty) {
        this.setCell({ row, column, player });
        return { success: true };
      }
    }

    return { success: false, message: `Column ${column} is full` };
  }

  getCell({ row, column }: { row: number; column: number }): Cell {
    return this.grid[row - 1][column - 1];
  }

  private setCell({ row, column, player }: { row: number; column: number; player: Player }): void {
    this.grid[row][column - 1] = playerCoin[player];
  }

  isValidColumn(column: number): boolean {
    if (column > 0 && column <= this.lastColumn) {
      return true;
    }
    return false;
  }

  consoleOutput(): string {
    // space-padding for nice formatting, otherwise the ◯s aren't aligned well
    const outputHeader = '   1  2  3  4  5  6  7';
    let rowOutput = '';
    for (let rowCounter = this.lastRow; rowCounter >= 1; rowCounter--) {
      rowOutput += '\n';
      rowOutput += rowCounter.toString();
      rowOutput += this.getRowOutput(rowCounter);
    }

    const output = outputHeader + rowOutput;
    return output;
  }

  private getRowOutput(rowToOutput: number): string {
    let rowOutput = '';
    for (let columnCounter = 1; columnCounter <= this.lastColumn; columnCounter++) {
      rowOutput += ' ' + this.getCell({ row: rowToOutput, column: columnCounter });
    }
    return rowOutput;
  }
}
