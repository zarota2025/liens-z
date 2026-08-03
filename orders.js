import { db, collection } from "./firebase.js";

import {
    getDocs,
    deleteDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

let orders = [];

const ordersList = document.getElementById("orders-list");

// =========================
// LOAD ORDERS FROM FIREBASE
// =========================

async function loadOrders() {

    orders = [];

    const snapshot = await getDocs(collection(db, "orders"));

    snapshot.forEach((document) => {

        orders.push({
            firebaseId: document.id,
            ...document.data()
        });

    });

    renderOrders();
    updateStats();

}

// =========================
// RENDER ORDERS
// =========================

function renderOrders() {

    ordersList.innerHTML = "";

    if (orders.length === 0) {

        ordersList.innerHTML = `
        <div class="empty-orders">
            No orders yet 📦
        </div>
        `;

        return;

    }

    orders.forEach((order, index) => {

        let productsHTML = "";

        order.products.forEach(product => {

            productsHTML += `
            <li>
                ${product.name} × ${product.quantity}
                - $${(product.price * product.quantity).toFixed(2)}
            </li>
            `;

        });

        ordersList.innerHTML += `

        <div class="order-card ${order.status.toLowerCase()}">

            <h2>Order</h2>

            <p><strong>Name:</strong> ${order.customer.fullname}</p>

            <p><strong>Email:</strong> ${order.customer.email}</p>

            <p><strong>Phone:</strong> ${order.customer.phone}</p>

            <p><strong>Country:</strong> ${order.customer.country}</p>

            <p><strong>City:</strong> ${order.customer.city}</p>

            <p><strong>Address:</strong> ${order.customer.address}</p>

            <p><strong>Postal:</strong> ${order.customer.postal}</p>

            <p><strong>Payment:</strong> ${order.payment}</p>

            <p><strong>Date:</strong> ${order.date}</p>

            <h3>Products</h3>

            <ul>

                ${productsHTML}

            </ul>

            <h3>Total : ${order.total}</h3>

            <p>

                <strong>Status:</strong>

                <select onchange="changeStatus(${index},this.value)">

                    <option value="Pending" ${order.status=="Pending"?"selected":""}>Pending</option>

                    <option value="Processing" ${order.status=="Processing"?"selected":""}>Processing</option>

                    <option value="Shipped" ${order.status=="Shipped"?"selected":""}>Shipped</option>

                    <option value="Delivered" ${order.status=="Delivered"?"selected":""}>Delivered</option>

                </select>

            </p>

            <button onclick="deleteOrder(${index})" class="delete-btn">

                Delete

            </button>

        </div>

        `;

    });

}

// =========================
// DELETE
// =========================

window.deleteOrder = async function(index){

    if(!confirm("Delete this order?")) return;

    await deleteDoc(doc(db,"orders",orders[index].firebaseId));

    loadOrders();

}

// =========================
// CHANGE STATUS
// =========================

window.changeStatus = async function(index,status){

    await updateDoc(doc(db,"orders",orders[index].firebaseId),{

        status:status

    });

    loadOrders();

}

// =========================
// STATS
// =========================

function updateStats(){

    let pending=0;
    let processing=0;
    let shipped=0;
    let delivered=0;

    orders.forEach(order=>{

        switch(order.status){

            case "Pending":
                pending++;
                break;

            case "Processing":
                processing++;
                break;

            case "Shipped":
                shipped++;
                break;

            case "Delivered":
                delivered++;
                break;

        }

    });

    document.getElementById("pending-count").textContent=pending;
    document.getElementById("processing-count").textContent=processing;
    document.getElementById("shipped-count").textContent=shipped;
    document.getElementById("delivered-count").textContent=delivered;

}

// =========================
// SEARCH
// =========================

document.getElementById("search-order").addEventListener("input",function(){

    const keyword=this.value.toLowerCase();

    document.querySelectorAll(".order-card").forEach(card=>{

        card.style.display=

        card.textContent.toLowerCase().includes(keyword)

        ? "block"

        : "none";

    });

});

// =========================

loadOrders();
