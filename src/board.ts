export enum Cell {
  Empty = '⚪',
  Player1 = '🟡',
  Player2 = '🔴',
}

export enum Player {
  One = 1,
  Two = 2,
}

export const BOARD_COLUMNS = 7;
export const BOARD_ROWS = 6;

export const playerCoin: Record<Player, Cell> = {
  [Player.One]: Cell.Player1,
  [Player.Two]: Cell.Player2,
};

export class Board {
  readonly rows = BOARD_ROWS;
  readonly columns = BOARD_COLUMNS;
  private grid: Cell[][];

  constructor() {
    this.grid = Array.from({ length: this.rows }, () => Array(this.columns).fill(Cell.Empty));
  }

  placeCoin(column: number, player: Player): { success: boolean; row?: number; message?: string } {
    if (!this.isValidColumn(column)) {
      return {
        success: false,
        message: `❌ ${column} is not a valid column.`,
      };
    }

    for (let rowIndex = 1; rowIndex <= this.rows; rowIndex++) {
      if (this.getCell({ row: rowIndex, column }) === Cell.Empty) {
        this.setCell({ row: rowIndex, column, player });
        return { success: true, row: rowIndex };
      }
    }

    return { success: false, message: `❌ Column ${column} is full` };
  }

  getCell({ row, column }: { row: number; column: number }): Cell {
    return this.grid[row - 1][column - 1];
  }

  isBoardFull(): boolean {
    for (let columnIndex = 1; columnIndex <= this.columns; columnIndex++) {
      if (this.getCell({ row: this.rows, column: columnIndex }) === Cell.Empty) {
        return false;
      }
    }
    return true;
  }

  consoleOutput(): string {
    // space-padding for nice formatting, otherwise the ◯s aren't aligned well
    const outputHeader = '   1  2  3  4  5  6  7';
    let rowOutput = '';
    for (let rowCounter = this.rows; rowCounter >= 1; rowCounter--) {
      rowOutput += '\n';
      rowOutput += rowCounter.toString();
      rowOutput += this.getRowOutput(rowCounter);
    }

    return outputHeader + rowOutput;
  }

  private setCell({ row, column, player }: { row: number; column: number; player: Player }): void {
    this.grid[row - 1][column - 1] = playerCoin[player];
  }

  private isValidColumn(column: number): boolean {
    return column >= 1 && column <= this.columns;
  }

  private getRowOutput(rowToOutput: number): string {
    let rowOutput = '';
    for (let columnCounter = 1; columnCounter <= this.columns; columnCounter++) {
      rowOutput += ' ' + this.getCell({ row: rowToOutput, column: columnCounter });
    }
    return rowOutput;
  }
}
