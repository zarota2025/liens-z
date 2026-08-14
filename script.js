/* =====================================
   TOAST
===================================== */

function showToast(message, type = "success") {

    const toast = document.getElementById("toast");

    if (!toast) return;

    const text = document.getElementById("toast-message");

    text.textContent = message;

    toast.className = "toast show " + type;

    setTimeout(() => {

        toast.className = "toast";

    }, 2500);

}
/* =====================================
   LIENS Z
   SCRIPT.JS
   PART 1
=====================================*/

/* ========= SIDE MENU ========= */

const menuBtn = document.getElementById("menu-btn");
const sideMenu = document.getElementById("side-menu");

if(menuBtn && sideMenu){

    menuBtn.addEventListener("click",()=>{

        sideMenu.classList.toggle("active");

    });

    document.addEventListener("click",(e)=>{

        if(
            !sideMenu.contains(e.target) &&
            !menuBtn.contains(e.target)
        ){
            sideMenu.classList.remove("active");
        }

    });

}

/* ========= SLIDER ========= */

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;

function showSlide(index){

    slides.forEach(slide=>{
        slide.classList.remove("active");
    });

    dots.forEach(dot=>{
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentSlide=index;

}

if(slides.length>0){

    setInterval(()=>{

        currentSlide++;

        if(currentSlide>=slides.length){

            currentSlide=0;

        }

        showSlide(currentSlide);

    },4000);

}

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        showSlide(index);

    });

});
/* =====================================
   LIVE SEARCH
=====================================*/

const searchInput = document.getElementById("search");
let products = window.products || document.querySelectorAll(".card");
if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase().trim();

        products.forEach((product) => {

            const name = product.dataset.name.toLowerCase();

            if (name.includes(value)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }

        });

    });

}
/* =====================================
   CATEGORY FILTER
=====================================*/

const categoryButtons = document.querySelectorAll(".category-btn");

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.category;

        products.forEach(product => {

            if (
                category === "all" ||
                product.dataset.category === category
            ) {

                product.style.display = "block";

            } else {

                product.style.display = "none";

            }

        });

    });

});
/* =====================================
   FAVORITES + CART
===================================== */

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateFavorites() {

    const favoriteCounter = document.getElementById("favorite-count");

    if (favoriteCounter) {
        favoriteCounter.innerHTML = `❤️ <span>${favorites.length}</span>`;
    }

}

function updateCartCounter() {

    const cartCounter = document.querySelector("#cart-count span");

    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    if (cartCounter) {
        cartCounter.textContent = total;
    }

}

window.initProducts = function () {

    const favoriteButtons = document.querySelectorAll(".favorite");
    const buyButtons = document.querySelectorAll(".buy-btn");

    updateFavorites();
    updateCartCounter();

    favoriteButtons.forEach(button => {

        const card = button.closest(".card");
        const name = card.querySelector("h3").textContent;

        if (favorites.includes(name)) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {

            if (favorites.includes(name)) {

                favorites = favorites.filter(item => item !== name);

                button.classList.remove("active");

                showToast("🗑️ Removed from favorites", "warning");

            } else {

                favorites.push(name);

                button.classList.add("active");

                showToast("❤️ Added to favorites");

            }

            localStorage.setItem("favorites", JSON.stringify(favorites));

            updateFavorites();

        });

    });

    buyButtons.forEach(button => {

        button.addEventListener("click", () => {

            const product = {

                name: button.dataset.name,
                price: Number(button.dataset.price),
                image: button.dataset.image,
                quantity: 1

            };

            const existing = cart.find(item => item.name === product.name);

            if (existing) {

                existing.quantity++;

            } else {

                cart.push(product);

            }

            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartCounter();

            showToast("🛒 Product added to cart");

        });

    });

                 }
/* =====================================
   DARK MODE
===================================== */

const themeBtn = document.getElementById("theme-toggle");

// تحميل الوضع المحفوظ
if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    if (themeBtn) {
        themeBtn.textContent = "☀️";
    }

}

// تغيير الوضع
if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");

            themeBtn.textContent = "☀️";

            showToast("🌙 Dark Mode Enabled");

        } else {

            localStorage.setItem("theme", "light");

            themeBtn.textContent = "🌙";

            showToast("☀️ Light Mode Enabled");

        }

    });

}

// =====================================
// 🌐 LANGUAGE SWITCHER
// PART 2 / 10
// =====================================

const languageToggle =
    document.getElementById(
        "language-toggle"
    );


// =====================================
// 🌐 CURRENT LANGUAGE
// =====================================

let currentLanguage =
    localStorage.getItem(
        "siteLanguage"
    ) || "en";


// =====================================
// 🔄 UPDATE LANGUAGE BUTTON
// =====================================

function updateLanguageButton() {

    if (!languageToggle) return;


    if (
        currentLanguage === "ar"
    ) {

        languageToggle.textContent =
            "EN";

    } else {

        languageToggle.textContent =
            "AR";

    }

}


// =====================================
// 🔄 CHANGE LANGUAGE
// =====================================

if (languageToggle) {

    languageToggle.addEventListener(
        "click",
        function () {

            if (
                currentLanguage === "en"
            ) {

                currentLanguage =
                    "ar";

            } else {

                currentLanguage =
                    "en";

            }


            localStorage.setItem(
                "siteLanguage",
                currentLanguage
            );


            updateLanguageButton();

        }
    );

}


// =====================================
// 🚀 INITIAL LANGUAGE
// =====================================

updateLanguageButton();
