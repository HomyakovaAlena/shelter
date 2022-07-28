const menuTgl = document.querySelector(".menu__toggle");
const menuBox = document.querySelector(".menu__box");

const navOuter = document.querySelector(".nav_outer");
const logo2 = document.querySelector(".logo2");
const subtitle2 = document.querySelector(".subtitle2");

function toggleBurger(event) {
  if (event.currentTarget.checked) {
    openBurger(event);
    navOuter.addEventListener("click", closeBurger);
  } else {
    closeBurger(event);
  }
}

function openBurger(event) {
  menuBox.classList.add("burger-open");
  logo2.classList.remove("visually-hidden");
  subtitle2.classList.remove("visually-hidden");
  document.body.classList.add("fixed");
  document.body.style.top = `-${window.scrollY}px`;
  navOuter.classList.add("burger-outer");
}

function closeBurger(event) {
  menuTgl.checked = false;
  menuBox.classList.remove("burger-open");
  navOuter.classList.remove("burger-outer");
  logo2.classList.add("visually-hidden");
  subtitle2.classList.add("visually-hidden");
  document.body.classList.remove("fixed");
  document.body.style.top = "";
  window.scrollTo(0, parseInt(scrollY || "0") * -1);
}

menuTgl.addEventListener("change", toggleBurger);
navOuter.addEventListener("click", closeBurger);

export { toggleBurger, openBurger, closeBurger };
