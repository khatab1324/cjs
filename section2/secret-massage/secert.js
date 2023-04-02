const { hash } = window.location;
const massage = atob(hash.replace("#", ""));
if (massage) {
  document.querySelector("#massage-form").classList.add("hide");
  document.querySelector("#massage-show").classList.remove("hide");

  document.querySelector("h5").innerHTML = massage;
}
const input = document.querySelector("#massage-input");
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  document.querySelector("#massage-form").classList.add("hide");
  document.querySelector("#link-form").classList.remove("hide");

  const encrypted = btoa(input.value);
  const linkInput = document.querySelector("#link-input");
  linkInput.value = `${window.location}#${encrypted}`;
  linkInput.select();
});
