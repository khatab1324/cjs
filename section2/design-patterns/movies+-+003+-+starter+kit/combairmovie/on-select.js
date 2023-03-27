let leftMovie;
let rightMovie;

const onMovieSelect = async (movie, summaryElement, side) => {
  const mvresponse = await axios.get("http://www.omdbapi.com/", {
    params: { apikey: "97f9707", i: movie.imdbID }, //i for imdbID you will find this in https://omdbapi.com/   in parameter
  });
  summaryElement.innerHTML = movieTemplate(mvresponse.data);
  if (side === "left") {
    leftMovie = mvresponse.data;
  } else {
    rightMovie = mvresponse.data;
  }
  if (leftMovie && rightMovie) {
    runComparison();
  }
};
const runComparison = () => {
  const leftSideStats = document.querySelectorAll(
    "#left-summary .notification"
  );
  const rightSideStats = document.querySelectorAll(
    "#right-summary .notification"
  );

  leftSideStats.forEach((leftStat, index) => {
    console.log(index);
    const rightStat = rightSideStats[index];

    // const leftSideValue = leftStats.dataset.value;   //   bad   //we use dataset to refer to data we want it
    // const rightSideValue = rightStats.dataset.value;//   bad   // Just one issue - in the DOM, all dataset values are stored as strings.  We never took that into account when comparing the two values, so right now we are comparing two strings, which will sometimes return the incorrect comparison!

    const leftSideValue = parseInt(leftStat.dataset.value);
    const rightSideValue = parseInt(rightStat.dataset.value);

    console.log(leftSideValue);
    if (leftSideValue < rightSideValue) {
      leftStat.classList.remove("is-info");
      // leftStats.classList.add("is-warning");
    } else {
      rightStat.classList.remove("is-info");
      // rightStats.classList.add("is-warning");
    }
  });
};
const movieTemplate = (movieDetail) => {
  // console.log(movieDetail.BoxOffice);
  // if (movieDetail.BoxOffice === "undefined") {
  //   const dollars = 1;
  // }
  // if (movieDetail.BoxOffice) {
  //   const dollars = parseInt(
  //     movieDetail.BoxOffice.replace(/\$/g, "").replace(/,/g, "")
  //   );
  const dollars = parseInt(
    movieDetail.BoxOffice.replace(/\$/g, "").replace(/,/g, "")
  ); 
   // } // the / is called Regular expressions they donot explain it but colt have vedio on youtube https://www.youtube.com/watch?v=EiRGUNrz9MY&t=147s
  const Metascore = parseInt(movieDetail.Metascore); //parseInt prvent the number have decimal
  const imdbRating = parseFloat(movieDetail.imdbRating); //parseFloat exapt the the decimal
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ""));

  const awards = movieDetail.Awards.split(" ").reduce((prev, word) => {
    // it hard to explain you will found it in 261
    const value = parseInt(word);

    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
  }, 0);

  console.log(awards);
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
       <article data-value=${awards} class="notification is-info">
          <p class="title">${movieDetail.Awards}</p>
          <p class = "subtitle">Awards</p>
       </article>
       <article data-value=${dollars} class="notification is-info">
          <p class="title">${movieDetail.BoxOffice}</p>
          <p class = "subtitle">BoxOffice</p>
       </article>
       <article data-value=${Metascore} class="notification is-info">
          <p class="title">${movieDetail.Metascore}</p>
          <p class = "subtitle">Metascore</p>
       </article>
       <article data-value=${imdbRating} class="notification is-info">
          <p class="title">${movieDetail.imdbRating}</p>
          <p class = "subtitle">imdbRating</p>
       </article>
       <article data-value=${imdbVotes} class="notification is-info">
          <p class="title">${movieDetail.imdbVotes}</p>
          <p class = "subtitle">imdbVotes</p>
       </article>
      `;
};
