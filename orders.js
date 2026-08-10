// =====================================
// 📦 LIENS Z - ORDERS MANAGEMENT
// PART 1 / 8
// =====================================

import {
    db,
    collection
} from "./firebase.js";

import {
    getDocs,
    deleteDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


// =====================================
// 📋 GLOBAL ORDERS ARRAY
// =====================================

let orders = [];


// =====================================
// 📦 ORDERS CONTAINER
// =====================================

const ordersList =
    document.getElementById("orders-list");


// =====================================
// 🔎 SEARCH
// =====================================

const searchOrder =
    document.getElementById("search-order");


// =====================================
// 📦 STATUS FILTER
// =====================================

const statusFilter =
    document.getElementById("status-filter");


// =====================================
// ↕️ SORT
// =====================================

const sortOrders =
    document.getElementById("sort-orders");
// =====================================
// 🔥 LOAD ORDERS FROM FIREBASE
// PART 2 / 8
// =====================================

async function loadOrders() {

    try {

        orders = [];

        const snapshot =
            await getDocs(
                collection(db, "orders")
            );


        snapshot.forEach(
            (document) => {

                orders.push({

                    firebaseId:
                        document.id,

                    ...document.data()

                });

            }
        );


        // عرض الطلبات
        renderOrders();


        // تحديث الإحصائيات
        updateStats();


    } catch (error) {

        console.error(
            "❌ Error loading orders:",
            error
        );


        if (ordersList) {

            ordersList.innerHTML = `

                <div class="empty-orders">

                    ❌ Unable to load orders.

                    <br><br>

                    Please try again.

                </div>

            `;

        }

    }

}
