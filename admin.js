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
