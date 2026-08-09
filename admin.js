import {
    addProduct,
    getProducts,
    deleteProduct as deleteFirebaseProduct,
    updateProduct
} from "./firebase-products.js";

import {
    db,
    collection,
    getDocs
} from "./firebase.js";


// =====================================
// 🔐 ADMIN LOGIN CHECK
// =====================================

if (localStorage.getItem("adminLogged") !== "true") {

    location.href = "admin-login.html";

}


// =====================================
// LIENS Z - ADMIN PANEL
// =====================================

let adminProducts = [];


// =====================================
// PRODUCT FORM ELEMENTS
// =====================================

const productName =
    document.getElementById("product-name");

const productPrice =
    document.getElementById("product-price");

const productOldPrice =
    document.getElementById("product-old-price");

const productDiscount =
    document.getElementById("product-discount");

const productBadge =
    document.getElementById("product-badge");

const productCategory =
    document.getElementById("product-category");

const productImage =
    document.getElementById("product-image");

const saveButton =
    document.getElementById("save-product");

const productsContainer =
    document.getElementById("admin-products");


// =====================================
// VARIABLES
// =====================================

let selectedImage = "";

let editingIndex = -1;

let salesChart = null;


// =====================================
// CLOUDINARY
// =====================================

const CLOUD_NAME = "m3wucnpl";

const UPLOAD_PRESET = "liens-z";


// =====================================
// IMAGE UPLOAD
// =====================================

async function uploadImage(file) {

    const formData = new FormData();

    formData.append("file", file);

    formData.append(
        "upload_preset",
        UPLOAD_PRESET
    );

    try {

        const response = await fetch(

            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,

            {
                method: "POST",
                body: formData
            }

        );

        const data =
            await response.json();

        console.log(data);

        if (!response.ok) {

            throw new Error(
                data.error?.message ||
                "Upload failed"
            );

        }

        return data.secure_url;

    } catch (error) {

        console.error(error);

        alert(
            "❌ Image upload failed: " +
            error.message
        );

        throw error;

    }

}


// =====================================
// IMAGE PREVIEW
// =====================================

if (productImage) {

    productImage.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];

            if (!file) return;

            const reader =
                new FileReader();

            reader.onload =
                function (e) {

                    selectedImage =
                        e.target.result;

                };

            reader.readAsDataURL(file);

        }
    );

}
// =====================================
// 📦 RENDER ADMIN PRODUCTS
// =====================================

function renderProducts() {

    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    if (adminProducts.length === 0) {

        productsContainer.innerHTML = `
            <div class="empty-products">
                <p>📦 No products yet.</p>
            </div>
        `;

        return;
    }


    adminProducts.forEach((product, index) => {

        productsContainer.innerHTML += `

        <div class="admin-card">

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="admin-card-content">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    💰 $${product.price}
                </p>

                ${
                    product.oldPrice
                    ? `
                    <small>
                        Old price:
                        $${product.oldPrice}
                    </small>
                    `
                    : ""
                }

                <p>
                    📂 ${product.category}
                </p>

                ${
                    product.discount
                    ? `
                    <span>
                        ${product.discount}
                    </span>
                    `
                    : ""
                }

                ${
                    product.badge
                    ? `
                    <span>
                        ${product.badge}
                    </span>
                    `
                    : ""
                }

                <br><br>

                <div
                    class="admin-card-actions"
                    style="
                        display:flex;
                        gap:10px;
                        flex-wrap:wrap;
                    "
                >

                    <button
                        class="edit-btn"
                        onclick="editProduct(${index})"
                    >
                        ✏️ Edit
                    </button>


                    <button
                        class="delete-btn"
                        onclick="deleteProduct(${index})"
                    >
                        🗑 Delete
                    </button>

                </div>

            </div>

        </div>

        `;

    });

}
// =====================================
// ➕ ADD / ✏️ UPDATE PRODUCT
// =====================================

