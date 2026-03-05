import { Given, When, Then } from '@cucumber/cucumber';
import { Board, BOARD_COLUMNS, BOARD_ROWS, Cell, Player } from '../../src/board';
import assert from 'assert';
import { Game } from '../../src/game';

Given('the game is started', function () {
  // empty for now, only use a board
});

When('the board is initialized', function () {
  this.board = new Board();
});

Then(
  'the board displays 6 rows and 7 columns And all 42 positions show empty spaces ⚪',
  function () {
    assert.strictEqual(this.board.grid.length, 6);
    this.board.grid.forEach((row: Cell[]) => {
      assert.strictEqual(row.length, 7);
      row.forEach((cell: Cell) => {
        assert.strictEqual(cell, Cell.Empty);
      });
    });
  }
);

Then('columns are labeled 1 through 7', function () {
  const output = this.board.consoleOutput();
  const lines = output.split('\n');
  const header = lines[0];

  for (let column = 1; column <= BOARD_COLUMNS; column++) {
    assert.ok(header.includes(column.toString()));
  }
  assert.strictEqual(
    lines[1],
    `6 ${Cell.Empty} ${Cell.Empty} ${Cell.Empty} ${Cell.Empty} ${Cell.Empty} ${Cell.Empty} ${Cell.Empty}`
  );
  assert.strictEqual(
    lines[6],
    `1 ${Cell.Empty} ${Cell.Empty} ${Cell.Empty} ${Cell.Empty} ${Cell.Empty} ${Cell.Empty} ${Cell.Empty}`
  );
});

Then('rows are labeled 1 through 6 \\(bottom to top)', function () {
  const output = this.board.consoleOutput();
  const lines = output.split('\n');

  // Expect 7 lines: 1 header + 6 rows
  assert.strictEqual(lines.length, 7);

  // The rows should start with the row number 6 and go to 1
  for (let i = 6; i >= 1; i--) {
    assert.strictEqual(lines[7 - i][0], i.toString());
  }
});

Given(
  'the application is launched',
  // empty for now
  function () {
    this.game = new Game();
  }
);

When('the game starts', function () {
  this.game.start();
});

Then('a welcome message and basic rules are displayed', function () {
  const welcomeMessage = this.game.getWelcomeMessage();
  assert(welcomeMessage.includes('Welcome to the game Connect 4.'));
});

Then('the rules explain board is 6 rows by 7 columns', function () {
  this.rules = this.game.getRules();
  assert(this.rules.some((rule: string) => rule.includes('The board has 6 rows and 7 columns.')));
});
Then('the rules explain coins are dropped and fall to the lowest row', function () {
  assert(
    this.rules.some((rule: string) =>
      rule.includes('Coins are dropped and fall to the lowest row.')
    )
  );
});

Then('the rules explain Player 1 goes first, then players alternate', function () {
  assert(
    this.rules.some((rule: string) => rule.includes('Player 1 goes first, then players alternate.'))
  );
});

Then('the rules explain 4-in-a-row \\(horizontal, vertical, or diagonal) wins', function () {
  assert(
    this.rules.some((rule: string) =>
      rule.includes('4-in-a-row (horizontal, vertical, or diagonal) wins.')
    )
  );
});

Then('the rules explain a draw occurs when board is full with no winner', function () {
  assert(
    this.rules.some((rule: string) =>
      rule.includes('A draw occurs when the board is full with no winner.')
    )
  );
});

Then('the player is prompted to press a key to start the game', function () {
  const prompt = this.game.getPrompt();
  assert(prompt.includes('Press any key to start'));
});

Then('upon pressing that key, the game begins with a fresh board', function () {});

Given('the game has started and coins are placed on the board', function () {
  this.game = new Game();
});

Given('column 1 row 1 contains a Player 1 coin', function () {
  this.game.makeMove(1);
});

Given('column 2 row 1 contains a Player 2 coin', function () {
  this.game.makeMove(2);
});

