#!/usr/bin/env node
// Assembles src/ into one self-contained HTML file. No dependencies.
//   node scripts/build.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

const meta = JSON.parse(read('src/meta.json'));
const stamp = (s) => s.replaceAll('{{VERSION}}', meta.version).replaceAll('{{DATE}}', meta.date);

const css = stamp(read('src/styles.css')).trimEnd();
const data = stamp(read('src/data.js')).trimEnd();
const app = stamp(read('src/app.js')).trimEnd();

for (const [name, code] of [['data.js', data], ['app.js', app]]) {
  if (/<\/script/i.test(code)) {
    console.error(`build: ${name} contains a closing script tag, which would end the inline script early`);
    process.exit(1);
  }
}

// Function replacers keep "$" sequences in the sources from being read as replacement patterns.
const html = stamp(read('src/index.template.html'))
  .replace('/*__CSS__*/', () => css)
  .replace('/*__DATA__*/', () => data)
  .replace('/*__APP__*/', () => app);

if (/\/\*__[A-Z]+__\*\/|\{\{[A-Z]+\}\}/.test(html)) {
  console.error('build: an unfilled placeholder is left in the output');
  process.exit(1);
}

const out = `${meta.file}-${meta.version}.html`;
mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist', out), html);
writeFileSync(join(root, 'index.html'), html);

const lines = html.split('\n').length;
console.log(`build: dist/${out} and index.html written (${lines} lines, ${(Buffer.byteLength(html) / 1024).toFixed(1)} KB)`);
