import { Readable } from 'stream';

const SEPARATOR = ' \t\n\v\f\r';

export default async function processStream(source: Readable): Promise<Result> {
  let bytes = 0;
  let lines = 0;
  let words = 0;

  let isWord = false;
  let previousNewLine = false;

  for await (const chunk of source) {
    bytes += chunk.length;
    let cursor = 0;

    while (cursor < chunk.length) {
      const char = String.fromCharCode(chunk[cursor]);

      if (!SEPARATOR.includes(char)) {
        isWord = true;
      } else if (isWord) {
        isWord = false;
        ++words;
      }

      if (['\n', '\r'].includes(char)) {
        if (previousNewLine) {
          previousNewLine = false;
          ++lines;
        } else {
          previousNewLine = true;

        }
      } else if (previousNewLine) {
        previousNewLine = false;
        ++lines;
      }
      ++cursor;
    }
  }

  if (isWord) {
    ++words;
  }

  return {
    bytes,
    lines: lines !== 0 ? lines : bytes > 0 ? 1 : 0,
    words,
    characters: bytes,
  };
}