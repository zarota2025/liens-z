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
// =====================================
// 🔎 SEARCH ORDERS
// PART 6 / 10
// =====================================

function searchOrders() {

    const searchText =
        searchOrder
            ? searchOrder.value
                .trim()
                .toLowerCase()
            : "";


    // إذا كان مربع البحث فارغًا
    // نعرض جميع الطلبات
    if (!searchText) {

        displayFilteredOrders();

        return;

    }


    // البحث داخل الطلبات
    const filteredOrders =
        orders.filter(order => {

            const name =
                order.customer?.fullname
                || "";

            const email =
                order.customer?.email
                || "";

            const phone =
                order.customer?.phone
                || "";

            const country =
                order.customer?.country
                || "";

            const city =
                order.customer?.city
                || "";


            return (

                name
                    .toLowerCase()
                    .includes(searchText)

                ||

                email
                    .toLowerCase()
                    .includes(searchText)

                ||

                phone
                    .toLowerCase()
                    .includes(searchText)

                ||

                country
                    .toLowerCase()
                    .includes(searchText)

                ||

                city
                    .toLowerCase()
                    .includes(searchText)

            );

        });


    // عرض النتائج
    renderOrders(filteredOrders);

}


// =====================================
// 🎛 SEARCH EVENT
// =====================================

if (searchOrder) {

    searchOrder.addEventListener(
        "input",
        searchOrders
    );

}
// =====================================
// 📦 FILTER & SORT ORDERS
// PART 7 / 10
// =====================================

function displayFilteredOrders() {

    let filteredOrders = [...orders];


    // =================================
    // 🔎 SEARCH
    // =================================

    const searchText =
        searchOrder
            ? searchOrder.value
                .trim()
                .toLowerCase()
            : "";


    if (searchText) {

        filteredOrders =
            filteredOrders.filter(order => {

                const name =
                    order.customer?.fullname || "";

                const email =
                    order.customer?.email || "";

                const phone =
                    order.customer?.phone || "";

                const country =
                    order.customer?.country || "";

                const city =
                    order.customer?.city || "";


                return (

                    name
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    email
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    phone
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    country
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    city
                        .toLowerCase()
                        .includes(searchText)

                );

            });

    }


    // =================================
    // 📦 STATUS FILTER
    // =================================

    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "all";


    if (
        selectedStatus !== "all"
    ) {

        filteredOrders =
            filteredOrders.filter(order => {

                const status =
                    order.status || "Pending";

                return status === selectedStatus;

            });

    }


    // =================================
    // 🔃 SORT
    // =================================

    const selectedSort =
        sortOrders
            ? sortOrders.value
            : "newest";


    // ---------------------------------
    // 🆕 NEWEST
    // ---------------------------------

    if (
        selectedSort === "newest"
    ) {

        filteredOrders.sort(
            (a, b) => {

                return (
                    new Date(b.date || 0) -
                    new Date(a.date || 0)
                );

            }
        );

    }


    // ---------------------------------
    // 📅 OLDEST
    // ---------------------------------

    if (
        selectedSort === "oldest"
    ) {

        filteredOrders.sort(
            (a, b) => {

                return (
                    new Date(a.date || 0) -
                    new Date(b.date || 0)
                );

            }
        );

    }


    // ---------------------------------
    // 💰 HIGHEST PRICE
    // ---------------------------------

    if (
        selectedSort === "high"
    ) {

        filteredOrders.sort(
            (a, b) => {

                return (
                    getOrderTotal(b) -
                    getOrderTotal(a)
                );

            }
        );

    }


    // ---------------------------------
    // 💵 LOWEST PRICE
    // ---------------------------------

    if (
        selectedSort === "low"
    ) {

        filteredOrders.sort(
            (a, b) => {

                return (
                    getOrderTotal(a) -
                    getOrderTotal(b)
                );

            }
        );

    }


    // =================================
    // 🖥 DISPLAY RESULTS
    // =================================

    renderOrders(filteredOrders);

}


// =====================================
// 💰 GET ORDER TOTAL
// =====================================

