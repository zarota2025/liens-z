// =====================================
// 🛡️ LIENS Z - ADMIN PANEL
// PART 1 / 10
// =====================================


// =====================================
// 🔐 ADMIN LOGIN CHECK
// =====================================

if (
    localStorage.getItem("adminLogged") !== "true"
) {

    location.href = "admin-login.html";

}


// =====================================
// 📦 FIREBASE PRODUCTS
// =====================================

import {
    addProduct,
    getProducts,
    deleteProduct as deleteFirebaseProduct,
    updateProduct
} from "./firebase-products.js";


// =====================================
// 🔥 FIREBASE FIRESTORE
// =====================================

import {
    db,
    collection,
    getDocs
} from "./firebase.js";


// =====================================
// 📦 GLOBAL VARIABLES
// =====================================

let adminProducts = [];

let selectedImage = "";

let editingIndex = -1;

let salesChart = null;


// =====================================
// 📝 PRODUCT FORM ELEMENTS
// =====================================

const productName =
    document.getElementById(
        "product-name"
    );


const productPrice =
    document.getElementById(
        "product-price"
    );


const productOldPrice =
    document.getElementById(
        "product-old-price"
    );


const productDiscount =
    document.getElementById(
        "product-discount"
    );


const productBadge =
    document.getElementById(
        "product-badge"
    );


const productCategory =
    document.getElementById(
        "product-category"
    );


const productImage =
    document.getElementById(
        "product-image"
    );


const saveButton =
    document.getElementById(
        "save-product"
    );


const productsContainer =
    document.getElementById(
        "admin-products"
    );


// =====================================
// ☁️ CLOUDINARY
// =====================================

const CLOUD_NAME =
    "m3wucnpl";


const UPLOAD_PRESET =
    "liens-z";
// =====================================
// ☁️ IMAGE UPLOAD
// PART 2 / 10
// =====================================

async function uploadImage(file) {

    const formData =
        new FormData();


    formData.append(
        "file",
        file
    );


    formData.append(
        "upload_preset",
        UPLOAD_PRESET
    );


    try {

        const response =
            await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData
                }
            );


        const data =
            await response.json();


        console.log(
            "Cloudinary:",
            data
        );


        if (!response.ok) {

            throw new Error(
                data.error?.message ||
                "Upload failed"
            );

        }


        return data.secure_url;


    } catch (error) {

        console.error(
            "Image upload error:",
            error
        );


        alert(
            "❌ Image upload failed: " +
            error.message
        );


        throw error;

    }

}


// =====================================
// 🖼️ IMAGE PREVIEW
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
                function (event) {

                    selectedImage =
                        event.target.result;

                };


            reader.readAsDataURL(
                file
            );

        }
    );

}
// =====================================
// 📦 RENDER ADMIN PRODUCTS
// PART 3 / 10
// =====================================

function renderProducts() {

    if (!productsContainer) return;


    productsContainer.innerHTML = "";


    // =================================
    // EMPTY PRODUCTS
    // =================================

    if (adminProducts.length === 0) {

        productsContainer.innerHTML = `

            <div class="empty-products">

                <p>
                    📦 No products yet.
                </p>

            </div>

        `;

        return;

    }


    // =================================
    // DISPLAY PRODUCTS
    // =================================

    adminProducts.forEach(
        (product, index) => {

            productsContainer.innerHTML += `

                <div class="admin-card">

                    <img
                        src="${product.image || ""}"
                        alt="${product.name || "Product"}"
                    >


                    <div class="admin-card-content">

                        <h3>
                            ${product.name || "Unnamed Product"}
                        </h3>


                        <p>
                            💰 $${Number(
                                product.price || 0
                            ).toFixed(2)}
                        </p>


                        ${
                            product.oldPrice
                            ? `
                                <small>

                                    Old price:
                                    $${Number(
                                        product.oldPrice
                                    ).toFixed(2)}

                                </small>
                            `
                            : ""
                        }


                        <p>
                            📂 ${product.category || "-"}
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


                        <br>
                        <br>


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
                                data-product-index="${index}"
                            >

                                ✏️ Edit

                            </button>


                            <button
                                class="delete-btn"
                                data-product-index="${index}"
                            >

                                🗑 Delete

                            </button>


                        </div>


                    </div>

                </div>

            `;

        }
    );

}
// =====================================
// ➕ ADD / ✏️ UPDATE PRODUCT
// PART 4 / 10
// =====================================

