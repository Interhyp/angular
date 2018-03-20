import { task } from "fuse-box/sparky";
import { ngPackagr } from "ng-packagr";
import * as fs from "fs";
import * as path from "path";

const MODULES_ROOT_PATH: string = "./packages/";
const PACKAGE_JSON_PATH: string = "/package.json";
const DIST_PATH: string = "/dist";

const TASK = {
  BUILD_MODULE: "build-module",
  BUILD_ALL_MODULES: "build-all-modules"
};

const allModules: Function = (modulesRootPath: string) => fs
  .readdirSync(modulesRootPath)
  .filter(file => fs.statSync(path.join(modulesRootPath, file)).isDirectory());

const buildPackage: Function = (moduleName: string) => {
  return ngPackagr()
    .forProject(MODULES_ROOT_PATH + moduleName + PACKAGE_JSON_PATH)
    .build()
    .then(() => {
      console.info(`Bundled module: '${moduleName}'`);
    });
};

task(TASK.BUILD_MODULE, async() => {
  let moduleName: string = process.argv[process.argv.length - 1];
  if (moduleName === "build-module") {
    throw new Error("No module name provided.");
  }

  await buildPackage(moduleName);
});

task(TASK.BUILD_ALL_MODULES, () => {
  allModules(MODULES_ROOT_PATH).forEach( (moduleName: string) => {
    return buildPackage(moduleName);
  });
});
