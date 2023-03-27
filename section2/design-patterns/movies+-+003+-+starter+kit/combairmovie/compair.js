// we donot need to duplicat createAutocomplete with deffrent root we can do this insted

const autocompleteConfig = {
  renderOption: (movie) => {
    // same renderOption(){}
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster; //it check if there link in Poster and N/A the value the API return when there no img
    return `<img src="${imgSrc}"/>
       <h1>${movie.Title} (${movie.Year})</h1>`;
  },

  inputValue: (movie) => {
    return movie.Title;
  },

  //I move fech to be one scope
  async fetchData(input) {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: { apikey: "97f9707", s: input },
    });

    if (response.data.Error) {
      console.log("there no match");
      return [];
    }
    return response.data.Search;
  },
};
// this for left
createAutoComplete({
  // we take every thing and call it in here
  ...autocompleteConfig,
  root: document.querySelector("#left-autocomplete"),

  // i make it here not in autocompleteConfig to seperit every req 257
  onOptionSelect(movie) {
    // when I select the movie the h1 will hidden
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#left-summary"), "left"); //I do that becuase it geve you more control
  },
});

// now i call it with deffirnt querySelector
// this for right
createAutoComplete({
  // we take every thing and call it in here
  ...autocompleteConfig,
  root: document.querySelector("#right-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#right-summary"), "right");
  },
});
