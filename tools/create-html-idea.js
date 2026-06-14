/**
 * create-html-idea.js
 * Tworzy nowy projekt w HTML-clear-ideas/ z _TEMPLATE.
 * Zamienia placeholdery __IDEA_SLUG__ i __IDEA_NAME__ na podstawie podanego sluga.
 *
 * Użycie:
 *   npm run create:idea -- --slug cart-drawer
 *   npm run create:idea -- --slug cart-drawer --name "Cart Drawer"
 */

import fs from 'fs';
import path from 'path';
import minimist from 'minimist';

const args = minimist(process.argv.slice(2));
const rawSlug = args.slug || args.s || args._[0];
const rawName = args.name || args.n || null;

if (!rawSlug) {
  console.error(
    '❌ Użycie: npm run create:idea -- --slug cart-drawer [--name "Cart Drawer"]'
  );
  process.exit(1);
}

/* --- Helpers --- */
const toKebab = (value) =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const toTitle = (value) =>
  value
    .toString()
    .trim()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/(^|\s)\S/g, (c) => c.toUpperCase());

const ideaSlug = toKebab(rawSlug);
const ideaName = rawName ? rawName.trim() : toTitle(rawSlug);
const ideaDate = new Date().toISOString().split('T')[0];

if (!ideaSlug) {
  console.error('❌ Nieprawidłowy slug.');
  process.exit(1);
}

/* --- Paths --- */
const templateDir = path.resolve('HTML-clear-ideas/_TEMPLATE');
const targetDir   = path.resolve('HTML-clear-ideas', ideaSlug);
const statusFile  = path.resolve('HTML-clear-ideas/STATUS.md');

if (!fs.existsSync(templateDir)) {
  console.error(`❌ Brak szablonu: ${templateDir}`);
  process.exit(1);
}

if (fs.existsSync(targetDir)) {
  console.error(`❌ Projekt już istnieje: ${targetDir}`);
  process.exit(1);
}

/* --- Replacements --- */
const replacements = [
  ['__IDEA_SLUG__', ideaSlug],
  ['__IDEA_NAME__', ideaName],
  ['__IDEA_DATE__', ideaDate],
];

function applyReplacements(content) {
  let out = content;
  for (const [from, to] of replacements) {
    out = out.split(from).join(to);
  }
  return out;
}

function copyTemplate(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath  = path.join(srcDir, entry.name);
    const destName = applyReplacements(entry.name);
    const destPath = path.join(destDir, destName);

    if (entry.isDirectory()) {
      copyTemplate(srcPath, destPath);
    } else if (entry.isFile()) {
      const raw     = fs.readFileSync(srcPath, 'utf8');
      const content = applyReplacements(raw);
      fs.writeFileSync(destPath, content, 'utf8');
    }
  }
}

/* --- Copy template --- */
copyTemplate(templateDir, targetDir);

/* --- Update HTML-clear-ideas/STATUS.md --- */
if (fs.existsSync(statusFile)) {
  const status = fs.readFileSync(statusFile, 'utf8');
  const newRow = `| ${ideaSlug} | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |`;
  const updated = status.replace(
    '| *(brak projektów)* | — | — | — | — | — | — |',
    newRow
  );

  /* Jeśli placeholder już zastąpiony — dodaj wiersz przed ostatnim | w tabeli */
  if (updated === status) {
    const tableEnd = status.lastIndexOf('| *(dodaj projekty)*');
    if (tableEnd === -1) {
      const lines   = status.split('\n');
      const tblIdx  = lines.findIndex((l) => l.startsWith('| Projekt'));
      if (tblIdx !== -1) {
        lines.splice(tblIdx + 2, 0, newRow);
        fs.writeFileSync(statusFile, lines.join('\n'), 'utf8');
      }
    }
  } else {
    fs.writeFileSync(statusFile, updated, 'utf8');
  }
}

/* --- Done --- */
console.log('✅ Projekt utworzony:');
console.log(`   name : ${ideaName}`);
console.log(`   slug : ${ideaSlug}`);
console.log(`   path : ${targetDir}`);
console.log('');
console.log('Następny krok: wypełnij CLAUDE.md i PRD.md, zacznij od index.html (v1).');
