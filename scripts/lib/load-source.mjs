import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "../..");
const nativeRequire = createRequire(path.join(root, "package.json"));

// Execute source modules in Node tests without changing the application's
// bundler aliases or adding a second runtime dependency.
export function sourceLoader() {
  const cache = new Map();
  function load(relative) {
    const file = path.resolve(root, relative);
    if (!file.startsWith(root + path.sep)) throw new Error("Source path escaped the project.");
    if (cache.has(file)) return cache.get(file).exports;
    const sourceModule = { exports: {} }; cache.set(file, sourceModule);
    const output = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
    const require = id => {
      if (id.startsWith("@/")) return load(`src/${id.slice(2)}.ts`);
      if (id.startsWith(".")) return load(path.relative(root, path.resolve(path.dirname(file), id + ".ts")));
      return nativeRequire(id);
    };
    vm.runInNewContext(output, { module: sourceModule, exports: sourceModule.exports, require, process, Buffer, URL, AbortSignal, setTimeout, clearTimeout, console }, { filename: file });
    return sourceModule.exports;
  }
  return load;
}

export { root };
