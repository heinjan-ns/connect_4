import { Board, Cell, Player } from './board';

type Coordinate = { column: number; row: number };
type OccupiedCell = Coordinate & { playerCell: Cell };

enum Status {
  InProgress,
  Won,
}

type Direction = { row: number; column: number };

const DIRECTIONS = {
  Right: { row: 0, column: 1 },
  Left: { row: 0, column: -1 },
  Up: { row: 1, column: 0 },
  Down: { row: -1, column: 0 },
  RightUp: { row: 1, column: 1 },
  DownLeft: { row: -1, column: -1 },
};

type MoveResult = { success: boolean; message?: string; winner?: Player };

export class Game {
  board: Board;
  result: { success: boolean; message?: string; row?: number };
  currentPlayer: Player;
  gameStatus: Status;

  private static readonly WIN_COUNT = 4;
  private static readonly MIN_COLUMN = 1;
  private static readonly MAX_COLUMN = 7;
  private static readonly MIN_ROW = 1;
  private static readonly MAX_ROW = 6;

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
    const lastPlayedCell: OccupiedCell = {
      ...coordinate,
      playerCell: this.board.getCell(coordinate),
    };

    const vertWin = this.checkVerticalWin(lastPlayedCell);
    const horizonWin = this.checkHorizontalWin(lastPlayedCell);
    const diagonalWin = this.checkDiagonalWin(lastPlayedCell);

    return vertWin || horizonWin || diagonalWin;
  }

  private checkDiagonalWin(lastPlayedCell: OccupiedCell): boolean {
    const diagonalRightUp = this.countToDirection(lastPlayedCell, DIRECTIONS.RightUp);
    const diagonalLeftDown = this.countToDirection(lastPlayedCell, DIRECTIONS.DownLeft);

    const diagonalCount = 1 + diagonalRightUp + diagonalLeftDown;
    return diagonalCount >= Game.WIN_COUNT;
  }
  private countToDirection({ column, row, playerCell }: OccupiedCell, direction: Direction) {
    let counter = 0;
    let rowToCheck = row + direction.row;
    let columnToCheck = column + direction.column;

    while (this.isValidRow(rowToCheck) && this.isValidColumn(columnToCheck)) {
      if (this.board.getCell({ row: rowToCheck, column: columnToCheck }) === playerCell) {
        counter++;
        rowToCheck += direction.row;
        columnToCheck += direction.column;
      } else {
        break;
      }
    }
    return counter;
  }

  private checkVerticalWin(lastPlayedCell: OccupiedCell): boolean {
    const vertCount = this.countToDirection(lastPlayedCell, DIRECTIONS.Down);
    return vertCount + 1 >= Game.WIN_COUNT;
  }

  private checkHorizontalWin(lastPlayedCell: OccupiedCell): boolean {
    const leftCount = this.countToDirection(lastPlayedCell, DIRECTIONS.Left);
    const rightCount = this.countToDirection(lastPlayedCell, DIRECTIONS.Right);

    return leftCount + rightCount + 1 >= Game.WIN_COUNT;
  }

  private isValidColumn(col: number) {
    return col <= Game.MAX_COLUMN && col >= Game.MIN_COLUMN;
  }

  private isValidRow(row: number) {
    return row <= Game.MAX_ROW && row >= Game.MIN_ROW;
  }
}
