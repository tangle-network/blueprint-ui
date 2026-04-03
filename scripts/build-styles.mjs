import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGenerator } from 'unocss';
import unoConfig from '../uno.config.mjs';

const rootDir = dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
const srcDir = join(rootDir, 'src');
const distDir = join(rootDir, 'dist');
const baseCssPath = join(srcDir, 'styles.css');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return [fullPath];
  }));

  return files.flat();
}

const sourceFiles = await walk(srcDir);
const sourceTexts = await Promise.all(
  sourceFiles
    .filter((file) => ['.ts', '.tsx', '.js', '.jsx'].includes(extname(file)))
    .map((file) => readFile(file, 'utf8')),
);

const uno = await createGenerator(unoConfig);
const { css } = await uno.generate(sourceTexts.join('\n'), {
  preflights: false,
  minify: false,
});

const baseCss = await readFile(baseCssPath, 'utf8');

await mkdir(distDir, { recursive: true });
await writeFile(join(distDir, 'styles.css'), `${baseCss}\n\n${css}`);
