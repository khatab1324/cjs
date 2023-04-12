#!/usr/bin/env node

const chokidar = require("chokidar");
const debounce = require("lodash.debounce");
const chalk = require("chalk");

chokidar
  .watch(".")
  .on("add", () => console.log("File Added"))
  .on("change", () => console.log("File Change"))
  .on("unlink", () => console.log("File Unlinked"));
