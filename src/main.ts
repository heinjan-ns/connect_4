import * as readline from 'readline';
import { Game, MoveResult } from './game';

function main() {
  const game = new Game();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  showWelcome(game);

  rl.question(game.getPrompt(), () => {
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

    rl.question(getInputColumnPrompt(game), (answer) => {
      message = processMove(game, parseInt(answer), promptMove);
    });
  };

  promptMove();
}

function processMove(game: Game, column: number, promptMove: () => void): string {
  const result = game.makeMove(column);

  if (!result.success) {
    promptMove();
    return result.message!;
  }

  if (result.winner || result.isDraw) {
    showGameEnd(game, result);
  }

  promptMove();
  return '';
}

function showGameEnd(game: Game, result: MoveResult) {
  if (result.winner) {
    showBoard(game, `Player ${result.winner} (${game.getCurrentPlayerCoin()}) has won`);
  }
  if (result.isDraw) {
    showBoard(game, `Game is a Draw - all positions filled!`);
  }
  return;
}
function getInputColumnPrompt(game: Game): string {
  return `Player ${game.getCurrentPlayer()} (${game.getCurrentPlayerCoin()}): Enter column (1 - ${game.board.columns}): `;
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
  console.log('\n');
}

main();
