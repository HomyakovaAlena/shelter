import {
  toggleBurger,
  openBurger,
  closeBurger,
  addModalShowMore,
  showMoreModal,
  Slider
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

addModalShowMore();
showMoreModal(pets);

export { pets };
