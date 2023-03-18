//now you can call createAutoComplete alot of time because destractuer
createAutoComplete({
  root: document.querySelector(".autocomplete"),

  renderOption: (movie) => {
    // same renderOption(){}
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster; //it check if there link in Poster and N/A the value the API return when there no img
    return `<img src="${imgSrc}"/>
 <h1>${movie.Title} (${movie.Year})</h1>`;
  },

  onOptionSelect(movie) {
    onMovieSelect(movie); //I do that becuase it geve you more control
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
});
