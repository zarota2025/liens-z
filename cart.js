
/* =====================================
   LIENS Z - CART
===================================== */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateTotal() {

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    cartTotal.textContent = "$" + total.toFixed(2);

}

function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                Your cart is empty 🛒
            </div>
        `;

        cartTotal.textContent = "$0";

        return;
    }

    cart.forEach((item, index) => {

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="item-info">

                <h3>${item.name}</h3>

                <div class="item-price">
                    $${item.price}
                </div>

                <div class="quantity">

                    <button onclick="decreaseQuantity(${index})">-</button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${index})">+</button>

                </div>

            </div>

            <button
            class="remove-btn"
            onclick="removeItem(${index})">

            Delete

            </button>

        </div>

        `;

    });

    updateTotal();

}

function increaseQuantity(index){

    cart[index].quantity++;

    saveCart();

    renderCart();

}

function decreaseQuantity(index){

    if(cart[index].quantity>1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    saveCart();

    renderCart();

}

function removeItem(index){

    cart.splice(index,1);

    saveCart();

    renderCart();

}

clearCartBtn.addEventListener("click",()=>{

    if(confirm("Clear all products?")){

        cart=[];

        saveCart();

        renderCart();

    }

});

renderCart();
