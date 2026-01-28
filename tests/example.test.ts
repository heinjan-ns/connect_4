import { describe, it, expect } from 'vitest';

describe('FunctionShould', () => {
  it('return 2 on input 1', () => {
    const input = 1;
    const result = input * 2;

    const resultExpected = 2;

    expect(result).toEqual(resultExpected);
  });
});