if (saveButton) {

    saveButton.addEventListener(
        "click",
        async function () {

            // =================================
            // VALIDATION
            // =================================

            if (
                !productName ||
                !productPrice ||
                !productCategory
            ) {

                console.error(
                    "❌ Product form elements not found."
                );

                return;

            }


            if (
                !productName.value.trim() ||
                !productPrice.value.trim() ||
                !productCategory.value.trim() ||
                (
                    editingIndex === -1 &&
                    (
                        !productImage ||
                        productImage.files.length === 0
                    )
                )
            ) {

                alert(
                    "⚠️ Please fill all required fields."
                );

                return;

            }


            // =================================
            // 🖼️ IMAGE
            // =================================

            let imageUrl =
                selectedImage;


            if (
                productImage &&
                productImage.files.length > 0
            ) {

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


            // =================================
            // 📦 PRODUCT DATA
            // =================================

            const productData = {

                id:
                    editingIndex === -1
                    ? Date.now()
                    : adminProducts[editingIndex].id,


                name:
                    productName.value.trim(),


                price:
                    Number(
                        productPrice.value
                    ),


                oldPrice:
                    productOldPrice &&
                    productOldPrice.value
                    ? Number(
                        productOldPrice.value
                    )
                    : 0,


                discount:
                    productDiscount
                    ? productDiscount.value.trim()
                    : "",


                badge:
                    productBadge
                    ? productBadge.value.trim()
                    : "",


                category:
                    productCategory.value.trim(),


                image:
                    imageUrl

            };


            // =================================
            // ➕ ADD PRODUCT
            // =================================

            if (
                editingIndex === -1
            ) {

                try {

                    await addProduct(
                        productData
                    );


                    alert(
                        "✅ Product added successfully!"
                    );

                } catch (error) {

                    console.error(
                        "Add product error:",
                        error
                    );


                    alert(
                        "❌ Failed to add product."
                    );


                    saveButton.disabled =
                        false;


                    saveButton.textContent =
                        "➕ Add Product";


                    return;

                }

            }


            // =================================
            // ✏️ UPDATE PRODUCT
            // =================================

            else {

                try {

                    await updateProduct(
                        adminProducts[
                            editingIndex
                        ].id,

                        productData
                    );


                    alert(
                        "✏️ Product updated successfully!"
                    );

                } catch (error) {

                    console.error(
                        "Update product error:",
                        error
                    );


                    alert(
                        "❌ Failed to update product."
                    );


                    saveButton.disabled =
                        false;


                    return;

                }

            }


            // =================================
            // 🔄 RELOAD PRODUCTS
            // =================================

            await loadProducts();


            // =================================
            // 🧹 RESET FORM
            // =================================

            if (productName)
                productName.value = "";


            if (productPrice)
                productPrice.value = "";


            if (productOldPrice)
                productOldPrice.value = "";


            if (productDiscount)
                productDiscount.value = "";


            if (productBadge)
                productBadge.value = "";


            if (productCategory)
                productCategory.value = "";


            if (productImage)
                productImage.value = "";


            selectedImage = "";

            editingIndex = -1;


            saveButton.textContent =
                "➕ Add Product";


            saveButton.disabled =
                false;

        }
    );

}
// =====================================
// ✏️ EDIT PRODUCT
// PART 5 / 10
// =====================================

function editProduct(index) {

    const product =
        adminProducts[index];

    if (!product) return;


    if (productName)
        productName.value =
            product.name || "";


    if (productPrice)
        productPrice.value =
            product.price || "";


    if (productOldPrice)
        productOldPrice.value =
            product.oldPrice || "";


    if (productDiscount)
        productDiscount.value =
            product.discount || "";


    if (productBadge)
        productBadge.value =
            product.badge || "";


    if (productCategory)
        productCategory.value =
            product.category || "";


    // استخدام الصورة القديمة
    selectedImage =
        product.image || "";


    editingIndex =
        index;


    if (saveButton) {

        saveButton.textContent =
            "💾 Update Product";

    }


    // الانتقال إلى نموذج المنتج
    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// =====================================
// 🗑️ DELETE PRODUCT
// =====================================

async function deleteProduct(index) {

    const product =
        adminProducts[index];

    if (!product) return;


    const confirmed =
        confirm(
            `Are you sure you want to delete "${product.name}"?`
        );


    if (!confirmed) return;


    try {

        await deleteFirebaseProduct(
            product.id
        );


        alert(
            "🗑️ Product deleted successfully!"
        );


        await loadProducts();


    } catch (error) {

        console.error(
            "Delete product error:",
            error
        );


        alert(
            "❌ Failed to delete product."
        );

    }

}
// =====================================
// 📦 LOAD PRODUCTS
// PART 6 / 10
// =====================================

async function loadProducts() {

    try {

        // تحميل المنتجات من Firebase
        adminProducts =
            await getProducts();


        // عرض المنتجات
        renderProducts();


        // تحديث لوحة التحكم
        await updateDashboard();


        // تحديث أفضل المنتجات
        await updateBestProducts();


        // تحديث الرسم البياني
        drawSalesChart();


    } catch (error) {

        console.error(
            "❌ Error loading products:",
            error
        );


        if (productsContainer) {

            productsContainer.innerHTML = `

                <div class="empty-products">

                    <p>
                        ❌ Failed to load products.
                    </p>

                </div>

            `;

        }

    }

}
// =====================================
// 📊 UPDATE DASHBOARD
// PART 7 / 10
// =====================================

async function updateDashboard() {

    try {

        // =================================
        // 📦 LOAD ORDERS
        // =================================

        const snapshot =
            await getDocs(
                collection(db, "orders")
            );


        const orders = [];


        snapshot.forEach((document) => {

            orders.push({

                id: document.id,

                ...document.data()

            });

        });


        // =================================
        // ❤️ FAVORITES
        // =================================

        const favorites =
            JSON.parse(
                localStorage.getItem(
                    "favorites"
                )
            ) || [];


        // =================================
        // 🛍️ PRODUCTS COUNT
        // =================================

        const productsCount =
            document.getElementById(
                "products-count"
            );


        if (productsCount) {

            productsCount.textContent =
                adminProducts.length;

        }


        // =================================
        // 📦 ORDERS COUNT
        // =================================

        const ordersCount =
            document.getElementById(
                "orders-count"
            );


        if (ordersCount) {

            ordersCount.textContent =
                orders.length;

        }


        // =================================
        // ❤️ FAVORITES COUNT
        // =================================

        const favoritesCount =
            document.getElementById(
                "favorites-count"
            );


        if (favoritesCount) {

            favoritesCount.textContent =
                favorites.length;

        }


        // =================================
        // 👥 CUSTOMERS
        // =================================

        const customers =
            new Set();


        orders.forEach((order) => {

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


        // =================================
        // 💰 TOTAL REVENUE
        // =================================

        let revenue = 0;


        orders.forEach((order) => {

            if (
                !order.products ||
                !Array.isArray(
                    order.products
                )
            ) {

                return;

            }


            order.products.forEach(
                (product) => {

                    revenue +=

                        Number(
                            product.price || 0
                        ) *

                        Number(
                            product.quantity || 0
                        );

                }
            );

        });


        const revenueTotal =
            document.getElementById(
                "revenue-total"
            );


        if (revenueTotal) {

            revenueTotal.textContent =
                "$" +
                revenue.toFixed(2);

        }


        // =================================
        // 📅 TODAY'S REVENUE
        // =================================

        let dailyRevenue = 0;


        const today =
            new Date();


        orders.forEach((order) => {

            const orderDate =
                new Date(order.date);


            if (
                isNaN(
                    orderDate.getTime()
                )
            ) {

                return;

            }


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
                    Array.isArray(
                        order.products
                    )
                ) {

                    order.products.forEach(
                        (product) => {

                            dailyRevenue +=

                                Number(
                                    product.price || 0
                                ) *

                                Number(
                                    product.quantity || 0
                                );

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
                "$" +
                dailyRevenue.toFixed(2);

        }


        // =================================
        // 📅 THIS MONTH'S REVENUE
        // =================================

        let monthlyRevenue = 0;


        orders.forEach((order) => {

            const orderDate =
                new Date(order.date);


            if (
                isNaN(
                    orderDate.getTime()
                )
            ) {

                return;

            }


            if (
                orderDate.getMonth() ===
                today.getMonth() &&

                orderDate.getFullYear() ===
                today.getFullYear()
            ) {

                if (
                    order.products &&
                    Array.isArray(
                        order.products
                    )
                ) {

                    order.products.forEach(
                        (product) => {

                            monthlyRevenue +=

                                Number(
                                    product.price || 0
                                ) *

                                Number(
                                    product.quantity || 0
                                );

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
            "❌ Dashboard error:",
            error
        );

    }

}
// =====================================
// 📈 SALES CHART
// PART 8 / 10
// =====================================

async function drawSalesChart() {

    const canvas =
        document.getElementById(
            "salesChart"
        );

    if (!canvas) return;


    try {

        // =================================
        // 📦 LOAD ORDERS
        // =================================

        const snapshot =
            await getDocs(
                collection(db, "orders")
            );


        const orders = [];


        snapshot.forEach((document) => {

            orders.push({

                id: document.id,

                ...document.data()

            });

        });


        // =================================
        // 📅 MONTHS
        // =================================

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


        // =================================
        // 💰 MONTHLY SALES
        // =================================

        const totals =
            new Array(12).fill(0);


        orders.forEach((order) => {

            if (
                !order.date ||
                !order.products ||
                !Array.isArray(
                    order.products
                )
            ) {

                return;

            }


            const date =
                new Date(
                    order.date
                );


            if (
                isNaN(
                    date.getTime()
                )
            ) {

                return;

            }


            const month =
                date.getMonth();


            order.products.forEach(
                (product) => {

                    totals[month] +=

                        Number(
                            product.price || 0
                        ) *

                        Number(
                            product.quantity || 0
                        );

                }
            );

        });


        // =================================
        // 📊 CHECK CHART.JS
        // =================================

        if (
            typeof Chart ===
            "undefined"
        ) {

            console.error(
                "❌ Chart.js is not loaded."
            );

            return;

        }


        // =================================
        // 🧹 DESTROY OLD CHART
        // =================================

        if (salesChart) {

            salesChart.destroy();

        }


        // =================================
        // 📈 CREATE CHART
        // =================================

        salesChart =
            new Chart(
                canvas,
                {

                    type: "line",


                    data: {

                        labels:
                            months,


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


    } catch (error) {

        console.error(
            "❌ Sales chart error:",
            error
        );

    }

}
