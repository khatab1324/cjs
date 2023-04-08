let counter = 0;
module.exports = {
  incremnetCounter() {
    counter = counter + 1;
  },
  getCounter() {
    return counter;
  },
};
