import fs from "fs";
import path from "path";
import { zipSnippet } from "./utils/zip.js";
import { validateSnippet, reportValidation } from "./utils/validate-snippet.js";

const args = process.argv.slice(2);
const snippetName = args[0];
const strict = args.includes("--strict");

if (!snippetName) {
  console.error("❌ Podaj nazwe snippetu: npm run build <snippet-name>");
  process.exit(1);
}

const snippetDir = path.resolve("snippets-list", snippetName);
const outputDir = path.resolve("dist");

if (!fs.existsSync(snippetDir)) {
  console.error(`❌ Snippet ${snippetName} nie istnieje.`);
  process.exit(1);
}

const validation = validateSnippet(snippetDir, { strict });
reportValidation(snippetName, validation, { strict });

if (!validation.ok) {
  console.error("\n❌ Build przerwany przez walidacje.");
  console.error("Tip: uruchom bez --strict aby tylko ostrzec.");
  process.exit(1);
}

// Można tu dodać bundlowanie (np. esbuild lub rollup)
// Na start — po prostu ZIP całego folderu
await zipSnippet(snippetDir, outputDir);
