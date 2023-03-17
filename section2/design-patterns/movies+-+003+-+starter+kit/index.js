console.log("Hi there!");
const input = document.querySelector("input");

// it wait user to finsh write becuase we have 1000 req
let timeoutId;
async function whenPress() {
  if (timeoutId) {
    //see timeoutId define
    clearTimeout(timeoutId); //if your clearTimeout when setTimeout run and wait the clearTimeout will stop it from work
  }
  timeoutId = setTimeout(() => {
    //now its waiting one sec for next key and before call fetchData if the user enter next key ,the timeoutId define and will enter inside if statment and clear the timeoutId and so on
    fetchData(input.value);
  }, 1000);

  for (let movie of movies) {
    const div = document.createElement("div");
    div.innerHTML = `
    <img src="${movie.Poster}"/>
    <h1>${movie.Title}</h1>
    `; //we need double quote "${}"because we need the img not the text if you don't put the ""you will find https://sdfkjsldfjlsdkfj
    const collect = document.querySelector("#collect");
    collect.appendChild(div);
  }
  const movie = await fetchData(input.value);
}

input.addEventListener("input", whenPress);

async function fetchData(input) {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: { apikey: "97f9707", s: input },
  }); //we write it like pram and axios will do it job thank axios . rether than write it like this  "http://www.omdbapi.com/?apikey=97f9707&s=dark"

  //   now if you search about something that not exist (you will find in network on preview for your rquast)
  if (response.data.Error) {
    //that mean if there error
    console.log("there no match");
    return [];
  }
  return response.data.Search;
}
// my key : 97f9707
