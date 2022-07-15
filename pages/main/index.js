import {
  toggleBurger,
  openBurger,
  closeBurger,
  addModalShowMore,
  showMoreModal,
  Slider,
  Pagination
} from "../../assets/scripts/aggregate.js";

fetch("../../assets/json/data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    localStorage.setItem("pets", JSON.stringify(data));
    console.info("Saving pets to localstorage");
  });

const pets = JSON.parse(localStorage.getItem("pets"));
console.log(pets);

function init(pets) {
  const petSlider = Slider(document.querySelector('.slider'));
  const petPagination = Pagination(document.querySelector(".pages"));
  addModalShowMore();
  showMoreModal(pets);
}

if (Object.keys(pets).length) {
    init(pets);
}

export { pets };
