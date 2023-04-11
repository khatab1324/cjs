#!/usr/bin/env node

//

// i want from this project do like ls command , show me what inside the dairectory
// first thing I want use laibry in node js that reading path
//its https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_fs_readdir_path_options_callback

// the name of libary is not excpted for that you should read some doce and know how to write them
// but we should before accese for it own libary
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const path = require("path");
// ------method #2
// const lstat = util.promisify(fs.lstat);

// method #3
const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd(); //that mean if you find argv use it if not using process.cwd

//process add auto into global scope of every project
fs.readdir(targetDir, async (err, fileNames) => {
  // EITHER
  // err === an error object, which means somthing want wrong
  //OR
  //error === null, that means every thing is correct
  if (err) {
    //error handling here
    console.log("there is error in here");
    // console.log(err);
    // return; //to not run any thing else in this function

    //you can do this elternative
    throw new Error(err);
  }

  const statPromises = fileNames.map((filename) => {
    return lstat(path.join(targetDir, filename));
  });

  const allStat = await Promise.all(statPromises);
  for (let stats of allStat) {
    const index = allStat.indexOf(stats);
    if (stats.isFile()) {
      console.log(chalk.green(fileNames[index]));
    } else {
      console.log(chalk.bold.red(fileNames[index]));
    }
  }

  // i want to let the node know its file or not and show me just the file

  //-----------badcode -----
  // for (let filename of fileNames) {
  //   fs.lstat(filename, (err, stats) => {
  //     //stats i donot got it form mom home it exsist in docs because callback ecsipit to agrument err and stats
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(filename, stats.isFile());
  //   });
  // } //bad code end here because callback take order and that change the order of file
});

//-------------method 1#
// const lstat = (filename) => {
//   new new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(stats);
//     });
//   })();
// };

// cwd -> current working directory it hard to write watch 232 or this doc https://nodejs.org/docs/latest-v12.x/api/process.html#
