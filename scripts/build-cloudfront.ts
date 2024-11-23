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

  const tsFiles = findTypeScriptFiles(sourceDir);

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
      results = results.concat(findTypeScriptFiles(filePath));
    } else if (file.endsWith(".ts")) {
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

  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, output);
}

buildCloudFrontFunctions();
