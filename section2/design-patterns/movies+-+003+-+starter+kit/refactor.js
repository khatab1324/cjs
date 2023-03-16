const input = document.querySelector("input");

// let timeoutId;
// const whenPress = (event) => {
//   if (timeoutId) {
//     clearTimeout(timeoutId);
//   }
//   timeoutId = setTimeout(() => {
//     fetchData(input.value);
//   }, 1000);
// };
// it defficalt to understand
// let's refact

// I want make it in function that function return func

let timeoutId;
const waitNextPress = (func, delay) => {
  return (...agrs) => {
    //you return function that can contain alot of function becuase ...agrs and you can call it in any time
    //it sepred all agrument
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, agrs); //it make like this (agr1,agr2,arg3....) and add it to func
    }, delay);
  };
};

const whenPress = (event) => {
  //now it call waitNextPress
  fetchData(input.value);
};

input.addEventListener("input", waitNextPress(whenPress, 1000)); // waitNextPress(whenPress)it the same in the vedio 230 impossiple to understand without watch

const fetchData = async (input) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: { apikey: "97f9707", s: input },
  }); //we write it like pram and axios will do it job thank axios . rether than write it like this  "http://www.omdbapi.com/?apikey=97f9707&s=dark"
  console.log(response.data);
};
