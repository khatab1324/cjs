const counterObject = require("./myscript");
console.log(counterObject.getCounter());
counterObject.incremnetCounter();
console.log(counterObject.getCounter());

const newCounterObject = require("./myscript");
console.log(newCounterObject.getCounter());
