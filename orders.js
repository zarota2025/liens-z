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
// =====================================
// 📦 RENDER ORDERS
// PART 3 / 8
// =====================================

function renderOrders(list = orders) {

    if (!ordersList) return;

    ordersList.innerHTML = "";


    // لا توجد طلبات
    if (list.length === 0) {

        ordersList.innerHTML = `

            <div class="empty-orders">

                📦 No orders found.

            </div>

        `;

        return;

    }


    list.forEach(order => {

        let productsHTML = "";


        // المنتجات
        if (
            order.products &&
            Array.isArray(order.products)
        ) {

            order.products.forEach(product => {

                const quantity =
                    Number(product.quantity || 0);

                const price =
                    Number(product.price || 0);

                productsHTML += `

                    <li>

                        ${product.name}

                        × ${quantity}

                        -

                        $${(
                            price * quantity
                        ).toFixed(2)}

                    </li>

                `;

            });

        }


        // رقم الطلب الأصلي
        const originalIndex =
            orders.indexOf(order);


        const status =
            order.status || "Pending";


        ordersList.innerHTML += `

            <div
                class="order-card ${status.toLowerCase()}">

                <h2>
                    📦 Order
                </h2>


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


                <p>
                    <strong>Payment:</strong>
                    ${order.payment || "-"}
                </p>


                <p>
                    <strong>Date:</strong>
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

                    $${Number(
                        order.total || 0
                    ).toFixed(2)}

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
// 🗑 DELETE ORDER
// PART 4 / 8
// =====================================

window.deleteOrder = async function(index) {

    const order = orders[index];

    if (!order) return;


    const confirmed =
        confirm(
            "Are you sure you want to delete this order?"
        );


    if (!confirmed) return;


    try {

        await deleteDoc(

            doc(
                db,
                "orders",
                order.firebaseId
            )

        );


        // حذف من القائمة المحلية
        orders.splice(index, 1);


        // تحديث العرض
        renderOrders();


        // تحديث الإحصائيات
        updateStats();


        alert(
            "🗑 Order deleted successfully"
        );


    } catch (error) {

        console.error(
            "❌ Delete order error:",
            error
        );


        alert(
            "❌ Unable to delete the order."
        );

    }

};


// =====================================
// 🔄 CHANGE ORDER STATUS
// =====================================

window.changeStatus = async function(
    index,
    status
) {

    const order = orders[index];

    if (!order) return;


    try {

        await updateDoc(

            doc(
                db,
                "orders",
                order.firebaseId
            ),

            {
                status: status
            }

        );


        // تحديث القائمة المحلية
        orders[index].status = status;


        // إعادة العرض
        renderOrders();


        // تحديث الإحصائيات
        updateStats();


    } catch (error) {

        console.error(
            "❌ Status update error:",
            error
        );


        alert(
            "❌ Unable to update order status."
        );

    }

};
// =====================================
// 📊 ORDER STATISTICS
// PART 5 / 8
// =====================================

function updateStats() {

    let pending = 0;

    let processing = 0;

    let shipped = 0;

    let delivered = 0;


    orders.forEach(order => {

        const status =
            order.status || "Pending";


        switch (status) {

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


    // =================================
    // UPDATE HTML
    // =================================

    const pendingCount =
        document.getElementById(
            "pending-count"
        );


    const processingCount =
        document.getElementById(
            "processing-count"
        );


    const shippedCount =
        document.getElementById(
            "shipped-count"
        );


    const deliveredCount =
        document.getElementById(
            "delivered-count"
        );


    if (pendingCount) {

        pendingCount.textContent =
            pending;

    }


    if (processingCount) {

        processingCount.textContent =
            processing;

    }


    if (shippedCount) {

        shippedCount.textContent =
            shipped;

    }


    if (deliveredCount) {

        deliveredCount.textContent =
            delivered;

    }

}
// =====================================
// 🔎 SEARCH + FILTER + SORT
// PART 6 / 8
// =====================================

function applyOrderFilters() {

    const keyword =
        searchOrder
            ? searchOrder.value.toLowerCase().trim()
            : "";

    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "all";

    const selectedSort =
        sortOrders
            ? sortOrders.value
            : "newest";


    // =================================
    // FILTER
    // =================================

    let filteredOrders = orders.filter(order => {

        const customer =
            order.customer || {};


        const searchText = `

            ${customer.fullname || ""}

            ${customer.email || ""}

            ${customer.phone || ""}

            ${customer.country || ""}

            ${customer.city || ""}

            ${customer.address || ""}

        `.toLowerCase();


        // البحث
        if (
            keyword &&
            !searchText.includes(keyword)
        ) {

            return false;

        }


        // فلترة الحالة
        if (
            selectedStatus !== "all" &&
            (order.status || "Pending")
                !== selectedStatus
        ) {

            return false;

        }


        return true;

    });


    // =================================
    // SORT
    // =================================

    filteredOrders.sort((a, b) => {

        // الأعلى سعرًا
        if (selectedSort === "high") {

            return (
                Number(b.total || 0) -
                Number(a.total || 0)
            );

        }


        // الأقل سعرًا
        if (selectedSort === "low") {

            return (
                Number(a.total || 0) -
                Number(b.total || 0)
            );

        }


        const dateA =
            new Date(a.date || 0).getTime();

        const dateB =
            new Date(b.date || 0).getTime();


        // الأقدم
        if (selectedSort === "oldest") {

            return dateA - dateB;

        }


        // الأحدث
        return dateB - dateA;

    });


    // =================================
    // DISPLAY
    // =================================

    renderOrders(filteredOrders);

}


// =====================================
// 🔎 SEARCH EVENT
// =====================================

if (searchOrder) {

    searchOrder.addEventListener(
        "input",
        applyOrderFilters
    );

}


// =====================================
// 📦 STATUS FILTER EVENT
// =====================================

if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        applyOrderFilters
    );

}


// =====================================
// ↕️ SORT EVENT
// =====================================

if (sortOrders) {

    sortOrders.addEventListener(
        "change",
        applyOrderFilters
    );

}
// =====================================
// 👁 VIEW ORDER
// 🖨 PRINT INVOICE
// PART 7 / 8
// =====================================


// =====================================
// 👁 VIEW ORDER DETAILS
// =====================================

window.viewOrder = function(index) {

    const order = orders[index];

    if (!order) return;


    const details =
        document.getElementById(
            "order-details"
        );


    if (!details) {

        alert(
            "❌ Order details window was not found."
        );

        return;

    }


    let productsHTML = "";


    if (
        order.products &&
        Array.isArray(order.products)
    ) {

        order.products.forEach(product => {

            const quantity =
                Number(product.quantity || 0);

            const price =
                Number(product.price || 0);


            productsHTML += `

                <li>

                    ${product.name}

                    × ${quantity}

                    — $${(
                        price * quantity
                    ).toFixed(2)}

                </li>

            `;

        });

    }


    details.innerHTML = `

        <h2>
            📦 Order Details
        </h2>


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


        <p>
            <strong>Payment:</strong>
            ${order.payment || "-"}
        </p>


        <p>
            <strong>Date:</strong>
            ${order.date || "-"}
        </p>


        <p>
            <strong>Status:</strong>
            ${order.status || "Pending"}
        </p>


        <h3>
            🛍 Products
        </h3>


        <ul>

            ${productsHTML}

        </ul>


        <h3>

            💰 Total:

            $${Number(
                order.total || 0
            ).toFixed(2)}

        </h3>

    `;


    const modal =
        document.getElementById(
            "order-modal"
        );


    if (modal) {

        modal.style.display = "flex";

    }

};


// =====================================
// ❌ CLOSE ORDER MODAL
// =====================================

const closeModal =
    document.getElementById(
        "close-modal"
    );


if (closeModal) {

    closeModal.onclick = function() {

        const modal =
            document.getElementById(
                "order-modal"
            );


        if (modal) {

            modal.style.display = "none";

        }

    };

}


// =====================================
// 🖨 PRINT INVOICE
// =====================================

window.printInvoice = function(index) {

    const order = orders[index];

    if (!order) return;


    let productsHTML = "";


    if (
        order.products &&
        Array.isArray(order.products)
    ) {

        order.products.forEach(product => {

            const quantity =
                Number(product.quantity || 0);

            const price =
                Number(product.price || 0);


            productsHTML += `

                <tr>

                    <td>
                        ${product.name}
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


    const invoiceWindow =
        window.open(
            "",
            "_blank",
            "width=900,height=700"
        );


    if (!invoiceWindow) {

        alert(
            "❌ Please allow pop-ups to print the invoice."
        );

        return;

    }


    invoiceWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <meta charset="UTF-8">

            <title>
                LIENS Z - Invoice
            </title>


            <style>

                body {

                    font-family:
                        Arial, sans-serif;

                    padding: 40px;

                    color: #222;

                }


                .invoice-header {

                    display:
                        flex;

                    justify-content:
                        space-between;

                    align-items:
                        center;

                    border-bottom:
                        2px solid #222;

                    padding-bottom:
                        20px;

                    margin-bottom:
                        25px;

                }


                .logo {

                    font-size:
                        28px;

                    font-weight:
                        bold;

                }


                .invoice-title {

                    font-size:
                        24px;

                    font-weight:
                        bold;

                }


                .customer {

                    margin-bottom:
                        25px;

                }


                .customer p {

                    margin:
                        6px 0;

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
                        1px solid #ccc;

                    padding:
                        12px;

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

                    margin-top:
                        25px;

                    font-size:
                        22px;

                    font-weight:
                        bold;

                }


                .footer {

                    margin-top:
                        50px;

                    text-align:
                        center;

                    color:
                        #777;

                }


                @media print {

                    body {

                        padding:
                            20px;

                    }

                }

            </style>

        </head>


        <body>


            <div class="invoice-header">

                <div class="logo">
                    LIENS Z
                </div>


                <div class="invoice-title">
                    INVOICE
                </div>

            </div>


            <div class="customer">

                <p>
                    <strong>
                        Customer:
                    </strong>

                    ${
                        order.customer?.fullname
                        || "-"
                    }

                </p>


                <p>

                    <strong>
                        Email:
                    </strong>

                    ${
                        order.customer?.email
                        || "-"
                    }

                </p>


                <p>

                    <strong>
                        Phone:
                    </strong>

                    ${
                        order.customer?.phone
                        || "-"
                    }

                </p>


                <p>

                    <strong>
                        Address:
                    </strong>

                    ${
                        order.customer?.address
                        || "-"
                    }

                </p>


                <p>

                    <strong>
                        Date:
                    </strong>

                    ${
                        order.date
                        || "-"
                    }

                </p>


                <p>

                    <strong>
                        Payment:
                    </strong>

                    ${
                        order.payment
                        || "-"
                    }

                </p>

            </div>


            <table>

                <thead>

                    <tr>

                        <th>
                            Product
                        </th>

                        <th>
                            Qty
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

                $${Number(
                    order.total || 0
                ).toFixed(2)}

            </div>


            <div class="footer">

                Thank you for shopping
                with LIENS Z ❤️

            </div>


        </body>

        </html>

    `);


    invoiceWindow.document.close();


    invoiceWindow.focus();


    setTimeout(() => {

        invoiceWindow.print();

    }, 500);

};
// =====================================
// 🚀 START ORDERS SYSTEM
// PART 8 / 8
// =====================================


// =====================================
// 🔄 APPLY FILTERS AFTER LOADING
// =====================================

function refreshOrdersView() {

    if (
        typeof applyOrderFilters === "function"
    ) {

        applyOrderFilters();

    } else {

        renderOrders();

    }

}


// =====================================
// 🔥 LOAD EVERYTHING
// =====================================

async function startOrdersSystem() {

    try {

        await loadOrders();

        refreshOrdersView();

        updateStats();

        console.log(
            "✅ LIENS Z Orders System Loaded"
        );


    } catch (error) {

        console.error(
            "❌ Orders system error:",
            error
        );

    }

}


// =====================================
// ▶️ START
// =====================================

startOrdersSystem();
