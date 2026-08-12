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
// =====================================
// 📥 LOAD ORDERS FROM FIREBASE
// PART 2 / 10
// =====================================

async function loadOrders() {

    try {

        // تفريغ القائمة القديمة
        orders = [];


        // جلب الطلبات من Firebase
        const snapshot =
            await getDocs(
                collection(db, "orders")
            );


        // إضافة كل طلب إلى orders
        snapshot.forEach((document) => {

            orders.push({

                firebaseId:
                    document.id,

                ...document.data()

            });

        });


        console.log(
            "📦 Orders loaded:",
            orders.length
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
// =====================================
// 🖥 RENDER ORDERS
// PART 3 / 10
// =====================================

function renderOrders(list = orders) {

    if (!ordersList) return;


    ordersList.innerHTML = "";


    // لا توجد طلبات
    if (!list || list.length === 0) {

        ordersList.innerHTML = `

            <div class="empty-orders">

                📦 No orders found.

            </div>

        `;

        return;

    }


    // عرض كل طلب
    list.forEach((order) => {

        let productsHTML = "";


        // =============================
        // 🛍 PRODUCTS
        // =============================

        if (
            order.products &&
            Array.isArray(order.products)
        ) {

            order.products.forEach((product) => {

                const quantity =
                    Number(
                        product.quantity || 0
                    );


                const price =
                    Number(
                        product.price || 0
                    );


                productsHTML += `

                    <li>

                        ${product.name || "Product"}

                        × ${quantity}

                        -

                        $${(
                            price * quantity
                        ).toFixed(2)}

                    </li>

                `;

            });

        }


        // =============================
        // ORDER INDEX
        // =============================

        const originalIndex =
            orders.indexOf(order);


        // =============================
        // STATUS
        // =============================

        const status =
            order.status || "Pending";


        // =============================
        // TOTAL
        // =============================

        const total =
            Number(order.total || 0);


        // =============================
        // ORDER CARD
        // =============================

        ordersList.innerHTML += `

            <div
                class="order-card ${status.toLowerCase()}">

                <h2>
                    📦 Order
                </h2>


                <p>

                    <strong>
                        Name:
                    </strong>

                    ${order.customer?.fullname || "-"}

                </p>


                <p>

                    <strong>
                        Email:
                    </strong>

                    ${order.customer?.email || "-"}

                </p>


                <p>

                    <strong>
                        Phone:
                    </strong>

                    ${order.customer?.phone || "-"}

                </p>


                <p>

                    <strong>
                        Country:
                    </strong>

                    ${order.customer?.country || "-"}

                </p>


                <p>

                    <strong>
                        City:
                    </strong>

                    ${order.customer?.city || "-"}

                </p>


                <p>

                    <strong>
                        Address:
                    </strong>

                    ${order.customer?.address || "-"}

                </p>


                <p>

                    <strong>
                        Postal:
                    </strong>

                    ${order.customer?.postal || "-"}

                </p>


                <p>

                    <strong>
                        Payment:
                    </strong>

                    ${order.payment || "-"}

                </p>


                <p>

                    <strong>
                        Date:
                    </strong>

                    ${order.date || "-"}

                </p>


                <h3>
                    🛍 Products
                </h3>


                <ul>

                    ${productsHTML}

                </ul>


                <h3>

                    💰 Total:

                    $${total.toFixed(2)}

                </h3>


                <p>

                    <strong>
                        Status:
                    </strong>


                    <select
                        onchange="
                            changeStatus(
                                ${originalIndex},
                                this.value
                            )
                        ">

                        <option
                            value="Pending"
                            ${
                                status === "Pending"
                                    ? "selected"
                                    : ""
                            }>

                            ⏳ Pending

                        </option>


                        <option
                            value="Processing"
                            ${
                                status === "Processing"
                                    ? "selected"
                                    : ""
                            }>

                            ⚙️ Processing

                        </option>


                        <option
                            value="Shipped"
                            ${
                                status === "Shipped"
                                    ? "selected"
                                    : ""
                            }>

                            🚚 Shipped

                        </option>


                        <option
                            value="Delivered"
                            ${
                                status === "Delivered"
                                    ? "selected"
                                    : ""
                            }>

                            ✅ Delivered

                        </option>

                    </select>

                </p>


                <div class="order-actions">


                    <button
                        onclick="
                            viewOrder(
                                ${originalIndex}
                            )
                        "
                        class="view-btn">

                        👁 View

                    </button>


                    <button
                        onclick="
                            printInvoice(
                                ${originalIndex}
                            )
                        "
                        class="print-btn">

                        🖨 Print

                    </button>


                    <button
                        onclick="
                            deleteOrder(
                                ${originalIndex}
                            )
                        "
                        class="delete-btn">

                        🗑 Delete

                    </button>


                </div>

            </div>

        `;

    });

}
// =====================================
// 🔄 CHANGE ORDER STATUS
// PART 4 / 10
// =====================================

async function changeStatus(index, newStatus) {

    // التأكد من وجود الطلب
    if (
        index < 0 ||
        index >= orders.length
    ) {

        console.error(
            "❌ Invalid order index"
        );

        return;

    }


    const order =
        orders[index];


    // التأكد من وجود Firebase ID
    if (!order.firebaseId) {

        console.error(
            "❌ Firebase ID not found"
        );

        return;

    }


    try {

        // تحديث الحالة في Firebase
        await updateDoc(

            doc(
                db,
                "orders",
                order.firebaseId
            ),

            {
                status: newStatus
            }

        );


        // تحديث البيانات محليًا
        orders[index].status =
            newStatus;


        console.log(
            "✅ Order status updated:",
            newStatus
        );


        // إعادة عرض الطلبات
        displayFilteredOrders();


        // تحديث الإحصائيات
        updateStats();


    } catch (error) {

        console.error(
            "❌ Error updating order:",
            error
        );


        alert(
            "❌ Unable to update order status."
        );

    }

}
// =====================================
// 🗑 DELETE ORDER
// PART 5 / 10
// =====================================

async function deleteOrder(index) {

    // التأكد من وجود الطلب
    if (
        index < 0 ||
        index >= orders.length
    ) {

        console.error(
            "❌ Invalid order index"
        );

        return;

    }


    const order =
        orders[index];


    // تأكيد الحذف
    const confirmed =
        confirm(
            "🗑 Are you sure you want to delete this order?"
        );


    if (!confirmed) return;


    // التأكد من Firebase ID
    if (!order.firebaseId) {

        console.error(
            "❌ Firebase ID not found"
        );

        alert(
            "❌ Unable to delete this order."
        );

        return;

    }


    try {

        // حذف الطلب من Firebase
        await deleteDoc(

            doc(
                db,
                "orders",
                order.firebaseId
            )

        );


        // حذف الطلب من القائمة المحلية
        orders.splice(index, 1);


        console.log(
            "🗑 Order deleted successfully"
        );


        // إعادة عرض الطلبات
        displayFilteredOrders();


        // تحديث الإحصائيات
        updateStats();


        alert(
            "✅ Order deleted successfully"
        );


    } catch (error) {

        console.error(
            "❌ Error deleting order:",
            error
        );


        alert(
            "❌ Unable to delete order."
        );

    }

}
