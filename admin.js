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
let selectedImage = "";
const saveButton = document.getElementById("save-product");
const productsContainer = document.getElementById("admin-products");
let editingIndex = -1;
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

                <div style="display:flex;gap:10px;">

<button
class="edit-btn"
onclick="editProduct(${index})">

✏️ Edit

</button>

<button
class="delete-btn"
onclick="deleteProduct(${index})">

🗑 Delete

</button>

</div>

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

const productData = {

    id: editingIndex === -1 ? Date.now() : adminProducts[editingIndex].id,

    name: productName.value,

    price: Number(productPrice.value),

    oldPrice: Number(productOldPrice.value),

    discount: productDiscount.value,

    badge: productBadge.value,

    category: productCategory.value,

    image: productImage.value

};

if (editingIndex === -1) {

    adminProducts.push(productData);

    showToast("✅ Product added");

} else {

    adminProducts[editingIndex] = productData;

    editingIndex = -1;

    saveButton.textContent = "➕ Add Product";

    showToast("✏️ Product updated");

}

    localStorage.setItem(

        "adminProducts",

        JSON.stringify(adminProducts)

    );

    renderProducts();
productName.value = "";

productPrice.value = "";

productOldPrice.value = "";

productDiscount.value = "";

productBadge.value = "";

productCategory.value = "";

productImage.value = "";
editingIndex = -1;

saveButton.textContent = "➕ Add Product";

});
/* ========================= */

function editProduct(index) {

    const product = adminProducts[index];

    productName.value = product.name;

    productPrice.value = product.price;

    productOldPrice.value = product.oldPrice || "";

    productDiscount.value = product.discount || "";

    productBadge.value = product.badge || "";

    productCategory.value = product.category;

    productImage.value = product.image;

    editingIndex = index;

    saveButton.textContent = "💾 Update Product";

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}
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
