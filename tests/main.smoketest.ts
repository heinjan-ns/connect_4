// keep the console as clear as possible for the smoketest: don't output anything
console.log = () => {};
console.clear = () => {};

import { Writable } from 'stream';
import * as readline from 'readline';
import { gameLoop } from '../src/main';
import { Game } from '../src/game';
import { PlayerStrategy } from '../src/playerStrategy';

class FakePlayer implements PlayerStrategy {
  constructor(private moves: number[]) {}
  private moveIndex = 0;

  async getMove(): Promise<number> {
    if (this.moveIndex >= this.moves.length) {
      console.error('Smoketest failed: ran out of moves, game did not end');
      rl.close();
      process.exit(1);
    }

    return this.moves[this.moveIndex++];
  }
}

const output = new Writable({
  write(chunk, encoding, callback) {
    callback();
  },
});

const game = new Game();
const rl = readline.createInterface({ input: process.stdin, output });

rl.on('close', () => {
  if (game.isGameOver()) {
    console.info('Smoketest passed: game is over, whoohoo!');
    process.exit(0);
  } else {
    console.error('Smoketest failed: no winner, so something is wrong :(');
    process.exit(1);
  }
});

const player1 = new FakePlayer([1, 1, 1, 1]);
const player2 = new FakePlayer([2, 2, 2]);

const RUN_ONCE = true;
gameLoop(game, rl, player1, player2, RUN_ONCE);
