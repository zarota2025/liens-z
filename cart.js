// ===== Load Cart =====

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const total = document.getElementById("cart-total");

function renderCart() {

    cartItems.innerHTML = "";

    let totalPrice = 0;

    cart.forEach((product, index) => {

        totalPrice += Number(product.price);

        cartItems.innerHTML += `
            <div class="cart-item">

                <img src="${product.image}" alt="${product.name}">

                <div class="cart-info">

                    <h3>${product.name}</h3>

                    <p>$${product.price}</p>

                    <button class="buy-btn" onclick="removeItem(${index})">
                        🗑 Remove
                    </button>

                </div>

            </div>
        `;
    });

    total.textContent = "Total: $" + totalPrice;
}

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
}

renderCart();
