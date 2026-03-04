import * as promptSync from 'prompt-sync';
import { Game } from './game';

function main() {
  const game = new Game();
  const input = promptSync.default({ sigint: true }); // you can exit with ctrl-c

  console.clear();
  console.log(game.getWelcomeMessage());
  console.log(game.getRules().join('\n'));
  console.log(game.getPrompt());

  // Wait for key press, then show board
  process.stdin.once('data', () => {
    game.start();
    process.exit(0); // for now: exit after showing the board
  });

  while (true) {
    console.log(game.board.consoleOutput());
    const inputString = 'Player ' + game.getCurrentPlayer() + ': Enter colum (1-7): ';
    const column = parseInt(input(inputString));
    const result = game.makeMove(column);
    console.clear();

    if (!result.success) {
      console.log(result.message);
    }

    if (result.winner) {
      console.log(result.message);
    }

    if (column === 0 || game.isGameOver()) {
      console.log(game.board.consoleOutput());
      process.exit(0);
    }
  }
}

main();
