const fackeRequest = (url) => {
  return new Promise((resolev, reject) => {
    setTimeout(() => {
      const rand = Math.random();
      if (rand < 0.4) {
        reject({ status: 404 });
      } else {
        const page = {
          "/user": [{ username: "khatab", password: 1234 }],
          "/post": [{ username: "hoppy", password: 4321 }],
        };
        const data = page[url];

        resolev({ status: 200, data });
      }
    }, 1000);
  });
};
fackeRequest("/user")
  .then((res) => {
    console.log(res.status);
    console.log(res.data[0]);
    console.log("your request expted");
    return fackeRequest("/post");
  })
  .then((res) => {
    console.log(res.data[0]);
    console.log("secend resqest excepted");
  })
  .catch((res) => {
    console.log(res.status);
    console.log("sorry bro");
  });