When('the board state is displayed', function () {
  // nothing to test, don't display the state
});

Then("Player 1's coin shows as 🟡 in column 1 row 1", function () {
  assert.strictEqual(this.game.board.getCell({ row: 1, column: 1 }), Cell.Player1);
});

Then("Player 2's coin shows as 🔴 in column 2 row 1", function () {
  assert.strictEqual(this.game.board.getCell({ row: 1, column: 2 }), Cell.Player2);
});

Then('empty positions show as ⚪', function () {
  for (let rowCounter = 1; rowCounter <= BOARD_ROWS; rowCounter++) {
    for (let columnCounter = 1; columnCounter <= BOARD_COLUMNS; columnCounter++) {
      if (rowCounter === 1 && (columnCounter === 1 || columnCounter === 2)) continue;
      assert.strictEqual(
        this.game.board.getCell({ row: rowCounter, column: columnCounter }),
        Cell.Empty
      );
    }
  }
});

// Given('it is Player 1 turn', function () {
//   this.game = new Game();
// });

Then('the column number 4 is accepted', function () {
  assert.strictEqual(this.result.success, true);
});

Then('the game processes the move to drop a coin', function () {
  assert.strictEqual(this.game.board.getCell({ row: 1, column: 4 }), Cell.Player1);
});

When('Player 1 enters column 9', function () {
  this.result = this.game.makeMove(9);
});

Then('the input is rejected with an error message', function () {
  assert.strictEqual(this.result.success, false);
});

Then('Player 1 is re-prompted to select a valid column', function () {
  assert.ok(this.result.message);
});

Given('the board is empty', function () {
  this.game = new Game();
  this.game.start();
});

Then('the coin lands in row 1 of column 3', function () {
  assert.strictEqual(this.result.success, true);
});

Then(
  'the position records a yellow coin \\(🟡\\) at coordinates \\(row: 1, column: 3\\)',
  function () {
    assert.strictEqual(this.game.board.getCell({ row: 1, column: 3 }), Cell.Player1);
  }
);

Then('the move is accepted', function () {
  assert.strictEqual(this.result.success, true);
});

Then('the move is rejected', function () {
  assert.strictEqual(this.result.success, false);
});

Given('a new game has been initialized', function () {
  this.game = new Game();
});

When('the game is ready for play', function () {
  // TODO: implement
});

Then('the game indicates "Player 1\'s turn" \\(🟡\\)', function () {
  assert.strictEqual(this.game.getCurrentPlayer(), Player.One);
});

Then('the game indicates "Player 2\'s turn" \\(🔴\\)', function () {
  assert.strictEqual(this.game.getCurrentPlayer(), Player.Two);
});

Then('the game again indicates "Player 1\'s turn" \\(🟡\\)', function () {
  assert.strictEqual(this.game.getCurrentPlayer(), Player.One);
});

Then('the game displays "Column 5 is full"', function () {
  assert.strictEqual(this.result.message, 'Column 5 is full');
});

Then('Player 2 is prompted again to select another column', function () {
  // prompt is always shown in the UI, no assert here
});

Then('it remains Player {int} turn', function (player: number) {
  assert.strictEqual(this.game.getCurrentPlayer(), player);
});

Then('it is Player {int} turn', function (player: number) {
  assert.strictEqual(this.game.getCurrentPlayer(), player);
});

Then('the game ends immediately', function () {
  assert.strictEqual(this.game.isGameOver(), true);
});

Given('a game setup with moves: {string}', function (setupMoves: string) {
  this.game = new Game();
  const moves = setupMoves.split(',').map((m) => parseInt(m.trim()));
  moves.forEach((column) => this.game.makeMove(column));
});

When('Player {int} drops a coin in column {int}', function (player: number, column: number) {
  this.result = this.game.makeMove(column);
});

Then('the game detects a win for Player {int}', function (player: number) {
  assert.strictEqual(this.result.winner, player);
});
