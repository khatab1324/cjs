#!/usr/bin/env node

const chokidar = require("chokidar");
const debounce = require("lodash.debounce");
const chalk = require("chalk");
const program = require("caporal"); //we call it program because we will reseve object that represent to program
const fs = require("fs");
const fsPromises = fs.pzromises;

program
  .version("1.0.0")

  .argument("[filename]", "Name of a file to execute")
  // you specify options using .option()
  // if --tail is passed, its value is required

  .action(async ({ filename }) => {
    //its the same of arge.filename
    const name = filename ?? "app.js";

    try {
      await fsPromises.access(name);
    } catch {
      throw new Error(`I so sorry I can't find file have name ${name}`);
    }
    //debouce(func,delay)//342 watch it ,its hard to read the ducmentation
    const start = debounce(() => {
      console.log(chalk.green("start!!!"));
    }, 100);

    // when you move file have alot files inside like node_modules it show you alot massege unlinked because of that I will put it in debounce
    const moveFile = debounce(() => {
      console.log(chalk.yellow("File Unlinked"));
    }, 100);
    chokidar
      .watch(".")
      .on("add", start) //it can't call start more than once in 100 mls because that start!!! shown you just one but all the files are added
      .on("change", () => console.log("File Change"))
      .on("unlink", moveFile);
  });

program.parse(process.argv);

// ./myprog deploy myapp production --tail 100
