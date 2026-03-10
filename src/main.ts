import * as readline from 'readline';
import { Game } from './game';

function main() {
  const game = new Game();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  showWelcome(game);

  rl.question('', () => {
    console.clear();
    gameLoop(game, rl);
  });
}

export function gameLoop(game: Game, rl: readline.Interface) {
  let message: string = '';

  const promptMove = () => {
    if (game.isGameOver()) {
      handlePlayAgain(rl);
      return;
    }

    showBoard(game, message);
    message = '';

    rl.question(
      `Player ${game.getCurrentPlayer()} (${game.getCurrentPlayerCoin()}): Enter column (1 - ${game.board.columns}): `,
      (answer) => {
        const column = parseInt(answer);
        const result = game.makeMove(column);

        if (!result.success) {
          message = result.message!;
          promptMove();
          return;
        }

        if (result.winner) {
          showBoard(game, `Player ${result.winner} (${game.getCurrentPlayerCoin()}) has won`);
          promptMove();
          return;
        }

        if (result.isDraw) {
          showBoard(game, `Game is a Draw - all positions filled!`);
          promptMove();
          return;
        }

        promptMove();
      }
    );
  };

  promptMove();
}

function handlePlayAgain(rl: readline.Interface) {
  rl.question('Do you want to play another game? (yes or no) ', (answer) => {
    if (answer.toLowerCase() === 'yes') {
      gameLoop(new Game(), rl);
    } else {
      rl.close();
    }
  });
}

function showBoard(game: Game, message = '') {
  console.clear();
  console.log(game.board.consoleOutput(game.isGameOver() ? game.winningCells : []));
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
