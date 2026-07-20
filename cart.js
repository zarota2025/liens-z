// ===== Load Cart =====

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const total = document.getElementById("cart-total");

function renderCart() {

    cartItems.innerHTML = "";

    let totalPrice = 0;

    cart.forEach((product, index) => {

        totalPrice += product.price * product.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <img src="${product.image}" alt="${product.name}">

                <div class="cart-info">

                    <h3>${product.name}</h3>

                    <p>Price: $${product.price}</p>

<div class="quantity">

<button onclick="decreaseQuantity(${index})">➖</button>

<span>${product.quantity}</span>

<button onclick="increaseQuantity(${index})">➕</button>

</div>

<p><strong>Subtotal: $${product.price * product.quantity}</strong></p>

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
function increaseQuantity(index){

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();

}

function decreaseQuantity(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();

}
