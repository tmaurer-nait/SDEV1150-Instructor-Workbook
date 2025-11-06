import sayGB, { getName, square, sayHello } from "./utils.js";
import chalk from "chalk";
import figlet from "figlet";

console.log("hello hello, welcome to js without a browser");

console.log(getName());
console.log(square(4));
sayHello("tom");
sayGB("tom");

console.log(chalk.cyan("Hello World, this is cyan chalk"));
console.log(chalk.bgGreen("Hello, bgGreen here!"));

console.log(chalk.magenta(figlet.textSync("NPM IS SUPER COOL")));
