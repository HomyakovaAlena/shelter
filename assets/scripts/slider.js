import { create } from "./aggregate.js";

function Slider(slider) {
  if (!(slider instanceof Element)) {
    return false;
  }
  let current;
  let prev;
  let next;

  const pets = JSON.parse(localStorage.getItem("pets"));

  const slides = slider.querySelector(".slider-box");
  const prevButton = document.querySelector(".arrow-left");
  const nextButton = document.querySelector(".arrow-right");

  const randomUnique = (limit) => {
    let nums = new Set();
    while (nums.size < limit) {
      nums.add(Math.floor(Math.random() * (limit - 1 + 1)));
    }
    return [...nums];
  };


  function generateHTML(array) {
    const fragment = document.createDocumentFragment();
    let count = 0;
    pets.forEach((pet) => {
      pet.id = array[count];
      pet.count = count;

      const newCard = create("div", "crd", fragment, "");
      newCard.classList.add(`card${pet.id}`, "visually-hidden");
      newCard.id = count;

      count++;
      newCard.innerHTML = `
                <a class="learn-more-button" href="#">
                    <figure class="card">
                        <img class="pets-img" src="${pets[pet.id].img}"
                            alt="Pet ${pets[pet.id].name} image" />
                        <h4 class="h4-heading">${pets[pet.id].name}</h4>
                        <div class="button button-light">Learn more</div>
                    </figure>
                </a>
            `;
    });
    slides.append(fragment);
  }

  generateHTML(randomUnique(8));

  function startSlider() {
    current = slider.querySelector(".current") || slides.firstElementChild;
    prev = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slides.firstElementChild;
  }

  function applyClasses() {
    current.classList.add("current");
    prev.classList.add("prev");
    next.classList.add("next");
    [prev, current, next].forEach((el) =>
      el.classList.remove("visually-hidden")
    );
  }

  function move(direction) {
    const classesToRemove = ["prev", "current", "next"];
    [prev, current, next].forEach((el) =>
      el.classList.remove(...classesToRemove)
    );

    if (direction === "back") {
      [prev, current, next] = [
        prev.previousElementSibling || slides.lastElementChild,
        prev,
        current,
      ];
    } else {
      [prev, current, next] = [
        current,
        next,
        next.nextElementSibling || slides.firstElementChild,
      ];
    }
    applyClasses();
  }
  startSlider();
  applyClasses();

  nextButton.addEventListener("click", () => move("back"));
  prevButton.addEventListener("click", move);
}

export { Slider };
