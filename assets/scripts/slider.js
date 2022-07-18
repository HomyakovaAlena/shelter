import { create } from "./aggregate.js";

function Slider(slider) {
  if (!(slider instanceof Element)) {
    return false;
  }

  const pets = JSON.parse(localStorage.getItem("pets"));

  let current = [];
  let prev = [];
  let next = [];

  let view;
  const mobileView = 1;
  const tabletView = 2;
  const desktopView = 3;
  const countPets = Object.keys(pets).length;

  const slides = slider.querySelector(".slider-box");
  const children = slides.children;
  let childrenArray = Array.from(children);
  const prevButton = document.querySelector(".arrow-left");
  const nextButton = document.querySelector(".arrow-right");

  const randomUnique = (limit) => {
    let nums = new Set();
    while (nums.size < limit) {
      nums.add(Math.floor(Math.random() * (limit - 1 + 1)));
    }
    return [...nums];
  };

  function defineView() {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const desktop = window.matchMedia("(min-width: 1280px)").matches;
    const tablet = !mobile && !desktop;

    if (mobile) {
      view = mobileView;
    } else if (desktop) {
      view = desktopView;
    } else {
      view = tabletView;
    }
    return view;
  }

  view = defineView();

  function generateHTML(array) {
    const fragment = document.createDocumentFragment();
    let count = 0;
    pets.forEach((pet) => {
      pet.count = count;
      pet.random = array[count];

      const newCard = create("div", "crd", fragment, "");
      newCard.classList.add(`card${pet.random}`);
      newCard.id = size;

      count++;
      size++;
      newCard.innerHTML = `
              <a class="learn-more-button" href="#">
                  <figure class="card">
                      <img class="pets-img" src="${pets[pet.random].img}"
                          alt="Pet ${pets[pet.random].name} image" />
                      <h4 class="h4-heading">${pets[pet.random].name}</h4>
                      <div class="button button-light">Learn more</div>
                  </figure>
              </a>
          `;
    });
    slides.append(fragment);
  }

  let size = 0;

  generateHTML(randomUnique(8));

  function startSlider() {
    const pets = JSON.parse(localStorage.getItem("pets"));
    const countPets = Object.keys(pets).length;
    let childrenArray = Array.from(children);

    if (Array.from(slides.querySelectorAll(".current")).length) {
      current = Array.from(slides.querySelectorAll(".current"));
    } else {
      current = childrenArray.slice(0, view);
    }

    const firstCurrentIndex = childrenArray.indexOf(current[0]);
    const lastCurrentIndex = childrenArray.indexOf(current[view - 1]);

    let indexNext = lastCurrentIndex + 1;
    for (let i = 0; i < view; i++) {
      if (indexNext >= childrenArray.length) {
        indexNext = 0;
      }
      next.push(childrenArray[indexNext]);
      indexNext++;
    }

    let indexPrev = firstCurrentIndex - 1;
    for (let i = 0; i < view; i++) {
      if (indexPrev < 0) {
        indexPrev = countPets + indexPrev;
      }
      prev.unshift(childrenArray[indexPrev]);
      indexPrev--;
    }
  }

  function applyClasses() {
    current.forEach((item) => item.classList.add("current"));
    prev.forEach((item) => item.classList.add("prev"));
    next.forEach((item) => item.classList.add("next"));
  }

  startSlider();
  applyClasses();

  function move(direction) {
    let childrenArray = Array.from(children);
    const classesToRemove = ["prev", "current", "next", "right", "left"];

    prev.forEach((el) => el.classList.remove(...classesToRemove));
    current.forEach((el) => el.classList.remove(...classesToRemove));
    next.forEach((el) => el.classList.remove(...classesToRemove));

    current = [];

    if (direction === "back") {
      current = prev;
      current.forEach((item) => item.classList.add("current", "right"));
    } else {
      current = next;
      current.forEach((item) => item.classList.add("current", "left"));
    }

    current.forEach((item) =>
      item.addEventListener("animationend", function () {
        prev = [];
        next = [];
        let firstCurrentIndex = Array.from(children).indexOf(current[0]);
        let lastCurrentIndex = Array.from(children).indexOf(current[view - 1]);
        let indexPrev = firstCurrentIndex - 1;
        for (let i = 0; i < view; i++) {
          if (indexPrev < 0) {
            indexPrev = countPets + indexPrev;
          }
          prev.unshift(childrenArray[indexPrev]);
          indexPrev--;
        }
        lastCurrentIndex = Array.from(children).indexOf(current[view - 1]);
        let indexNext = lastCurrentIndex + 1;
        for (let i = 0; i < view; i++) {
          if (indexNext >= childrenArray.length) {
            indexNext = 0;
          }
          next.push(childrenArray[indexNext]);
          indexNext++;
        }
        applyClasses();
      }));
  }
  prevButton.addEventListener("click", () => move("back"));
  nextButton.addEventListener("click", move);
}

export { Slider };
