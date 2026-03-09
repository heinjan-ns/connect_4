import { Board, Cell, Player, Coordinate } from './board';

type OccupiedCell = Coordinate & { playerCell: Cell };

enum Status {
  InProgress,
  Won,
  Draw,
}

type Direction = { row: number; column: number };
type DirectionPair = readonly [Direction, Direction];

const DIRECTION_PAIRS = {
  Horizontal: [
    { row: 0, column: -1 }, // Left
    { row: 0, column: 1 }, // Right
  ],
  Vertical: [
    { row: 1, column: 0 }, // Up (not used)
    { row: -1, column: 0 }, // Down
  ],
  DiagonalAscending: [
    { row: -1, column: -1 }, // LeftDown
    { row: 1, column: 1 }, // RightUp
  ],
  DiagonalDescending: [
    { row: 1, column: -1 }, // LeftUp
    { row: -1, column: 1 }, // RightDown
  ],
} as const satisfies Record<string, DirectionPair>;

type MoveResult = {
  success: boolean;
  message?: string;
  winner?: Player;
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

    let hasWin = false;

    for (const directionPair of Object.values(DIRECTION_PAIRS)) {
      if (this.checkWinInDirection(lastPlayedCell, directionPair)) {
        if (!hasWin) {
          // Only add center cell once, could be a win in multiple directions
          // TODO: no test for that one...
          this.winningCells.push(coordinate);
          hasWin = true;
        }
        this.getWinningCells(lastPlayedCell, directionPair);
      }
    }

    return hasWin;
  }

  private getWinningCells(lastPlayedCell: OccupiedCell, directionPair: DirectionPair): void {
    this.getWinningCellsInDirection(lastPlayedCell, directionPair[0]);
    this.getWinningCellsInDirection(lastPlayedCell, directionPair[1]);
    return;
  }

  private getWinningCellsInDirection(
    { column, row, playerCell }: OccupiedCell,
    direction: Direction
  ) {
    let rowToCheck = row + direction.row;
    let columnToCheck = column + direction.column;

    while (this.isValidRow(rowToCheck) && this.isValidColumn(columnToCheck)) {
      if (this.board.getCell({ row: rowToCheck, column: columnToCheck }) === playerCell) {
        this.winningCells.push({ row: rowToCheck, column: columnToCheck });
        rowToCheck += direction.row;
        columnToCheck += direction.column;
      } else {
        break;
      }
    }
  }

  private checkWinInDirection(lastPlayedCell: OccupiedCell, directionPair: DirectionPair): boolean {
    const countFirstDirection = this.countToDirection(lastPlayedCell, directionPair[0]);
    const countSecondDirection = this.countToDirection(lastPlayedCell, directionPair[1]);

    return countFirstDirection + countSecondDirection + 1 >= Game.WIN_COUNT;
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
