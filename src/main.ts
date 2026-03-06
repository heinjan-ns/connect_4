import * as promptSync from 'prompt-sync';
import { Game } from './game';

function main() {
  const game = new Game();
  const input = promptSync.default({ sigint: true }); // you can exit with ctrl-c

  showWelcome(game);
  input(''); // Wait for Enter key

  console.clear();
  gameLoop(game, input);
}

function gameLoop(game: Game, input: promptSync.Prompt) {
  while (!game.isGameOver()) {
    console.log(game.board.consoleOutput());
    const column = parseInt(input(`Player ${game.getCurrentPlayer()}: Enter column (1-7): `));
    const result = game.makeMove(column);
    console.clear();

    if (!result.success) {
      console.log(game.board.consoleOutput());
      console.log(result.message);
    }

    if (result.winner) {
      console.log(game.board.consoleOutput());
      console.log(`Player ${result.winner} has won`);
    }
  }
}

function showWelcome(game: Game) {
  console.clear();
  console.log(game.getWelcomeMessage());
  console.log(game.getRules().join('\n'));
  console.log(game.getPrompt());
}

main();
