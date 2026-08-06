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

            <div class="order-actions">

    <button onclick="viewOrder(${index})" class="view-btn">
        👁 View
    </button>

    <button onclick="printInvoice(${index})" class="print-btn">
        🖨 Print
    </button>

    <button onclick="deleteOrder(${index})" class="delete-btn">
        🗑 Delete
    </button>

</div>

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
window.viewOrder = function(index){

    const order = orders[index];

    const details = document.getElementById("order-details");

    let products = "";

    order.products.forEach(product => {

        products += `
            <li>
                ${product.name}
                × ${product.quantity}
                - $${product.price}
            </li>
        `;

    });

    details.innerHTML = `
        <h2>Order Details</h2>

        <p><strong>Name:</strong> ${order.customer.fullname}</p>

        <p><strong>Email:</strong> ${order.customer.email}</p>

        <p><strong>Phone:</strong> ${order.customer.phone}</p>

        <p><strong>Address:</strong> ${order.customer.address}</p>

        <p><strong>Payment:</strong> ${order.payment}</p>

        <p><strong>Date:</strong> ${order.date}</p>

        <h3>Products</h3>

        <ul>${products}</ul>

        <h3>Total: ${order.total}</h3>
    `;

    document.getElementById("order-modal").style.display = "flex";

};

document.getElementById("close-modal").onclick = function(){

    document.getElementById("order-modal").style.display = "none";

};
window.printInvoice = function(index){

    const order = orders[index];

    let products = "";

    order.products.forEach(product => {

        products += `
        <tr>
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>$${product.price}</td>
            <td>$${(product.price * product.quantity).toFixed(2)}</td>
        </tr>
        `;

    });

    const win = window.open("", "_blank");

    win.document.write(`
    <html>
    <head>
    <title>Invoice</title>

    <style>

    body{
        font-family:Arial;
        padding:30px;
    }

    table{
        width:100%;
        border-collapse:collapse;
    }

    table,th,td{
        border:1px solid #000;
    }

    th,td{
        padding:10px;
    }

    </style>

    </head>

    <body>

    <h1>LIENS Z</h1>

    <h2>Invoice</h2>

    <p><b>Customer:</b> ${order.customer.fullname}</p>
    <p><b>Email:</b> ${order.customer.email}</p>
    <p><b>Phone:</b> ${order.customer.phone}</p>
    <p><b>Date:</b> ${order.date}</p>

    <table>

    <tr>
        <th>Product</th>
        <th>Qty</th>
        <th>Price</th>
        <th>Total</th>
    </tr>

    ${products}

    </table>

    <h2>Total: ${order.total}</h2>

    </body>
    </html>
    `);

    win.document.close();
    win.print();

};
document.getElementById("download-pdf").onclick = function () {

    const invoice = document.getElementById("order-details");

    html2pdf()
        .set({
            margin: 10,
            filename: "LIENS-Z-Invoice.pdf",
            image: { type: "jpeg", quality: 1 },
            html2canvas: { scale: 2 },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait"
            }
        })
        .from(invoice)
        .save();

};
