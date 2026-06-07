import fs from "fs";
import path from "path";
import { zipSnippet } from "./utils/zip.js";
import { validateSnippet, reportValidation } from "./utils/validate-snippet.js";

const baseDir = path.resolve("snippets-list");
const outputDir = path.resolve("dist");
const strict = process.argv.includes("--strict");

const snippets = fs
  .readdirSync(baseDir)
  .filter((dir) => fs.statSync(path.join(baseDir, dir)).isDirectory());

console.log(`🚀 Buduje ${snippets.length} snippetow...`);

for (const name of snippets) {
  const snippetDir = path.join(baseDir, name);
  const validation = validateSnippet(snippetDir, { strict });
  reportValidation(name, validation, { strict });

  if (!validation.ok) {
    console.error(`\n❌ Pomijam build dla: ${name}`);
    if (strict) {
      console.error("\n❌ Build przerwany przez walidacje (strict).\n");
      process.exit(1);
    }
    continue;
  }

  await zipSnippet(snippetDir, outputDir);
}
