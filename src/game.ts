import { Board, Cell, Player } from './board';

type Coordinate = { column: number; row: number };
type OccupiedCell = Coordinate & { playerCell: Cell };

enum Status {
  InProgress,
  Won,
}

enum Direction {
  Right = 1,
  Left = -1,
}

type MoveResult = { success: boolean; message?: string; winner?: Player };

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

  makeMove(column: number): MoveResult {
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

    if (this.checkWin({ column, row: this.result.row! })) {
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

  private checkWin(coordinate: Coordinate): boolean {
    const vertWin = this.checkVerticalWin(coordinate);
    const horizonWin = this.checkHorizontalWin(coordinate);
    const diagonalWin = this.checkDiagonalWin(coordinate);

    return vertWin || horizonWin || diagonalWin;
  }

  private checkDiagonalWin(coordinate: Coordinate): boolean {
    const playerInCell = this.board.getCell(coordinate);

    const diagonalRightUp = this.countDiagonalDirection(coordinate, playerInCell, 1);
    const diagonalLeftDown = this.countDiagonalDirection(coordinate, playerInCell, -1);

    const diagonalCount = 1 + diagonalRightUp + diagonalLeftDown;
    return diagonalCount >= Game.WIN_COUNT;
  }
  private countDiagonalDirection(coordinate: Coordinate, playerInCell: Cell, direction: number) {
    let counter = 0;
    let row = coordinate.row + direction;
    let col = coordinate.column + direction;

    while (row >= 1 && row <= 6 && col >= 1 && col <= 7) {
      if (this.board.getCell({ row, column: col }) === playerInCell) {
        counter++;
        row += direction;
        col += direction;
      } else {
        break;
      }
    }
    return counter;
  }

  private checkVerticalWin(coordinate: Coordinate): boolean {
    const playerInCell = this.board.getCell(coordinate);

    let downCount = 1;
    for (let row = coordinate.row - 1; row >= 1; row--) {
      if (this.board.getCell({ row: row, column: coordinate.column }) === playerInCell) {
        downCount++;
      } else {
        break;
      }
    }
    return downCount >= Game.WIN_COUNT;
  }

  private checkHorizontalWin(coordinate: Coordinate): boolean {
    const playerInCell = this.board.getCell(coordinate);

    const lastPlayedCell: OccupiedCell = {
      ...coordinate,
      playerCell: playerInCell,
    };

    const leftCount = this.countToDirection(lastPlayedCell, Direction.Left);
    const rightCount = this.countToDirection(lastPlayedCell, Direction.Right);

    const horizontalCount = leftCount + rightCount + 1;

    return horizontalCount >= Game.WIN_COUNT;
  }

  private countToDirection({ column, row, playerCell }: OccupiedCell, direction: number) {
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
