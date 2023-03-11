// // ONE OPTION FOR ERROR HANDLING...
// async function getPlanets() {
//   //Invalid URL...
//   return axios.get("https://swapi.dev/api/people/");
//   console.log(res.data);
// }
// getPlanets().then((res) => {
//   console.log(res.data);
// });
// getPlanets().catch((err) => {
//   console.log("IN CATCH!!!");
//   console.log(err);
// });

// // ANOTHER OPTION...
// async function getPlanets() {
//   try {
//     const res = await axios.get("https://swapi.co/api/planeklsajdalksts/");
//     console.log(res.data);
//   } catch (e) {
//     console.log("IN CATCH!", e);
//   }
// }
// getPlanets();

//

// function getPlanets() {
//   return axios.get("https://swapi.dev/api/people/");
// }
// getPlanets().then((res) => {
//   console.log(res.data);
// });

async function getPlanets() {
  const res = await axios.get("https://swapi.dev/api/people/");
  console.log(res.data);
}
getPlanets().catch((err) => {
  console.log("i think there is a error");
  console.log(err);
});
//await : js will wait the resolve done
