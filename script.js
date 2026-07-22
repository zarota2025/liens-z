// ===== Slider =====

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let current = 0;

function showSlide(index){

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    current = index;
}

setInterval(() => {

    current++;

    if(current >= slides.length){
        current = 0;
    }

    showSlide(current);

},4000);

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        showSlide(index);

    });

});


// ===== Favorites =====

const favorites = document.querySelectorAll(".favorite");

let favoriteCount = 0;

const favoriteCounter = document.getElementById("favorite-count");

favorites.forEach(favorite=>{

    favorite.addEventListener("click",()=>{

        if(favorite.classList.contains("active")){
            favoriteCount--;
        }else{
            favoriteCount++;
        }

        favorite.classList.toggle("active");

        favoriteCounter.textContent = "❤️ " + favoriteCount;

    });

});


// ===== Shopping Cart =====

const cartCounter = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cartCounter.textContent = "🛒 " + cart.length;

const buyButtons = document.querySelectorAll(".buy-btn");

buyButtons.forEach(button=>{

    button.addEventListener("click",(e)=>{

        e.preventDefault();

        const product = {
    id: button.dataset.name,
    name: button.dataset.name,
    price: Number(button.dataset.price),
    image: button.dataset.image,
    quantity: 1
};

        const existingProduct = cart.find(item => item.id === product.id);

if (existingProduct) {
    existingProduct.quantity++;
} else {
    cart.push(product);
}

        localStorage.setItem("cart",JSON.stringify(cart));

        cartCounter.textContent = "🛒 " + cart.length;

        alert(product.name + " added to cart ✅");

    });

});
// ===== Search =====

const searchInput = document.getElementById("search");
const cards = document.querySelectorAll(".card");

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    cards.forEach(card => {

        const name = card.dataset.name.toLowerCase();

        if (name.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});
// ===== Categories =====

const categoryButtons = document.querySelectorAll(".category-btn");

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        // إزالة التفعيل من جميع الأزرار
        categoryButtons.forEach(btn => btn.classList.remove("active"));

        // تفعيل الزر الحالي
        button.classList.add("active");

        const category = button.dataset.category;

        cards.forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});
// ===== Quick View Modal =====

const modal = document.getElementById("product-modal");
const closeModal = document.querySelector(".close-modal");

const modalImage = document.getElementById("modal-image");
const modalName = document.getElementById("modal-name");
const modalPrice = document.getElementById("modal-price");

const viewButtons = document.querySelectorAll(".card-overlay");

alert("Buttons found: " + viewButtons.length);
viewButtons.forEach(button => {

    button.addEventListener("click", function () {

    alert("Clicked");

    const card = this.closest(".card");

    modalImage.src = card.querySelector("img").src;
    modalName.textContent = card.querySelector("h3").textContent;
    modalPrice.textContent = card.querySelector(".new-price").textContent;

    modal.style.display = "flex";

});

    alert("Button Clicked");

    const card = button.closest(".card");

    modalImage.src = card.querySelector("img").src;
    modalName.textContent = card.querySelector("h3").textContent;
    modalPrice.textContent =
        card.querySelector(".new-price").textContent;

    modal.style.display = "flex";

});

        const card = button.closest(".card");

        modalImage.src = card.querySelector("img").src;
        modalName.textContent = card.querySelector("h3").textContent;
        modalPrice.textContent =
            card.querySelector(".new-price").textContent;

        modal.style.display = "flex";

    });

});

closeModal.addEventListener("click", () => {

    modal.style.display = "none";

});

window.addEventListener("click", (e) => {

    if(e.target === modal){

        modal.style.display = "none";

    }

});
