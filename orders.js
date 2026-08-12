// =====================================
// 📦 LIENS Z - ORDERS SYSTEM
// PART 1 / 10
// =====================================

import { db, collection } from "./firebase.js";

import {
    getDocs,
    deleteDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


// =====================================
// 📋 GLOBAL VARIABLES
// =====================================

let orders = [];


// =====================================
// 📦 ORDERS CONTAINER
// =====================================

const ordersList =
    document.getElementById("orders-list");


// =====================================
// 🔎 SEARCH INPUT
// =====================================

const searchOrder =
    document.getElementById("search-order");


// =====================================
// 📦 STATUS FILTER
// =====================================

const statusFilter =
    document.getElementById("status-filter");


// =====================================
// 🔃 SORT ORDERS
// =====================================

const sortOrders =
    document.getElementById("sort-orders");


// =====================================
// 🪟 ORDER MODAL
// =====================================

const orderModal =
    document.getElementById("order-modal");

const orderDetails =
    document.getElementById("order-details");

const closeModal =
    document.getElementById("close-modal");
