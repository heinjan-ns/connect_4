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

export function gameLoop(game: Game, input: promptSync.Prompt) {
  let message: string = '';
  while (!game.isGameOver()) {
    showBoard(game, message);
    message = '';

    const column = parseInt(
      input(
        `Player ${game.getCurrentPlayer()} (${game.getCurrentPlayerCoin()}): Enter column (1 - ${game.board.columns}): `
      )
    );
    const result = game.makeMove(column);

    if (!result.success) {
      message = result.message!;
      continue;
    }

    if (result.winner) {
      showBoard(game, `Player ${result.winner} (${game.getCurrentPlayerCoin()}) has won`);
    }

    if (result.isDraw) {
      showBoard(game, `Game is a Draw - all positions filled!`);
    }
  }
}

function showBoard(game: Game, message = '') {
  console.clear();
  console.log(game.board.consoleOutput());
  if (message) {
    console.log(`\n${message}\n`);
  }
}

function showWelcome(game: Game) {
  console.clear();
  console.log(game.getWelcomeMessage());
  console.log(game.getRules().join('\n'));
  console.log(game.getPrompt());
}

main();
