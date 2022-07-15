import { create } from "./aggregate.js";

const main = document.querySelector("main");

function addModalShowMore() {
  const fragment = document.createDocumentFragment();
  const modalOuter = create("div", "modal-outer", fragment, "");
  const modalInner = create("div", "modal-inner", modalOuter, "");
  console.log('yohoho');
  main.append(fragment);
}


function showMoreModal(pets) {
  const buttonsShowMore = document.querySelectorAll(".btnShowMore");
  const cards = document.querySelectorAll(".crd");
  const modalOuter = document.querySelector(".modal-outer");
  const modalInner = document.querySelector(".modal-inner");
  
  function handleCardButtonClick(event) {
    const button = event.currentTarget;
    const card = button.closest(".crd");
    const imgSrc = card.querySelector("img").src;
    const petName = card.querySelector(".h4-heading").textContent;

    event.preventDefault();
    const pet = pets.filter((item) => item.name === petName);

    modalInner.innerHTML = `
  <button type="button" id="closeBtn" class="btn closeBtn">x</button>
  <div class='modalRow'>
    <div class='modalCol1'>
        <img class='imgPetModal' src=${imgSrc} alt=${pet[0].name}/>
    </div>
    <div class='modalCol2'>
        <h3 class='h3-heading'>${pet[0].name}</h3>
        <h4 class='h4-heading'>${pet[0].type} - ${pet[0].breed}</h4><br>
        <h5 class='h5-heading description'>${pet[0].description}</h5><br>
        <ul>
            <li><h5 class='h5-heading'><strong>Age: </strong>${pet[0].age}</h5></li><br>
            <li><h5 class='h5-heading'><strong>Inoculations: </strong>${pet[0].inoculations}</h5></li><br>
            <li><h5 class='h5-heading'><strong>Diseases: </strong>${pet[0].diseases}</h5></li><br>
            <li><h5 class='h5-heading'><strong>Parasites: </strong>${pet[0].parasites}</h5></li><br>
        </ul>
    </div>
  </div>`;
    modalOuter.classList.add("open");
    const body = document.querySelector("body");
    body.style.overflow = "hidden";

    function closeModal() {
      modalOuter.classList.remove("open");
      const body = document.querySelector("body");
      body.style.overflow = "auto";
    }

    const closeBtn = modalInner.querySelector(".closeBtn");
    closeBtn.addEventListener("click", function () {
      closeModal();
    });

    modalOuter.addEventListener("click", function (event) {
      const isOutside = !event.target.closest(".modal-inner");
      if (isOutside) {
        closeModal();
      }

      window.addEventListener("keydown", (event) => {
        console.log(event);
        if (event.key === "Escape") {
          closeModal();
        }
      });
    });
  }

  buttonsShowMore.forEach((button) =>
      button.addEventListener("click", handleCardButtonClick)
    );
    cards.forEach((button) =>
      button.addEventListener("click", handleCardButtonClick)
    );

}

export { addModalShowMore, showMoreModal };
