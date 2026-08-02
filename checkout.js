import { db, collection, addDoc } from "./firebase.js";
/* =====================================
   LIENS Z - CHECKOUT
===================================== */
alert("1");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

alert("2");

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

alert("3");
alert("4");
/* =====================================
   PLACE ORDER
===================================== */

document.getElementById("place-order").addEventListener("click", async () => {
alert("5")
   alert("Button Works");
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const country = document.getElementById("country").value.trim();
    const city = docalert("4");ument.getElementById("city").value.trim();
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

        alert("Please fill in all fields.");
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
 try {

    await addDoc(collection(db, "orders"), {
alert("6");
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

        status: "Pending",

        date: new Date().toLocaleString()

    });

    console.log("Order saved to Firebase");

} catch (error) {

    console.error(error);

}  
   console.log(orders);
alert("Order Saved Successfully");
    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    alert("🎉 Thank you! Your order has been received.");

    cart = [];

localStorage.setItem("cart", JSON.stringify(cart));

    setTimeout(() => {

    window.location.href = "index.html";

}, 2000);

});
