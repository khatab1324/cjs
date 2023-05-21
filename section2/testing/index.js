// manuley not auto
module.exports = {
  forEach(array, fuction) {
    for (let i = 0; i < array.length; i++) {
      const value = array[i];
      fuction(value, i);
    }
  },
};
