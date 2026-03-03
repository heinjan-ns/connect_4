import { Board, Cell, Player } from './board';

type Position = { column: number; row: number; playerCell: Cell };

enum Status {
  InProgress,
  Won,
}

enum Direction {
  Right = 1,
  Left = -1,
}

export class Game {
  board: Board;
  result: { success: boolean; message?: string };
  currentPlayer: Player;
  gameStatus: Status;

  constructor() {
    this.board = new Board();
    this.currentPlayer = Player.One;
    this.gameStatus = Status.InProgress;
  }

  start() {
    // empty for now
  }

  getWelcomeMessage(): string {
    const welcome = 'Welcome to the game Connect 4.';
    return welcome;
  }

  getRules(): string[] {
    const rules = [
      'The board has 6 rows and 7 columns.',
      'Coins are dropped and fall to the lowest row.',
      'Player 1 goes first, then players alternate.',
      '4-in-a-row (horizontal, vertical, or diagonal) wins.',
      'A draw occurs when the board is full with no winner.',
    ];
    return rules;
  }

  getPrompt(): string {
    const prompt = 'Press any key to start';
    return prompt;
  }

  getCurrentPlayer(): Player {
    return this.currentPlayer;
  }

  makeMove(column: number): { success: boolean; message?: string; winner?: Player } {
    if (!this.board.isValidColumn(column)) {
      return {
        success: false,
        message: '❌ Please select a valid column (1-7)',
      };
    }
    this.result = this.board.placeCoin(column, this.currentPlayer);
    if (!this.result.success) {
      return {
        success: false,
        message: this.result.message,
      };
    }

    if (this.checkHorizontalWin(column)) {
      this.gameStatus = Status.Won;
      return {
        success: true,
        message: `Player ${this.currentPlayer} has won`,
        winner: this.currentPlayer,
      };
    }

    this.switchPlayer();

    return { success: true };
  }

  isGameOver(): boolean {
    if (this.gameStatus === Status.Won) {
      return true;
    }
    return false;
  }

  private switchPlayer() {
    if (this.currentPlayer === Player.One) {
      this.currentPlayer = Player.Two;
    } else {
      this.currentPlayer = Player.One;
    }
  }

  private checkHorizontalWin(columnLastPlaced: number): boolean {
    const rowLastPlaced = this.giveRowLastPlaced(columnLastPlaced);
    const playerCell = this.board.getCell({ row: rowLastPlaced, column: columnLastPlaced });

    const leftCount = this.countToLeft({
      column: columnLastPlaced,
      row: rowLastPlaced,
      playerCell,
    });
    const rightCount = this.countToDirection(
      {
        column: columnLastPlaced,
        row: rowLastPlaced,
        playerCell,
      },
      Direction.Right
    );

    const count = leftCount + rightCount + 1;

    if (count >= 4) {
      return true;
    }
    return false;
  }

  private countToDirection({ column, row, playerCell }: Position, direction: number) {
    let count = 0;
    for (let col = column + direction; col <= 7 && col >= 1; col = col + direction) {
      if (this.board.getCell({ row, column: col }) === playerCell) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }

  private countToLeft({ column, row, playerCell }: Position) {
    let count = 0;
    for (let col = column - 1; col >= 1; col--) {
      if (this.board.getCell({ row, column: col }) === playerCell) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }

  private giveRowLastPlaced(columnLastPlaced: number): number {
    for (let rowIndex = this.board.lastRow; rowIndex >= 1; rowIndex--) {
      let currentCell = this.board.getCell({ row: rowIndex, column: columnLastPlaced });
      if (currentCell !== Cell.Empty) {
        return rowIndex;
      }
    }
    return 1; // Default to row 1 if somehow empty (shouldn't happen after placeCoin)
  }
}
