import * as readline from 'readline';
import { Game } from './game';

export interface PlayerStrategy {
  getMove(game: Game): Promise<number>;
}

export class HumanPlayer implements PlayerStrategy {
  constructor(private rl: readline.Interface) {}

  async getMove(game: Game): Promise<number> {
    return new Promise((resolve) => {
      const prompt = `Player ${game.getCurrentPlayer()} (${game.getCurrentPlayerCoin()}): Enter column (1 - ${game.board.columns}): `;

      this.rl.question(prompt, (answer) => {
        resolve(parseInt(answer));
      });
    });
  }
}

export class RandomPlayer implements PlayerStrategy {
  constructor() {}

  async getMove(game: Game): Promise<number> {
    const randomColumn = Math.floor(Math.random() * game.board.columns) + 1;
    return Promise.resolve(randomColumn);
  }
}
