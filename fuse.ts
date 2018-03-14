import { task } from "fuse-box/sparky";
import { ngPackagr } from "ng-packagr";

const registeredModules: string[] = [
  'ih-thousands-separator',
  'another-thousands-separator'
];

const MODULES_ROOT_PATH: string = "./packages/";
const NG_PACKAGE_PATH: string = "/package.json";

const AVAILABLE_TASKS = {
  BUILD_MODULE: "build-module",
  BUILD_ALL_MODULES: "build-all-modules"
};

task("clean-all", () => {
  console.log("cleaning-all");
  console.log(process.argv[process.argv.length - 1]);
});

task(AVAILABLE_TASKS.BUILD_MODULE, async() => {
  let moduleName: string = process.argv[process.argv.length - 1];
  let moduleIsRegistered: boolean = registeredModules
    .some(registeredModuleName => registeredModuleName === moduleName);

  if (!moduleIsRegistered) {
    throw new Error(`This module is not registered.`);
  } else if (moduleName === "build-module") {
    throw new Error("No module name provided.");
  }

  await ngPackagr()
    .forProject(MODULES_ROOT_PATH + moduleName + NG_PACKAGE_PATH)
    .build()
    .then(() => {
      console.info(`Bundled module: '${moduleName}'`);
    });
});

task(AVAILABLE_TASKS.BUILD_ALL_MODULES, () => {
  registeredModules.forEach( (moduleName: string) => {
    return ngPackagr().forProject(MODULES_ROOT_PATH + moduleName + NG_PACKAGE_PATH)
      .build()
      .then( () => {
        console.info(`Bundled module: '${moduleName}'`)
      })
  });
});
