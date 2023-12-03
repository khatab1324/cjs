const willGetYouADog = new Promise((resolve, reject) => {
  const rand = Math.random();
  if (rand < 0.5) {
    resolve();
  } else {
    reject({ status: 404 });
  }
});
willGetYouADog.then(() => {
  console.log("YAY WE GOT A DOG!!!!");
});
willGetYouADog.catch((e) => {
  console.log(":( NO DOG", e);
});
