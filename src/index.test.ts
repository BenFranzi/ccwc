import { pipeline } from 'node:stream/promises';
import { createReadStream } from 'node:fs';
import solution from '.';

const testFile = './test.txt';
// expected lines: 7145, words: 58164, bytes/characters: 342190 test.txt

describe(solution, () => {
  it('should count the number of bytes, lines, words, characters', async () => {
    const result = await pipeline(
      createReadStream(testFile),
      solution,
    );

    console.log(result);
    expect(result.bytes).toBe(342190);
    expect(result.lines).toBe(7145);
    expect(result.words).toBe(58164);
    expect(result.characters).toBe(342190);
  });
});
