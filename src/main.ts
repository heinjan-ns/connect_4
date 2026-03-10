import * as readline from 'readline';
import { Game, MoveResult } from './game';
import { Player } from './board';
import { HumanPlayer, RandomPlayer, PlayerStrategy } from './playerStrategy';

function main() {
  const game = new Game();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  showWelcome(game);

  rl.question('Random drop coins for player 2? (yes/no) ', (p2) => {
    const player1Strategy = new HumanPlayer(rl);
    const player2Strategy = p2.toLowerCase() === 'yes' ? new RandomPlayer() : new HumanPlayer(rl);

    rl.question(game.getPrompt(), () => {
      console.clear();
      gameLoop(game, rl, player1Strategy, player2Strategy);
    });
  });
}

export function gameLoop(
  game: Game,
  rl: readline.Interface,
  player1Strategy: PlayerStrategy,
  player2Strategy: PlayerStrategy,
  runOnce: boolean = false
) {
  let message: string = '';

  const promptMove = async () => {
    if (game.isGameOver()) {
      if (runOnce) {
        rl.close();
        return;
      }
      handlePlayAgain(rl);
      return;
    }

    showBoard(game, message);
    message = '';

    let strategy: PlayerStrategy;
    if (game.getCurrentPlayer() === Player.One) {
      strategy = player1Strategy;
      const answer = await strategy.getMove(game);
      message = processMove(game, answer, promptMove) || '';
      if (message) {
        promptMove();
      }
    } else {
      strategy = player2Strategy;
      const answer = await strategy.getMove(game);
      message = processMove(game, answer, promptMove) || '';
      if (message) {
        promptMove();
      }
    }
  };

  promptMove();
}

function processMove(game: Game, column: number, promptMove: () => void): string | void {
  const result = game.makeMove(column);

  if (!result.success) {
    return result.message!;
  }

  if (result.winner || result.isDraw) {
    showGameEnd(game, result);
  }

  promptMove();
}

function showGameEnd(game: Game, result: MoveResult) {
  if (result.winner) {
    showBoard(game, `Player ${result.winner} (${game.getCurrentPlayerCoin()}) has won`);
  }
  if (result.isDraw) {
    showBoard(game, `Game is a Draw - all positions filled!`);
  }
}

function handlePlayAgain(rl: readline.Interface) {
  rl.question('Do you want to play another game? (yes or no) ', (answer) => {
    if (answer.toLowerCase() === 'yes') {
      rl.question('Random drop coins for player 2? (yes/no) ', (p2) => {
        const player1Strategy = new HumanPlayer(rl);
        const player2Strategy =
          p2.toLowerCase() === 'yes' ? new RandomPlayer() : new HumanPlayer(rl);
        console.clear();
        gameLoop(new Game(), rl, player1Strategy, player2Strategy);
      });
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
