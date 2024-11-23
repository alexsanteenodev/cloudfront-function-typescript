import * as ts from "typescript";
import * as fs from "fs";
import * as path from "path";
import {
  removeExportTransformerFactory,
  remove__esModuleFactory,
} from "./typescriptRemoveExports";

const compilerOptions: ts.CompilerOptions = {
  module: ts.ModuleKind.None,
  target: ts.ScriptTarget.ES5,
  strict: true,
  removeComments: true,
  lib: ["es5"],
};

function buildCloudFrontFunctions() {
  const sourceDir = path.join(__dirname, "../src/");
  const outputDir = path.join(__dirname, "../dist/src");

  // Recursively find all .ts files
  const tsFiles = findTypeScriptFiles(sourceDir);

  // Process each file
  tsFiles.forEach((sourcePath) => {
    const relativePath = path.relative(sourceDir, sourcePath);
    const outputPath = path.join(outputDir, relativePath.replace(".ts", ".js"));

    transpileAndSaveFile(sourcePath, outputPath);
  });
}

function findTypeScriptFiles(dir: string): string[] {
  let results: string[] = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively search directories
      results = results.concat(findTypeScriptFiles(filePath));
    } else if (file.endsWith(".ts")) {
      // Add TypeScript files
      results.push(filePath);
    }
  });

  return results;
}

function transpileAndSaveFile(sourcePath: string, outputPath: string) {
  const sourceText = fs.readFileSync(sourcePath, "utf-8");

  const output = ts.transpileModule(sourceText, {
    compilerOptions,
    transformers: {
      before: [removeExportTransformerFactory],
      after: [remove__esModuleFactory],
    },
  }).outputText;

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, output);
}

buildCloudFrontFunctions();
