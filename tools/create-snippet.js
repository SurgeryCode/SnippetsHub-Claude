import fs from "fs";
import path from "path";
import minimist from "minimist";

const args = minimist(process.argv.slice(2));
const rawName = args.name || args.n || args._[0];
const rawSlug = args.slug || args.s || args._[1];
const prefix = "snh-";
const licenseLangRaw = (args["license-lang"] || args.licenseLang || args.license || "en")
  .toString()
  .trim()
  .toLowerCase();
const licenseLang = licenseLangRaw === "pl" ? "pl" : "en";

if (!rawName && !rawSlug) {
  console.error(
    "❌ Uzycie: node tools/create-snippet.js --name \"Countdown Bar\" [--slug countdown-bar] [--license pl|en]\n" +
      "   lub: node tools/create-snippet.js <name> [slug]"
  );
  process.exit(1);
}

const toKebab = (value) =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const toTitle = (value) =>
  value
    .toString()
    .trim()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/(^|\s)\S/g, (c) => c.toUpperCase());

const snippetName = rawName ? toTitle(rawName) : toTitle(rawSlug);
const snippetSlug = rawSlug ? toKebab(rawSlug) : toKebab(rawName);

if (!snippetSlug) {
  console.error("❌ Nie mozna ustalic slug snippetu.");
  process.exit(1);
}

const templateDir = path.resolve("tools/templates/snippet");
const licenseTemplatePath = path.resolve(
  "shared",
  "templates",
  licenseLang === "pl" ? "LICENSE_PL.template.md" : "LICENSE_EN.template.md"
);
const targetDir = path.resolve("snippets-list", snippetSlug);

if (!fs.existsSync(templateDir)) {
  console.error("❌ Brak szablonu: tools/templates/snippet");
  process.exit(1);
}

if (fs.existsSync(targetDir)) {
  console.error(`❌ Folder docelowy juz istnieje: ${targetDir}`);
  process.exit(1);
}

const replacements = [
  ["__SNIPPET_NAME__", snippetName],
  ["__SNIPPET_SLUG__", snippetSlug],
  ["__PREFIX__", prefix],
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function applyReplacements(content) {
  let output = content;
  for (const [from, to] of replacements) {
    output = output.split(from).join(to);
  }
  return output;
}

function copyTemplate(srcDir, destDir) {
  ensureDir(destDir);
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destName = applyReplacements(entry.name);
    const destPath = path.join(destDir, destName);

    if (entry.isDirectory()) {
      copyTemplate(srcPath, destPath);
    } else if (entry.isFile()) {
      const raw = fs.readFileSync(srcPath, "utf8");
      const content = applyReplacements(raw);
      fs.writeFileSync(destPath, content, "utf8");
    }
  }
}

copyTemplate(templateDir, targetDir);

if (fs.existsSync(licenseTemplatePath)) {
  const licenseRaw = fs.readFileSync(licenseTemplatePath, "utf8");
  fs.writeFileSync(path.join(targetDir, "LICENSE.md"), licenseRaw, "utf8");
} else {
  console.warn(`⚠️ Nie znaleziono szablonu licencji: ${licenseTemplatePath}`);
}

console.log("✅ Utworzono snippet:");
console.log(`- name: ${snippetName}`);
console.log(`- slug: ${snippetSlug}`);
console.log(`- path: ${targetDir}`);
