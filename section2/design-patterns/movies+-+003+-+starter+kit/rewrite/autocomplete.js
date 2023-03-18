// I want make this code generic and I can use it in any where
const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  //remember the destractuer
  root.innerHTML = `
<input class="input" placeholder="search"/>
<div class="dropdown ">
<div class ="dropdown-menu">
<div class = "dropdown-content results">
</div>
</div>
</div>
`;
  // we sellect the input from above and all of them inside root
  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const results = root.querySelector(".results");
  const whenPress = async (event) => {
    const items = await fetchData(input.value);

    results.innerHTML = "";
    dropdown.classList.add("is-active"); //now when you resieve the data the drobdown will active and the shap like this <div class="drobdown is-active">
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    for (let item of items) {
      const option = document.createElement("a");

      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item); //now its genrale because you return renderOption in refactor.js and remember refactor.js it for sepsific for
      // .... our project and autocomplete it general

      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(item);
        onOptionSelect(item);
        //   you will see onMovieSelect in onther file
      });
      results.appendChild(option);
    }
  };
  input.addEventListener("input", waitNextPress(whenPress, 1000));

  document.addEventListener("click", (event) => {
    console.log(event.target);
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
      console.log("out");
    }
  });
};
