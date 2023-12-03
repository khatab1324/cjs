//                 done

// Changing the color and background-color:
const h1 = document.querySelector("h1");
const button = document.querySelector("button");
h1.style.color = "pink";
h1.style.backgroundColor = "yellow"; //camel cased! (not background-color but backgroundColor)
button.style.color = "white";
button.style.backgroundColor = "black";
// Changing Multiple Elements:
const allLis = document.querySelectorAll("li");
const colors = ["red", "orange", "yellow", "green", "blue", "purple"];
console.log(allLis);
allLis.forEach((li, i) => {
  const color = colors[i];
  li.style.color = color;
});
