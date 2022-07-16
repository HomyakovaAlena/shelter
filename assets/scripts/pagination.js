import { create } from "./aggregate.js";

function Pagination(pagination) {
  if (!(pagination instanceof Element)) {
    return false;
  }

  const pets = JSON.parse(localStorage.getItem("pets"));
  let current;
  let prev;
  let next;
  let first;
  let last;

  let numPages = 0;
  let view;
  const countRandom = 6;
  const mobileView = 3;
  const tabletView = 6;
  const desktopView = 8;
  const countPets = countRandom * Object.keys(pets).length;

  const pages = pagination.querySelector(".slider-box");
  const children = pages.children;

  const firstButton = document.querySelector(".arrow-left2");
  const prevButton = document.querySelector(".arrow-left1");
  const nextButton = document.querySelector(".arrow-right1");
  const lastButton = document.querySelector(".arrow-right2");

  const randomUnique = (limit) => {
    let nums = new Set();
    while (nums.size < limit) {
      nums.add(Math.floor(Math.random() * (limit - 1 + 1)));
    }
    return [...nums];
  };

  let size = 0;
  for (let i = 0; i < countRandom; i++) {
    generateHTML(randomUnique(8));
  }

  function generateHTML(array) {
    const fragment = document.createDocumentFragment();
    let count = 0;
    pets.forEach((pet) => {
      pet.count = count;
      pet.random = array[count];

      const newCard = create("div", "crd", fragment, "");
      newCard.classList.add(`card${pet.random}`, "visually-hidden");
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

    pages.append(fragment);
  }

  function countPages() {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const desktop = window.matchMedia("(min-width: 1280px)").matches;
    const tablet = !mobile && !desktop;

    if (mobile) {
      numPages = countPets / mobileView;
    } else if (desktop) {
      numPages = countPets / desktopView;
    } else {
      numPages = countPets / tabletView;
    }
    return numPages;
  }

  numPages = countPages();

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

  function startPagination() {
    first = Array.from(children).slice(0, view);
    last = Array.from(children).slice(-view, countPets);

    if (Array.from(pages.querySelectorAll(".current")).length) {
      current = Array.from(pages.querySelectorAll(".current"));
    } else {
      current = first;
    }

    const firstCurrentIndex = Array.from(children).indexOf(current[0]);
    const lastCurrentIndex = Array.from(children).indexOf(current[view - 1]);

    if (lastCurrentIndex !== countPets - 1) {
      next = Array.from(children).slice(
        lastCurrentIndex + 1,
        lastCurrentIndex + view + 1
      );
    } else {
      next = first;
    }

    if (firstCurrentIndex) {
      prev = Array.from(children).slice(
        firstCurrentIndex - view,
        firstCurrentIndex
      );
    } else {
      prev = last;
    }
    correctPagination();
  }

  startPagination();

  function applyClasses() {
    current.forEach((item) => item.classList.add("current"));
    prev.forEach((item) => item.classList.add("prev", "visually-hidden"));
    next.forEach((item) => item.classList.add("next", "visually-hidden"));
    first.forEach((item) => item.classList.add("first", "visually-hidden"));
    last.forEach((item) => item.classList.add("last", "visually-hidden"));

    current.forEach((el) => el.classList.remove("visually-hidden"));
  }

  function correctPagination() {
    const lastCurrentIndex = Array.from(children).indexOf(current[view - 1]);
    const currentPage = Math.round(lastCurrentIndex / view);
    const page = document.querySelector(".arrow-page");
    page.textContent = currentPage;
    if (currentPage === 1) {
      [firstButton, prevButton].forEach((button) =>
        button.classList.add("disabled")
      );
    } else if (currentPage === numPages) {
      [lastButton, nextButton].forEach((button) =>
        button.classList.add("disabled")
      );
    }
  }

  function move(direction) {
    let firstCurrentIndex = Array.from(children).indexOf(current[0]);
    let lastCurrentIndex = Array.from(children).indexOf(current[view - 1]);

    const classesToRemove = ["prev", "current", "next", "disabled"];
    current.forEach((item) => item.classList.add("visually-hidden"));

    prev.forEach((el) => el.classList.remove(...classesToRemove));
    current.forEach((el) => el.classList.remove(...classesToRemove));
    next.forEach((el) => el.classList.remove(...classesToRemove));

    [firstButton, prevButton, lastButton, nextButton].forEach((button) =>
      button.classList.remove(...classesToRemove)
    );

    if (direction === "first") {
      [current, prev] = [first, last];
      lastCurrentIndex = Array.from(children).indexOf(current[view - 1]);
      next = Array.from(children).slice(
        lastCurrentIndex + 1,
        lastCurrentIndex + view + 1
      );
    } else if (direction === "last") {
      [current, next] = [last, first];
      firstCurrentIndex = Array.from(children).indexOf(current[0]);
      prev = Array.from(children).slice(
        firstCurrentIndex - view,
        firstCurrentIndex
      );
    } else if (direction === "back") {
      [current, next] = [prev, current];
      firstCurrentIndex = Array.from(children).indexOf(current[0]);
      prev = Array.from(children).slice(
        firstCurrentIndex - view,
        firstCurrentIndex
      );
    } else {
      [current, prev] = [next, current];
      lastCurrentIndex = Array.from(children).indexOf(current[view - 1]);
      next = Array.from(children).slice(
        lastCurrentIndex + 1,
        lastCurrentIndex + view + 1
      );
    }

    applyClasses();
    correctPagination();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  applyClasses();

  prevButton.addEventListener("click", () => move("back"));
  nextButton.addEventListener("click", move);
  firstButton.addEventListener("click", () => move("first"));
  lastButton.addEventListener("click", () => move("last"));
}

export { Pagination };