if (saveButton) {

    saveButton.addEventListener(
        "click",
        async function () {

            // -----------------------------
            // VALIDATION
            // -----------------------------

            if (
                !productName.value.trim() ||
                !productPrice.value.trim() ||
                !productCategory.value.trim() ||
                (
                    editingIndex === -1 &&
                    productImage.files.length === 0
                )
            ) {

                alert(
                    "⚠️ Please fill all required fields"
                );

                return;

            }


            // -----------------------------
            // IMAGE
            // -----------------------------

            let imageUrl = selectedImage;


            if (productImage.files.length > 0) {

                saveButton.disabled = true;

                saveButton.textContent =
                    "⏳ Uploading...";


                try {

                    imageUrl =
                        await uploadImage(
                            productImage.files[0]
                        );

                } catch (error) {

                    saveButton.disabled = false;

                    saveButton.textContent =
                        "➕ Add Product";

                    return;

                }

            }


            // -----------------------------
            // PRODUCT DATA
            // -----------------------------

            const productData = {

                id:
                    editingIndex === -1
                    ? Date.now()
                    : adminProducts[editingIndex].id,

                name:
                    productName.value.trim(),

                price:
                    Number(productPrice.value),

                oldPrice:
                    productOldPrice.value
                    ? Number(productOldPrice.value)
                    : 0,

                discount:
                    productDiscount.value.trim(),

                badge:
                    productBadge.value.trim(),

                category:
                    productCategory.value.trim(),

                image:
                    imageUrl

            };


            // -----------------------------
            // ADD PRODUCT
            // -----------------------------

            if (editingIndex === -1) {

                try {

                    await addProduct(
                        productData
                    );

                    alert(
                        "✅ Product added successfully!"
                    );

                } catch (error) {

                    console.error(error);

                    alert(
                        "❌ Failed to add product"
                    );

                    saveButton.disabled = false;

                    saveButton.textContent =
                        "➕ Add Product";

                    return;

                }

            }


            // -----------------------------
            // UPDATE PRODUCT
            // -----------------------------

            else {

                try {

                    await updateProduct(
                        adminProducts[editingIndex].id,
                        productData
                    );

                    alert(
                        "✏️ Product updated successfully!"
                    );

                } catch (error) {

                    console.error(error);

                    alert(
                        "❌ Failed to update product"
                    );

                    saveButton.disabled = false;

                    return;

                }

            }


            // -----------------------------
            // RELOAD PRODUCTS
            // -----------------------------

            await loadProducts();


            // -----------------------------
            // RESET FORM
            // -----------------------------

            productName.value = "";

            productPrice.value = "";

            productOldPrice.value = "";

            productDiscount.value = "";

            productBadge.value = "";

            productCategory.value = "";

            productImage.value = "";

            selectedImage = "";

            editingIndex = -1;


            saveButton.textContent =
                "➕ Add Product";

            saveButton.disabled = false;

        }
    );

}
// =====================================
// ✏️ EDIT PRODUCT
// =====================================

window.editProduct = function (index) {

    const product = adminProducts[index];

    if (!product) return;


    productName.value =
        product.name || "";

    productPrice.value =
        product.price || "";

    productOldPrice.value =
        product.oldPrice || "";

    productDiscount.value =
        product.discount || "";

    productBadge.value =
        product.badge || "";

    productCategory.value =
        product.category || "";


    // استخدام الصورة القديمة
    selectedImage =
        product.image || "";


    editingIndex = index;


    if (saveButton) {

        saveButton.textContent =
            "💾 Update Product";

    }


    // الانتقال إلى نموذج المنتج
    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};


// =====================================
// 🗑 DELETE PRODUCT
// =====================================

window.deleteProduct = async function (index) {

    const product =
        adminProducts[index];

    if (!product) return;


    const confirmed = confirm(
        `Are you sure you want to delete "${product.name}"?`
    );


    if (!confirmed) return;


    try {

        await deleteFirebaseProduct(
            product.id
        );


        alert(
            "🗑 Product deleted successfully!"
        );


        await loadProducts();


    } catch (error) {

        console.error(error);

        alert(
            "❌ Failed to delete product"
        );

    }

};
// =====================================
// 📦 LOAD PRODUCTS
// =====================================

async function loadProducts() {

    try {

        adminProducts =
            await getProducts();

        renderProducts();

        updateDashboard();

        updateBestProducts();

        drawSalesChart();

    } catch (error) {

        console.error(
            "Error loading products:",
            error
        );

        if (productsContainer) {

            productsContainer.innerHTML = `
                <p>
                    ❌ Failed to load products.
                </p>
            `;

        }

    }

}


// =====================================
// 🚪 LOGOUT
// =====================================

const logoutBtn =
    document.getElementById("logout-btn");


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "adminLogged"
            );

            window.location.href =
                "admin-login.html";

        }
    );

}


// =====================================
// 📊 UPDATE DASHBOARD
// =====================================