function getOrderTotal(order) {

    // إذا كان total موجودًا في Firebase
    if (
        order.total !== undefined &&
        order.total !== null
    ) {

        return Number(
            order.total
        ) || 0;

    }


    // إذا لم يكن total موجودًا
    // نحسبه من المنتجات
    if (
        order.products &&
        Array.isArray(order.products)
    ) {

        return order.products.reduce(
            (total, product) => {

                const price =
                    Number(
                        product.price || 0
                    );

                const quantity =
                    Number(
                        product.quantity || 0
                    );


                return total +
                    (price * quantity);

            },
            0
        );

    }


    return 0;

}


// =====================================
// 🎛 FILTER EVENT
// =====================================

if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        displayFilteredOrders
    );

}


// =====================================
// 🔃 SORT EVENT
// =====================================

if (sortOrders) {

    sortOrders.addEventListener(
        "change",
        displayFilteredOrders
    );

}
// =====================================
// 👁 VIEW ORDER DETAILS
// PART 8 / 10
// =====================================

function viewOrder(index) {

    if (
        index < 0 ||
        index >= orders.length
    ) {

        console.error(
            "❌ Invalid order index"
        );

        return;

    }


    const order = orders[index];


    if (!orderDetails) return;


    let productsHTML = "";


    if (
        order.products &&
        Array.isArray(order.products)
    ) {

        order.products.forEach(product => {

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


    const total =
        getOrderTotal(order);


    orderDetails.innerHTML = `

        <h2>
            📦 Order Details
        </h2>


        <hr>


        <h3>
            👤 Customer
        </h3>


        <p>
            <strong>Name:</strong>
            ${order.customer?.fullname || "-"}
        </p>


        <p>
            <strong>Email:</strong>
            ${order.customer?.email || "-"}
        </p>


        <p>
            <strong>Phone:</strong>
            ${order.customer?.phone || "-"}
        </p>


        <p>
            <strong>Country:</strong>
            ${order.customer?.country || "-"}
        </p>


        <p>
            <strong>City:</strong>
            ${order.customer?.city || "-"}
        </p>


        <p>
            <strong>Address:</strong>
            ${order.customer?.address || "-"}
        </p>


        <p>
            <strong>Postal:</strong>
            ${order.customer?.postal || "-"}
        </p>


        <hr>


        <h3>
            💳 Payment
        </h3>


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


        <p>
            <strong>
                Status:
            </strong>

            ${order.status || "Pending"}
        </p>


        <hr>


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

    `;


    // فتح النافذة
    if (orderModal) {

        orderModal.style.display =
            "flex";

    }

}


// =====================================
// ❌ CLOSE ORDER MODAL
// =====================================

if (closeModal) {

    closeModal.addEventListener(
        "click",
        () => {

            if (orderModal) {

                orderModal.style.display =
                    "none";

            }

        }
    );

}


// =====================================
// 🖱 CLOSE BY CLICKING OUTSIDE
// =====================================

if (orderModal) {

    orderModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                orderModal
            ) {

                orderModal.style.display =
                    "none";

            }

        }
    );

}
// =====================================
// 📊 ORDER STATISTICS
// PART 9 / 10
// =====================================

function updateStats() {

    const ordersCount =
        document.getElementById(
            "orders-count"
        );

    const revenueTotal =
        document.getElementById(
            "revenue-total"
        );


    // =============================
    // 📦 ORDERS COUNT
    // =============================

    if (ordersCount) {

        ordersCount.textContent =
            orders.length;

    }


    // =============================
    // 💰 TOTAL REVENUE
    // =============================

    let totalRevenue = 0;


    orders.forEach(order => {

        totalRevenue +=
            getOrderTotal(order);

    });


    if (revenueTotal) {

        revenueTotal.textContent =
            "$" +
            totalRevenue.toFixed(2);

    }

}


// =====================================
// 🖨 PRINT INVOICE
// =====================================

