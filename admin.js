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