async function updateDashboard() {

    try {

        // -----------------------------
        // LOAD ORDERS FROM FIREBASE
        // -----------------------------

        const snapshot =
            await getDocs(
                collection(db, "orders")
            );


        const orders = [];


        snapshot.forEach(document => {

            orders.push({
                id: document.id,
                ...document.data()
            });

        });


        // -----------------------------
        // FAVORITES
        // -----------------------------

        const favorites =
            JSON.parse(
                localStorage.getItem(
                    "favorites"
                )
            ) || [];


        // -----------------------------
        // PRODUCTS COUNT
        // -----------------------------

        const productsCount =
            document.getElementById(
                "products-count"
            );


        if (productsCount) {

            productsCount.textContent =
                adminProducts.length;

        }


        // -----------------------------
        // ORDERS COUNT
        // -----------------------------

        const ordersCount =
            document.getElementById(
                "orders-count"
            );


        if (ordersCount) {

            ordersCount.textContent =
                orders.length;

        }


        // -----------------------------
        // FAVORITES COUNT
        // -----------------------------

        const favoritesCount =
            document.getElementById(
                "favorites-count"
            );


        if (favoritesCount) {

            favoritesCount.textContent =
                favorites.length;

        }


        // -----------------------------
        // CUSTOMERS
        // -----------------------------

        const customers = new Set();


        orders.forEach(order => {

            if (
                order.customer &&
                order.customer.email
            ) {

                customers.add(
                    order.customer.email
                );

            }

        });


        const customersCount =
            document.getElementById(
                "customers-count"
            );


        if (customersCount) {

            customersCount.textContent =
                customers.size;

        }


        // -----------------------------
        // REVENUE
        // -----------------------------

        let revenue = 0;


        orders.forEach(order => {

            if (
                order.products &&
                Array.isArray(order.products)
            ) {

                order.products.forEach(
                    product => {

                        revenue +=
                            Number(product.price || 0) *
                            Number(product.quantity || 0);

                    }
                );

            }

        });


        const revenueTotal =
            document.getElementById(
                "revenue-total"
            );


        if (revenueTotal) {

            revenueTotal.textContent =
                "$" + revenue.toFixed(2);

        }


        // -----------------------------
        // TODAY
        // -----------------------------

        let dailyRevenue = 0;


        const today =
            new Date();


        orders.forEach(order => {

            const orderDate =
                new Date(order.date);


            if (
                orderDate.getDate() ===
                today.getDate() &&

                orderDate.getMonth() ===
                today.getMonth() &&

                orderDate.getFullYear() ===
                today.getFullYear()
            ) {

                if (
                    order.products &&
                    Array.isArray(order.products)
                ) {

                    order.products.forEach(
                        product => {

                            dailyRevenue +=
                                Number(product.price || 0) *
                                Number(product.quantity || 0);

                        }
                    );

                }

            }

        });


        const dailyRevenueElement =
            document.getElementById(
                "daily-revenue"
            );


        if (dailyRevenueElement) {

            dailyRevenueElement.textContent =
                "$" + dailyRevenue.toFixed(2);

        }


        // -----------------------------
        // THIS MONTH
        // -----------------------------

        let monthlyRevenue = 0;


        orders.forEach(order => {

            const orderDate =
                new Date(order.date);


            if (
                orderDate.getMonth() ===
                today.getMonth() &&

                orderDate.getFullYear() ===
                today.getFullYear()
            ) {

                if (
                    order.products &&
                    Array.isArray(order.products)
                ) {

                    order.products.forEach(
                        product => {

                            monthlyRevenue +=
                                Number(product.price || 0) *
                                Number(product.quantity || 0);

                        }
                    );

                }

            }

        });


        const monthlyRevenueElement =
            document.getElementById(
                "monthly-revenue"
            );


        if (monthlyRevenueElement) {

            monthlyRevenueElement.textContent =
                "$" +
                monthlyRevenue.toFixed(2);

        }


    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

    }

}
// =====================================
// 📈 SALES ANALYTICS
// =====================================

function drawSalesChart() {

    const canvas =
        document.getElementById("salesChart");

    if (!canvas) return;


    // ---------------------------------
    // GET ORDERS FROM FIREBASE
    // ---------------------------------

    getDocs(
        collection(db, "orders")
    )
    .then(snapshot => {

        const orders = [];


        snapshot.forEach(document => {

            orders.push({
                id: document.id,
                ...document.data()
            });

        });


        // ---------------------------------
        // MONTHS
        // ---------------------------------

        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];


        // ---------------------------------
        // MONTHLY SALES
        // ---------------------------------

        const totals =
            new Array(12).fill(0);


        orders.forEach(order => {

            if (
                !order.date ||
                !order.products
            ) {
                return;
            }


            const date =
                new Date(order.date);


            const month =
                date.getMonth();


            order.products.forEach(
                product => {

                    totals[month] +=
                        Number(product.price || 0) *
                        Number(product.quantity || 0);

                }
            );

        });


        // ---------------------------------
        // CHECK CHART.JS
        // ---------------------------------

        if (
            typeof Chart ===
            "undefined"
        ) {

            console.error(
                "Chart.js is not loaded."
            );

            return;

        }


        // ---------------------------------
        // DESTROY OLD CHART
        // ---------------------------------

        if (salesChart) {

            salesChart.destroy();

        }


        // ---------------------------------
        // CREATE CHART
        // ---------------------------------

        salesChart =
            new Chart(
                canvas,
                {

                    type: "line",

                    data: {

                        labels: months,

                        datasets: [

                            {

                                label:
                                    "Sales ($)",

                                data:
                                    totals,

                                borderWidth:
                                    3,

                                tension:
                                    0.4,

                                fill:
                                    true

                            }

                        ]

                    },


                    options: {

                        responsive:
                            true,

                        maintainAspectRatio:
                            false,


                        plugins: {

                            legend: {

                                display:
                                    true

                            }

                        },


                        scales: {

                            y: {

                                beginAtZero:
                                    true

                            }

                        }

                    }

                }
            );

    })

    .catch(error => {

        console.error(
            "Sales chart error:",
            error
        );

    });

}
// =====================================
// 🔔 NEW ORDER NOTIFICATION
// =====================================

