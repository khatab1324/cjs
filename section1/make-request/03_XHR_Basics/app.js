const firstReq = new XMLHttpRequest();
firstReq.addEventListener("load", function () {
  console.log("IT WORKED!!!");
  //   to access to data JSON.parse(this.responseText);and this refer to request its self and JOSN.parse make json js objects
  const data = JSON.parse(this.responseText);
  console.log(data); //its save like js objects
  for (let planet of data.results) {
    console.log(planet.name);
  }

  const filmUrl = data.results[0].films[0];
  const filmReq = new XMLHttpRequest();

  filmReq.addEventListener("load", function () {
    console.log("second request");
    const filmData = JSON.parse(this.responseText);
    console.log(filmData);

    console.log(filmData.url);
  });
  filmReq.addEventListener("error", function (e) {
    console.log("ERROR", e);
  });
  filmReq.open("Get", filmUrl);
  filmReq.send();
});
firstReq.addEventListener("error", () => {
  console.log("ERROR!!!!!!");
});
firstReq.open("GET", "http://swapi.dev/api/planets");
firstReq.send();
console.log("Request Sent!");
