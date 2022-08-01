import {
  addModalShowMore,
  showMoreModal,
  makeSlider,
  makePagination,
} from "../../assets/scripts/aggregate.js";

fetch("../../assets/json/data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    localStorage.setItem("pets", JSON.stringify(data));
    const pets = JSON.parse(localStorage.getItem("pets"));
    if (Object.keys(pets).length) {
      init(pets);
    }
  });

function init(pets) {
  const petSlider = makeSlider(document.querySelector(".slider"));
  const petPagination = makePagination(document.querySelector(".pages"));
  addModalShowMore();
  showMoreModal(pets);
}
