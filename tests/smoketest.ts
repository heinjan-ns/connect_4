import { Game } from '../src/game';

const game = new Game();
const moves = [1, 2, 1, 2, 1, 2, 1]; // player 1 wins

for (const column of moves) {
  const result = game.makeMove(column);
  if (result.winner) {
    console.log(`Smoke test passed: we have a winner`);
    process.exit(0);
  }
}

if (!game.isGameOver()) {
  console.log('Smoke test failed: game is not over');
  process.exit(1);
}

console.log('Smoketest failed: somehow we do not have a winner, but the game is over');
process.exit(1);
