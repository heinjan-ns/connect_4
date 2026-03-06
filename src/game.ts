import { Board, Cell, Player, Coordinate } from './board';

type OccupiedCell = Coordinate & { playerCell: Cell };

enum Status {
  InProgress,
  Won,
  Draw,
}

type Direction = { row: -1 | 0 | 1; column: -1 | 0 | 1 };

const DIRECTION = {
  Right: { row: 0, column: 1 },
  Left: { row: 0, column: -1 },
  Up: { row: 1, column: 0 }, // not used
  Down: { row: -1, column: 0 },
  RightUp: { row: 1, column: 1 },
  LeftDown: { row: -1, column: -1 },
  RightDown: { row: -1, column: 1 },
  LeftUp: { row: 1, column: -1 },
} as const;

type MoveResult = {
  success: boolean;
  message?: string;
  winner?: Player;
  winningCells?: Coordinate;
  isDraw?: boolean;
};

export class Game {
  board: Board;
  currentPlayer: Player;
  gameStatus: Status;
  winningCells: Coordinate[];

  private static readonly WIN_COUNT = 4;

  constructor() {
    this.board = new Board();
    this.currentPlayer = Player.One;
    this.gameStatus = Status.InProgress;
    this.winningCells = [];
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
    const prompt = 'Press enter to start';
    return prompt;
  }

  getCurrentPlayerCoin(): string {
    return this.currentPlayer === Player.One ? Cell.Player1 : Cell.Player2;
  }

  getCurrentPlayer(): Player {
    return this.currentPlayer;
  }

  makeMove(column: number): MoveResult {
    if (this.isGameOver()) {
      return {
        success: false,
        message: `Game is already finished`,
      };
    }

    const result = this.board.placeCoin(column, this.currentPlayer);
    if (!result.success) {
      return {
        success: false,
        message: result.message,
      };
    }

    const lastPlacedCoin: Coordinate = { column, row: result.row! };
    const winResult = this.handleWin(lastPlacedCoin);

    if (winResult) {
      return winResult;
    }

    const drawResult = this.handleDraw();
    if (drawResult) {
      return drawResult;
    }

    this.switchPlayer();
    return { success: true };
  }

  private handleWin(coordinate: Coordinate): MoveResult | null {
    if (this.checkWin(coordinate)) {
      this.gameStatus = Status.Won;
      return {
        success: true,
        winner: this.currentPlayer,
        winningCells: coordinate,
      };
    }
    return null;
  }
  private handleDraw(): MoveResult | null {
    if (this.board.isBoardFull()) {
      this.gameStatus = Status.Draw;
      return {
        success: true,
        message: `Game is a Draw`,
        isDraw: true,
      };
    }
    return null;
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
    const ascDiagonalWin = this.checkAscDiagonalWin(lastPlayedCell);
    const descDiagonalWin = this.checkDescDiagonalWin(lastPlayedCell);

    return vertWin || horizonWin || ascDiagonalWin || descDiagonalWin;
  }

  private checkAscDiagonalWin(lastPlayedCell: OccupiedCell): boolean {
    const diagonalRightDown = this.countToDirection(lastPlayedCell, DIRECTION.RightDown);
    const diagonalLeftUp = this.countToDirection(lastPlayedCell, DIRECTION.LeftUp);

    const ascDiagonalWin = diagonalRightDown + diagonalLeftUp + 1 >= Game.WIN_COUNT;
    return ascDiagonalWin;
  }

  private checkDescDiagonalWin(lastPlayedCell: OccupiedCell): boolean {
    const diagonalRightUp = this.countToDirection(lastPlayedCell, DIRECTION.RightUp);
    const diagonalLeftDown = this.countToDirection(lastPlayedCell, DIRECTION.LeftDown);

    const descDiagonalWin = diagonalRightUp + diagonalLeftDown + 1 >= Game.WIN_COUNT;
    return descDiagonalWin;
  }

  private checkVerticalWin(lastPlayedCell: OccupiedCell): boolean {
    const vertCountDown = this.countToDirection(lastPlayedCell, DIRECTION.Down);
    const vertCountUp = this.countToDirection(lastPlayedCell, DIRECTION.Up);

    return vertCountDown + vertCountUp + 1 >= Game.WIN_COUNT;
  }

  private checkHorizontalWin(lastPlayedCell: OccupiedCell): boolean {
    const leftCount = this.countToDirection(lastPlayedCell, DIRECTION.Left);
    const rightCount = this.countToDirection(lastPlayedCell, DIRECTION.Right);

    return leftCount + rightCount + 1 >= Game.WIN_COUNT;
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

  private isValidColumn(column: number) {
    return column <= this.board.columns && column >= 1;
  }

  private isValidRow(row: number) {
    return row <= this.board.rows && row >= 1;
  }
}
