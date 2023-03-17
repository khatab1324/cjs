const onMovieSelect = async (movie) => {
  const mvresponse = await axios.get("http://www.omdbapi.com/", {
    params: { apikey: "97f9707", i: movie.imdbID }, //i for imdbID you will find this in https://omdbapi.com/   in parameter
  });
  document.querySelector("#theMovie").innerHTML = movieTemplate(
    mvresponse.data
  );
  console.log(mvresponse.data);
};
const movieTemplate = (movieDetail) => {
  return `
     <article class="media">
     <figure class="media-left">
     <p class="imge">
     <img src=${movieDetail.Poster}/>
     </p>
     </figure>
        <div class="media-content">
            <div class="content">
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>
                  ${movieDetail.Plot}
                </p>
            </div>
        </div>
     </article>
     <article class="notification is-info">
        <p class="title">${movieDetail.Awards}</p>
        <p class = "subtitle">Awards</p>
     </article>
     <article class="notification is-primary">
        <p class="title">${movieDetail.BoxOffice}</p>
        <p class = "subtitle">BoxOffice</p>
     </article>
     <article class="notification is-info">
        <p class="title">${movieDetail.Metascore}</p>
        <p class = "subtitle">Metascore</p>
     </article>
     <article class="notification is-primary">
        <p class="title">${movieDetail.imdbRating}</p>
        <p class = "subtitle">imdbRating</p>
     </article>
     <article class="notification is-info">
        <p class="title">${movieDetail.imdbVotes}</p>
        <p class = "subtitle">imdbVotes</p>
     </article>
    `;
};
