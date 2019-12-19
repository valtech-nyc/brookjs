#!/usr/bin/env node
const path = require('path');
const { promises: fs } = require('fs');
const { create } = require('brookjs-cli');

async function main() {
  const app = create();

  const cmdPath = path.join(process.cwd(), 'commands');

  try {
    if (await fs.stat(cmdPath)) {
      app = app.loadCommandsFrom(cmdPath);
    }
  } catch {}

  const run = await app.run(process.argv.slice(2));

  let code;

  try {
    await run.waitUntilExit();
    code = 0;
  } catch (err) {
    code = err.code || 1;
  }

  process.exitCode = code;
}

main();
