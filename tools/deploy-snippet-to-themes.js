import fs from "fs";
import path from "path";

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}
 
function copyDirRecursiveSync(src, dest) {
  ensureDirSync(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursiveSync(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyIfExists(srcBase, destBase, subfolder, label) {
  const srcPath = path.join(srcBase, subfolder);
  if (fs.existsSync(srcPath) && fs.statSync(srcPath).isDirectory()) {
    const destPath = path.join(destBase, subfolder);
    ensureDirSync(destPath);
    copyDirRecursiveSync(srcPath, destPath);
    console.log(`✅ Skopiowano ${label} -> ${destPath}`);
    return true;
  }
  return false;
}

async function main() {
  const args = process.argv.slice(2);
  const snippetName = args[0];
  const targetArg = args[1]; // opcjonalnie: nazwa motywu lub lista nazw (rozdzielona przecinkami)

  if (!snippetName) {
    console.error(
      "❌ Użycie: node tools/deploy-snippet-to-themes.js <snippet-name> [<theme-name>|<theme1,theme2>|all]"
    );
    process.exit(1);
  }

  const repoRoot = process.cwd();
  const snippetDir = path.resolve(repoRoot, "snippets-list", snippetName);
  const themesRoot = path.resolve(repoRoot, "shopify-themes");

  if (!fs.existsSync(snippetDir)) {
    console.error(`❌ Snippet '${snippetName}' nie istnieje w 'snippets-list'.`);
    process.exit(1);
  }
  if (!fs.existsSync(themesRoot)) {
    console.error("❌ Nie znaleziono folderu 'shopify-themes'.");
    process.exit(1);
  }

  // Zbierz wszystkie dostępne motywy
  const allThemeEntries = fs
    .readdirSync(themesRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith("."));

  let selectedThemeNames;
  if (!targetArg || targetArg === "all") {
    selectedThemeNames = allThemeEntries.map((e) => e.name);
  } else {
    const requested = targetArg
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const available = new Set(allThemeEntries.map((e) => e.name));
    const missing = requested.filter((name) => !available.has(name));
    if (missing.length) {
      console.error(
        `❌ Nie znaleziono motywów: ${missing.join(", ")} w 'shopify-themes'. Dostępne: ${[...available].join(", ")}`
      );
      process.exit(1);
    }
    selectedThemeNames = requested;
  }

  const themeDirs = selectedThemeNames.map((name) => path.join(themesRoot, name));

  if (themeDirs.length === 0) {
    console.warn("⚠️ Brak motywów w 'shopify-themes'.");
    process.exit(0);
  }

  console.log(
    `🚀 Deploy snippetu '${snippetName}' do ${themeDirs.length} motywów: ${selectedThemeNames.join(", ")}`
  );

  for (const themePath of themeDirs) {
    const themeName = path.basename(themePath);
    console.log(`\n➡️  Motyw: ${themeName}`);

    copyIfExists(snippetDir, themePath, "assets", "assets");

    const copiedBlocks =
      copyIfExists(snippetDir, themePath, "blocks", "blocks") ||
      copyIfExists(snippetDir, themePath, "block", "block");
    if (!copiedBlocks) {
      // brak katalogu blocks/block w źródle – to OK
    }

    copyIfExists(snippetDir, themePath, "snippets", "snippets");

    // dodatkowe standardowe katalogi Shopify
    const extraFolders = ["sections", "templates", "layout", "locales", "config"];
    for (const folder of extraFolders) {
      copyIfExists(snippetDir, themePath, folder, folder);
    }
  }

  console.log("\n✅ Zakończono deploy plików do motywów.");
}

main().catch((err) => {
  console.error("❌ Błąd podczas deployu:", err);
  process.exit(1);
});
