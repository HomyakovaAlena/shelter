const menuBtn = document.querySelector(".menu__btn");
const menuTgl = document.querySelector(".menu__toggle");
const navMenu = document.querySelector(".nav-menu");
const menuBox = document.querySelector(".menu__box");
const menuItems = document.querySelectorAll(".menu__item");

const navOuter = document.querySelector(".nav_outer");
const burgerOuter = document.querySelector(".burger-outer");
const logo2 = document.querySelector(".logo2");
const subtitle2 = document.querySelector(".subtitle2");


function toggleBurger(event) {
    console.log(event);
    console.log(event.currentTarget.checked);

    if (event.currentTarget.checked) {
        openBurger(event);
        menuItems.forEach((item) => item.addEventListener("click", closeBurger));
    } else {
        closeBurger(event);
    }
}


function openBurger(event) {
    
    menuBox.classList.add('burger-open');
    logo2.classList.remove('visually-hidden');
    subtitle2.classList.remove('visually-hidden');
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
    navOuter.classList.add('burger-outer');
}

function closeBurger(event) {
    console.log(event);
    // event.stopImmediatePropagation();
    menuTgl.checked = false;
    menuBox.classList.remove('burger-open');
    navOuter.classList.remove('burger-outer');
    logo2.classList.add('visually-hidden');
    subtitle2.classList.add('visually-hidden');
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
}


menuTgl.addEventListener("change", toggleBurger);
navOuter.addEventListener("click", closeBurger);


export { toggleBurger, openBurger, closeBurger };
