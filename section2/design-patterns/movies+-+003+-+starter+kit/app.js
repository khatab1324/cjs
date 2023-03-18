// I want make it in function that function return func

const root = document.querySelector(".autocomplete");
root.innerHTML = `
<input class="input" placeholder="search movie"/>
<div class="dropdown ">
<div class ="dropdown-menu">
<div class = "dropdown-content results">
</div>
</div>
</div>
`;
// we sellect the input from above
const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const results = document.querySelector(".results");

const fetchData = async (input) => {
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
};

//

const whenPress = async (event) => {
  //because await need async to work
  //now it call waitNextPress
  const movies = await fetchData(input.value); //we should use await keyword,becuase fetchdate return promis

  results.innerHTML = ""; //that will make the menu refrush
  dropdown.classList.add("is-active"); //now when you resieve the data the drobdown will active and the shap like this <div class="drobdown is-active">
  if (!movies.length) {
    //that mean if there no movie resieve
    dropdown.classList.remove("is-active");
    return;
  }

  for (let movie of movies) {
    const option = document.createElement("a"); //we need a and but class to work with css
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster; //it check if there link in Poster and N/A the value the API return when there no img

    option.classList.add("dropdown-item"); //this class for css
    option.innerHTML = `
    <img src="${imgSrc}"/>
    <h1>${movie.Title}</h1>
    `; //we need double quote "${}"because we need the img not the text if you don't put the ""you will find https://sdfkjsldfjlsdkfj

    option.addEventListener("click", () => {
      dropdown.classList.remove("is-active");
      input.value = movie.Title;
      onMovieSelect(movie);
      //   you will see onMovieSelect in onther file
    });
    results.appendChild(option);
  }
};

//

input.addEventListener("input", waitNextPress(whenPress, 1000)); // waitNextPress(whenPress)it the same in the vedio 230 impossiple to understand without watch

document.addEventListener("click", (event) => {
  console.log(event.target);
  if (!root.contains(event.target)) {
    //that mean if the user click on thing that not in root the condition will be true
    // to do that dropdown should donot have is-active that mean we should remove it
    dropdown.classList.remove("is-active");
    console.log("out");
  }

  //   i will fix it in next time
  // if (root.contains(event.target)) {
  //   //that mean if the user click on thing that not in root the condition will be true
  //   // to do that dropdown should donot have is-active that mean we should remove it
  //   dropdown.classList.add("is-active");
  // }
});
