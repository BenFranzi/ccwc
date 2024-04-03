import { access } from 'node:fs/promises';
import { constants, ReadStream } from 'fs';
import { createReadStream } from 'node:fs';

export function getStream(options: Options): ReadStream | NodeJS.ReadStream {
  if (!options.file && !process.stdin.isTTY) {
    return process.stdin;
  }

  if (!options.file || !exists(options.file)) {
    exitWithError(`file ${options.file} is not valid`);
  }

  return createReadStream(options.file);
}

export function getOptions(): Options {
  const args = process.argv.slice(2, -1);
  const options: Options = { c: false, l: false, w: false, m: false, file: undefined };

  for (const arg of args) {
    if (arg === '-c') options.c = true;
    if (arg === '-l') options.l = true;
    if (arg === '-w') options.w = true;
    if (arg === '-m') options.m = true;
    if (!/^-(c|l|w|m)$/.test(arg)) {exitWithError(`Illegal option ${arg}`);}
  }

  options.file = process.argv.length > 2 && !/^-(c|l|w|m)$/.test(process.argv.at(-1))
        ? process.argv.at(-1)
        : undefined;

  return options;
}

export function getMessage(options: Options, result: Result): string {
  const noFlags = !(options.c && options.l && options.w && options.m);

  let message = '';

  if (options.l || noFlags) {message += `${result.lines}`.padStart(8);}
  if (options.w || noFlags) {message += `${message ? ' ' : ''}${result.words}`.padStart(8);}
  if (options.c || noFlags) {message += `${message ? ' ' : ''}${result.bytes}`.padStart(8);}
  if (options.m) {message += `${message ? ' ' : ''}${result.characters}`.padStart(8);}
  if (options.file) {message += `${message ? ' ' : ''}${options.file}`.padStart(8);}

  return message;
}

async function exists(file: string): Promise<boolean> {
  return access(file, constants.R_OK)
    .then(() => true)
    .catch(() => false)
}

function exitWithError(message: string): void {
  console.error(message);
  process.exit(1);
}