function printInvoice(index) {

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


    let productsHTML = "";


    if (
        order.products &&
        Array.isArray(order.products)
    ) {

        order.products.forEach(product => {

            const quantity =
                Number(
                    product.quantity || 0
                );

            const price =
                Number(
                    product.price || 0
                );


            productsHTML += `

                <tr>

                    <td>
                        ${product.name || "Product"}
                    </td>

                    <td>
                        ${quantity}
                    </td>

                    <td>
                        $${price.toFixed(2)}
                    </td>

                    <td>
                        $${(
                            price * quantity
                        ).toFixed(2)}
                    </td>

                </tr>

            `;

        });

    }


    const total =
        getOrderTotal(order);


    const invoiceWindow =
        window.open(
            "",
            "_blank",
            "width=800,height=900"
        );


    if (!invoiceWindow) {

        alert(
            "⚠️ Please allow pop-ups to print the invoice."
        );

        return;

    }


    invoiceWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>
                LIENS Z - Invoice
            </title>

            <style>

                body {

                    font-family:
                        Arial,
                        sans-serif;

                    padding:
                        40px;

                    color:
                        #222;

                }


                h1 {

                    margin-bottom:
                        5px;

                }


                .invoice-header {

                    display:
                        flex;

                    justify-content:
                        space-between;

                    margin-bottom:
                        30px;

                }


                .customer {

                    margin-bottom:
                        25px;

                }


                table {

                    width:
                        100%;

                    border-collapse:
                        collapse;

                    margin-top:
                        20px;

                }


                th,
                td {

                    border:
                        1px solid #ddd;

                    padding:
                        10px;

                    text-align:
                        left;

                }


                th {

                    background:
                        #f2f2f2;

                }


                .total {

                    text-align:
                        right;

                    font-size:
                        20px;

                    font-weight:
                        bold;

                    margin-top:
                        25px;

                }

            </style>

        </head>


        <body>


            <div class="invoice-header">

                <div>

                    <h1>
                        LIENS Z
                    </h1>

                    <p>
                        Customer Invoice
                    </p>

                </div>


                <div>

                    <p>
                        <strong>
                            Date:
                        </strong>

                        ${
                            order.date || "-"
                        }

                    </p>

                    <p>
                        <strong>
                            Status:
                        </strong>

                        ${
                            order.status ||
                            "Pending"
                        }

                    </p>

                </div>

            </div>


            <div class="customer">

                <h3>
                    Customer
                </h3>

                <p>
                    <strong>
                        Name:
                    </strong>

                    ${
                        order.customer?.fullname ||
                        "-"
                    }

                </p>

                <p>
                    <strong>
                        Email:
                    </strong>

                    ${
                        order.customer?.email ||
                        "-"
                    }

                </p>

                <p>
                    <strong>
                        Phone:
                    </strong>

                    ${
                        order.customer?.phone ||
                        "-"
                    }

                </p>

                <p>
                    <strong>
                        Address:
                    </strong>

                    ${
                        order.customer?.address ||
                        "-"
                    }

                </p>

            </div>


            <h3>
                Products
            </h3>


            <table>

                <thead>

                    <tr>

                        <th>
                            Product
                        </th>

                        <th>
                            Quantity
                        </th>

                        <th>
                            Price
                        </th>

                        <th>
                            Total
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${productsHTML}

                </tbody>

            </table>


            <div class="total">

                Total:

                $${total.toFixed(2)}

            </div>


            <script>

                window.onload = function() {

                    window.print();

                };

            <\/script>


        </body>

        </html>

    `);


    invoiceWindow.document.close();

}
// =====================================
// 🚀 START ORDERS SYSTEM
// PART 10 / 10
// =====================================


// =====================================
// 🎛 FILTER EVENTS
// =====================================

if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        displayFilteredOrders
    );

}


// =====================================
// 🔃 SORT EVENTS
// =====================================

if (sortOrders) {

    sortOrders.addEventListener(
        "change",
        displayFilteredOrders
    );

}


// =====================================
// 🔎 SEARCH EVENT
// =====================================

if (searchOrder) {

    searchOrder.addEventListener(
        "input",
        searchOrders
    );

}

// =====================================
// 📦 LOAD ORDERS
// =====================================

loadOrders();
