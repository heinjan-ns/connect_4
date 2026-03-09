// Suppress all console output
console.log = () => {};
console.clear = () => {};

import { Readable, Writable } from 'stream';
import * as readline from 'readline';
import { gameLoop } from '../src/main';
import { Game } from '../src/game';

// Create fake stdin
const input = new Readable();
input.push('1\n'); // Player 1 move
input.push('2\n'); // Player 2 move
input.push('1\n'); // Player 1 move
input.push('2\n'); // Player 1 move
input.push('1\n'); // Player 1 move
input.push('2\n'); // Player 2 move
input.push('1\n'); // Player 1 move -> wins in column 1

input.push(null); // End stream

// Create fake stdout to suppress output
const output = new Writable({
  write(chunk, encoding, callback) {
    callback();
  },
});

const game = new Game();
const rl = readline.createInterface({ input, output });

// Listen for readline close event (game ends)
rl.on('close', () => {
  if (game.isGameOver()) {
    console.log('Smoketest passed: game is over, whoohoo!');
    process.exit(0);
  } else {
    console.error('Smoketest failed: no winner, so something is wrong :(');
    process.exit(1);
  }
});

try {
  gameLoop(game, rl);
} catch (error) {
  console.error('Smoketest failed:', error);
  process.exit(1);
}
