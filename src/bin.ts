#!/usr/bin/env node

import { pipeline } from 'node:stream/promises';
import { getMessage, getOptions, getStream } from './io';
import processStream from '.';

(async function wc() {
  const options = getOptions();
  const result = await pipeline(getStream(options), processStream);

  console.log(getMessage(options, result));
})();