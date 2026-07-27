/* =====================================
   LIENS Z - FAVORITES
===================================== */

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const favoriteItems = document.getElementById("favorite-items");
const favoriteCounter = document.querySelector("#favorite-count span");
const cartCounter = document.querySelector("#cart-count span");

/* ========================= */

const products = {

    "iPhone 15 Pro": {
        price: 799,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
    },

    "Nike Shoes": {
        price: 120,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
    },

    "Sony Headphones": {
        price: 149,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
    }

};

/* ========================= */

function updateCounters() {

    favoriteCounter.textContent = favorites.length;

    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    cartCounter.textContent = total;

}

/* ========================= */

function renderFavorites() {

    favoriteItems.innerHTML = "";

    if (favorites.length === 0) {

        favoriteItems.innerHTML = `
        <div class="empty-favorites">
            No favorite products ❤️
        </div>
        `;

        updateCounters();

        return;

    }

    favorites.forEach((name, index) => {

        const product = products[name];

        favoriteItems.innerHTML += `

        <div class="favorite-item">

            <img src="${product.image}" alt="${name}">

            <div class="favorite-info">

                <h3>${name}</h3>

                <div class="favorite-price">
                    $${product.price}
                </div>

                <div class="favorite-buttons">

                    <button
                    class="add-cart"
                    onclick="addToCart('${name}')">

                    🛒 Add to Cart

                    </button>

                    <button
                    class="remove-favorite"
                    onclick="removeFavorite(${index})">

                    Delete

                    </button>

                </div>

            </div>

        </div>

        `;

    });

    updateCounters();

}

/* ========================= */

function removeFavorite(index) {

    favorites.splice(index, 1);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    renderFavorites();

}

/* ========================= */

function addToCart(name) {

    const product = products[name];

    const existing = cart.find(item => item.name === name);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            name: name,
            price: product.price,
            image: product.image,
            quantity: 1

        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCounters();

    showToast("Added to cart 🛒");

}

/* ========================= */

renderFavorites();
