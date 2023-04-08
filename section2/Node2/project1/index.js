// i want from this project do like ls command , show me what inside the dairectory
// first thing I want use laibry in node js that reading path
//its https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_fs_readdir_path_options_callback

// the name of libary is not excpted for that you should read some doce and know how to write them
// but we should before accese for it own libary
const fs = require("fs");
//process add auto into global scope of every project
fs.readdir(process.cwd(), (err, fileNames) => {
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

  console.log(fileNames);
});

// cwd -> current working directory it hard to write watch 232 or this doc https://nodejs.org/docs/latest-v12.x/api/process.html#
