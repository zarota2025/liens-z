/* =====================================
   LIENS Z - ADMIN PANEL
===================================== */

let adminProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];

const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productOldPrice = document.getElementById("product-old-price");

const productDiscount = document.getElementById("product-discount");

const productBadge = document.getElementById("product-badge");
const productCategory = document.getElementById("product-category");
const productImage = document.getElementById("product-image");

const saveButton = document.getElementById("save-product");
const productsContainer = document.getElementById("admin-products");

/* ========================= */

function renderProducts() {

    productsContainer.innerHTML = "";

    if (adminProducts.length === 0) {

        productsContainer.innerHTML = `
            <p>No products yet.</p>
        `;

        return;
    }

    adminProducts.forEach((product, index) => {

        productsContainer.innerHTML += `

        <div class="admin-card">

            <img src="${product.image}" alt="${product.name}">

            <div class="admin-card-content">

                <h3>${product.name}</h3>

                <p>$${product.price}</p>

                <small>${product.category}</small>

                <br><br>

                <button
                class="delete-btn"
                onclick="deleteProduct(${index})">

                Delete

                </button>

            </div>

        </div>

        `;

    });

}

/* ========================= */

saveButton.addEventListener("click", () => {

    if (

        productName.value.trim() === "" ||

        productPrice.value.trim() === "" ||

        productCategory.value.trim() === "" ||

        productImage.value.trim() === ""

    ) {

        showToast("⚠ Please fill all fields", "warning");

        return;

    }

    adminProducts.push({

    id: Date.now(),

    name: productName.value,

    price: Number(productPrice.value),

    oldPrice: Number(productOldPrice.value),

    discount: productDiscount.value,

    badge: productBadge.value,

    category: productCategory.value,

    image: productImage.value

});

    localStorage.setItem(

        "adminProducts",

        JSON.stringify(adminProducts)

    );

    renderProducts();

productPrice.value = "";

productOldPrice.value = "";

productDiscount.value = "";

productBadge.value = "";

productCategory.value = "";

productImage.value = "";

    showToast("✅ Product added");

});

/* ========================= */

function deleteProduct(index) {

    adminProducts.splice(index, 1);

    localStorage.setItem(

        "adminProducts",

        JSON.stringify(adminProducts)

    );

    renderProducts();

    showToast("🗑 Product deleted", "warning");

}

/* ========================= */

renderProducts();
