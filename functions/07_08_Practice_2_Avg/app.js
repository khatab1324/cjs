// Write a function to find the average value in an array of numbers
//avg([0,50]) //25
//avg([75,76,80,95,100]) //85.2
function avg(arr) {
  let allnum = 0;
  for (let num of arr) {
    allnum += num;
  }

  return allnum / arr.length;
}
console.log("adfg");
