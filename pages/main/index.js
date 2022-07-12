import { toggleBurger, openBurger, closeBurger } from '../../assets/scripts/aggregate.js';
import { addModalShowMore, showMoreModal } from '../../assets/scripts/aggregate.js';


fetch("../../assets/json/data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    localStorage.setItem("pets", JSON.stringify(data));
    
    // const isItems = JSON.parse(localStorage.getItem("items"));

    // if (!isItems?.length) {
    //   let items = localStorage.setItem("items", JSON.stringify([]));
    // }
    // let items = JSON.parse(localStorage.getItem("items"));
      console.info("Saving pets to localstorage");
      
      
    // const list = document.querySelector(".list");
    // list.dispatchEvent(new CustomEvent("itemsUpdated", { detail: items }));
  });

const pets = JSON.parse(localStorage.getItem("pets"));
console.log(pets);

addModalShowMore();
showMoreModal(pets);




export { pets };
