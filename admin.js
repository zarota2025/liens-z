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
