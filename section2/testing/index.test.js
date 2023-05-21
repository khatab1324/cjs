const assert = require("assert");
// example
// assert.strictEqual(1, 2);
// AssertionError [ERR_ASSERTION]: Expected inputs to be strictly equal:
//
// 1 !== 2
const { forEach } = require("./index");

// i will comment it because mocha
// const test = (desc, fn) => {
//   console.log("-------", desc);
//   try {
//     fn();
//   } catch (err) {
//     console.log(err.message);
//   }
// };
// it for mocha
it("this test for forEach", () => {
  let sum = 0;
  forEach([1, 2, 3], (value, i) => {
    sum += value;
  });
  assert.strictEqual(sum, 6);
  if (sum !== 6) {
    throw new Error("Expacted sum equal 6");
  }
});
