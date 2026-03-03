import { Board, Cell, Player } from './board';

type Position = { column: number; row: number; playerCell: Cell };
type Coordinate = { column: number; row: number };

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
  result: { success: boolean; message?: string; row?: number };
  currentPlayer: Player;
  gameStatus: Status;

  private static readonly WIN_COUNT = 4;
  private static readonly MIN_COLUMN = 1;
  private static readonly MAX_COLUMN = 7;

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

    const row = this.result.row!;

    if (this.checkHorizontalWin({ column, row })) {
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
    return this.gameStatus !== Status.InProgress;
  }

  private switchPlayer() {
    if (this.currentPlayer === Player.One) {
      this.currentPlayer = Player.Two;
    } else {
      this.currentPlayer = Player.One;
    }
  }

  private checkHorizontalWin(coordinate: Coordinate): boolean {
    const playerCell = this.board.getCell(coordinate);

    const lastPlayedPosition: Position = {
      ...coordinate,
      playerCell,
    };

    const leftCount = this.countToDirection(lastPlayedPosition, Direction.Left);
    const rightCount = this.countToDirection(lastPlayedPosition, Direction.Right);

    const horizontalCount = leftCount + rightCount + 1;

    return horizontalCount >= Game.WIN_COUNT;
  }

  private countToDirection({ column, row, playerCell }: Position, direction: number) {
    let count = 0;
    for (
      let col = column + direction;
      col <= Game.MAX_COLUMN && col >= Game.MIN_COLUMN;
      col = col + direction
    ) {
      if (this.board.getCell({ row, column: col }) === playerCell) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }
}
