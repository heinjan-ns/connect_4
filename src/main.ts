import * as readline from 'readline';
import { Game } from './game';
import { Coordinate } from './board';

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
      rl.close();
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
          showWinningBoard(
            game,
            `Player ${result.winner} (${game.getCurrentPlayerCoin()}) has won`,
            result.winningCells!
          );
          rl.close();
          return;
        }

        if (result.isDraw) {
          showBoard(game, `Game is a Draw - all positions filled!`);
          rl.close();
          return;
        }

        promptMove();
      }
    );
  };

  promptMove();
}

function showBoard(game: Game, message = '') {
  console.clear();
  console.log(game.board.consoleOutput());
  if (message) {
    console.log(`\n${message}\n`);
  }
}

function showWinningBoard(game: Game, message = '', coordinate: Coordinate) {
  console.clear();
  console.log(game.board.consoleOutputWinner(coordinate));
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
