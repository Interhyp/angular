import {task} from "fuse-box/sparky";

const registeredModules: string[] = [
  'thousands-separator',
];
const MODULES_ROOT: string = "/packages";
const NG_PACKAGE_PATH: string = "/src/ng-package.json";

task("default", async() => {

});

task("clean-all", () => {
  console.log("cleaning-all");
  console.log(process.argv[process.argv.length - 1]);
});

task("build-module", () => {

});

task("build-all", () => {

});
