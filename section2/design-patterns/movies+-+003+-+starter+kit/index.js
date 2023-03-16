console.log("Hi there!");
const input = document.querySelector("input");

// it wait user to finsh write and
let timeoutId;
function whenPress() {
  if (timeoutId) {
    //see timeoutId define
    clearTimeout(timeoutId); //if your clearTimeout when setTimeout run and wait the clearTimeout will stop it from work
  }
  timeoutId = setTimeout(() => {
    //now its waiting one sec for next key and before call fetchData if the user enter next key ,the timeoutId define and will enter inside if statment and clear the timeoutId and so on
    fetchData(input.value);
  }, 1000);
}

input.addEventListener("input", whenPress);

async function fetchData(input) {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: { apikey: "97f9707", s: input },
  }); //we write it like pram and axios will do it job thank axios . rether than write it like this  "http://www.omdbapi.com/?apikey=97f9707&s=dark"
  console.log(response.data);
}
// my key : 97f9707
