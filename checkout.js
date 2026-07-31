/* =====================================
   LIENS Z - CHECKOUT
===================================== */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");

function renderCheckout() {

    checkoutItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p>Your cart is empty 🛒</p>
        `;

        checkoutTotal.textContent = "$0";

        return;
    }

    cart.forEach(item => {

        total += item.price * item.quantity;

        checkoutItems.innerHTML += `

        <div class="checkout-item">

            <span>${item.name} × ${item.quantity}</span>

            <strong>$${(item.price * item.quantity).toFixed(2)}</strong>

        </div>

        `;

    });

    checkoutTotal.textContent = "$" + total.toFixed(2);

}

renderCheckout();

/* =====================================
   PLACE ORDER
===================================== */

document.getElementById("place-order").addEventListener("click", () => {

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const country = document.getElementById("country").value.trim();
    const city = document.getElementById("city").value.trim();
    const address = document.getElementById("address").value.trim();
    const postal = document.getElementById("postal").value.trim();

    if (
        !fullname ||
        !email ||
        !phone ||
        !country ||
        !city ||
        !address ||
        !postal
    ) {

        showToast("Please fill in all fields.");

        return;
    }
let orders = JSON.parse(localStorage.getItem("orders")) || [];

orders.push({

    id: Date.now(),

    customer: {
        fullname,
        email,
        phone,
        country,
        city,
        address,
        postal
    },

    products: cart,

    total: checkoutTotal.textContent,

    payment: document.getElementById("payment").value,

    date: new Date().toLocaleString()

});

localStorage.setItem("orders", JSON.stringify(orders));
   console.log(orders);
alert("Order Saved Successfully");
    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    showToast("🎉 Thank you! Your order has been received.");

    cart = [];

localStorage.setItem("cart", JSON.stringify(cart));

    setTimeout(() => {

    window.location.href = "index.html";

}, 2000);

});
