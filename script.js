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
