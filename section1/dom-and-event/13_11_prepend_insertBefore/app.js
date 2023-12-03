//                done

const h1 = document.querySelector("h1");
const parentUL = document.querySelector("ul");
const newLI = document.createElement("li");

const newH2 = document.createElement("h2");

newH2.innerText = "fight or be forgtten ";

newLI.innerText = "I AM A NEW LIST ITEM!";

//prepend will add newLI as the FIRST child of parentUL
parentUL.prepend(newLI); //Doesn't work in IE!
h1.prepend(newH2);

//We can also insert something BEFORE another element, using insertBefore.
// First, select the element to insert before:
const targetLI = document.querySelectorAll("li.todo")[2]; //3rd li with class of 'todo'
// To insert our new LI before targetLI...
//parent.insertBefore(what to insert, where to insert)
parentUL.insertBefore(newLI, targetLI);

// h1.insertBefore(newH2,h2);