let lastOrderCount =
    Number(
        localStorage.getItem(
            "lastOrderCount"
        )
    ) || 0;


async function checkNewOrders() {

    try {

        const snapshot =
            await getDocs(
                collection(db, "orders")
            );

        const currentOrderCount =
            snapshot.size;


        const notification =
            document.getElementById(
                "new-order-notification"
            );


        // أول مرة فقط نحفظ العدد
        if (
            !localStorage.getItem(
                "lastOrderCount"
            )
        ) {

            localStorage.setItem(
                "lastOrderCount",
                currentOrderCount
            );

            return;

        }


        // يوجد طلب جديد
        if (
            currentOrderCount >
            lastOrderCount
        ) {

            if (notification) {

                notification.style.display =
                    "block";

            }

            showAdminNotification();

        }


        lastOrderCount =
            currentOrderCount;


        localStorage.setItem(
            "lastOrderCount",
            currentOrderCount
        );


    } catch (error) {

        console.error(
            "Notification error:",
            error
        );

    }

}


// =====================================
// 🔔 SHOW NOTIFICATION
// =====================================

function showAdminNotification() {

    const notification =
        document.getElementById(
            "new-order-notification"
        );


    if (!notification) return;


    notification.style.display =
        "block";


    // إخفاء الإشعار بعد 10 ثوانٍ
    setTimeout(() => {

        notification.style.display =
            "none";

    }, 10000);

}


// =====================================
// 📊 BEST SELLING PRODUCTS
// =====================================

async function updateBestProducts() {

    const container =
        document.getElementById(
            "best-products"
        );


    if (!container) return;


    try {

        const snapshot =
            await getDocs(
                collection(db, "orders")
            );


        const productSales = {};


        snapshot.forEach(document => {

            const order =
                document.data();


            if (
                !order.products ||
                !Array.isArray(
                    order.products
                )
            ) {

                return;

            }


            order.products.forEach(
                product => {

                    const name =
                        product.name;


                    if (
                        !productSales[name]
                    ) {

                        productSales[name] = {

                            name:
                                name,

                            quantity:
                                0,

                            revenue:
                                0

                        };

                    }


                    productSales[name]
                        .quantity +=
                        Number(
                            product.quantity || 0
                        );


                    productSales[name]
                        .revenue +=
                        Number(
                            product.price || 0
                        ) *
                        Number(
                            product.quantity || 0
                        );

                }
            );

        });


        // ---------------------------------
        // SORT
        // ---------------------------------

        const bestProducts =
            Object.values(
                productSales
            )
            .sort(
                (a, b) =>
                    b.quantity -
                    a.quantity
            )
            .slice(0, 5);


        // ---------------------------------
        // EMPTY
        // ---------------------------------

        if (
            bestProducts.length === 0
        ) {

            container.innerHTML = `
                <p>
                    No sales yet 📦
                </p>
            `;

            return;

        }


        // ---------------------------------
        // DISPLAY
        // ---------------------------------

        container.innerHTML = "";


        bestProducts.forEach(
            (product, index) => {

                container.innerHTML += `

                <div class="best-product">

                    <div class="best-product-rank">
                        #${index + 1}
                    </div>

                    <div class="best-product-info">

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            🛒 Sold:
                            <strong>
                                ${product.quantity}
                            </strong>
                        </p>

                        <p>
                            💰 Revenue:
                            <strong>
                                $${product.revenue.toFixed(2)}
                            </strong>
                        </p>

                    </div>

                </div>

                `;

            }
        );


    } catch (error) {

        console.error(
            "Best products error:",
            error
        );


        container.innerHTML = `
            <p>
                ❌ Unable to load sales.
            </p>
        `;

    }

}
// =====================================
// 🚀 START ADMIN DASHBOARD
// =====================================

checkNewOrders();

updateBestProducts();

drawSalesChart();

loadProducts();
