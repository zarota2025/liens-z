import {
    addProduct,
    getProducts,
    deleteProduct as deleteFirebaseProduct,
    updateProduct
} from "./firebase-products.js";
if (localStorage.getItem("adminLogged") !== "true") {

    location.href = "admin-login.html";

}
/* =====================================
   LIENS Z - ADMIN PANEL
===================================== */

let adminProducts = [];
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productOldPrice = document.getElementById("product-old-price");

const productDiscount = document.getElementById("product-discount");

const productBadge = document.getElementById("product-badge");
const productCategory = document.getElementById("product-category");
const productImage = document.getElementById("product-image");
let selectedImage = "";

const CLOUD_NAME = "m3wucnpl";
const UPLOAD_PRESET = "liens-z";

async function uploadImage(file){

    const formData = new FormData();

    formData.append("file", file);

    formData.append("upload_preset", UPLOAD_PRESET);

    try{

        const response = await fetch(

            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,

            {

                method: "POST",

                body: formData

            }

        );
        const data = await response.json();

console.log(data);

alert(JSON.stringify(data));

        if (!response.ok) {

            throw new Error(

                data.error?.message || "Upload failed"

            );

        }

        return data.secure_url;
           } catch (error) {

        console.error(error);

        alert(error.message);

        throw error;

    }

}
const saveButton = document.getElementById("save-product");
const productsContainer = document.getElementById("admin-products");
let editingIndex = -1;
productImage.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        selectedImage = e.target.result;

    };

    reader.readAsDataURL(file);

});
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

saveButton.addEventListener("click", async () => {

    if (

        productName.value.trim() === "" ||

        productPrice.value.trim() === "" ||

        productCategory.value.trim() === "" ||

        editingIndex === -1 &&
        
       productImage.files.length === 0

    ) {

        alert("⚠ Please fill all fields");

        return;

    }
let imageUrl = selectedImage;

if (productImage.files.length > 0) {

    saveButton.disabled = true;

    saveButton.textContent = "Uploading...";

    try {

        imageUrl = await uploadImage(productImage.files[0]);

    } catch (error) {

        alert("❌ Image upload failed");

        saveButton.disabled = false;

        saveButton.textContent = "➕ Add Product";

        return;

    }

}
const productData = {

    id: editingIndex === -1 ? Date.now() : adminProducts[editingIndex].id,

    name: productName.value,

    price: Number(productPrice.value),

    oldPrice: Number(productOldPrice.value),

    discount: productDiscount.value,

    badge: productBadge.value,

    category: productCategory.value,

    image: imageUrl
};

if (editingIndex === -1) {
await addProduct(productData);
    adminProducts.push(productData);

console.log(adminProducts);
alert("وصلنا إلى push");
    alert("✅ Product added");

} else {

    adminProducts[editingIndex] = productData;

    editingIndex = -1;

    saveButton.textContent = "➕ Add Product";

    alert("✏️ Product updated");

}

alert("تم حفظ المنتج");
    await loadProducts();
productName.value = "";

productPrice.value = "";

productOldPrice.value = "";

productDiscount.value = "";

productBadge.value = "";

productCategory.value = "";

productImage.value = "";
selectedImage = "";
editingIndex = -1;

saveButton.textContent = "➕ Add Product";
saveButton.disabled = false;
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

    selectedImage = product.image;

    editingIndex = index;

    saveButton.textContent = "💾 Update Product";

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}
/* ========================= */

async function deleteProduct(index) {

    if (!confirm("Delete this product?")) return;

    await deleteFirebaseProduct(adminProducts[index].id);

    await loadProducts();

    alert("🗑 Product deleted");

}

/* ========================= */

async function loadProducts() {

    adminProducts = await getProducts();

    renderProducts();

    updateDashboard();

}

loadProducts();
const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("adminLogged");

        window.location.href = "admin-login.html";

    });

}
function updateDashboard() {

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    document.getElementById("products-count").textContent = adminProducts.length;

    document.getElementById("orders-count").textContent = orders.length;

    document.getElementById("favorites-count").textContent = favorites.length;

    let revenue = 0;

    orders.forEach(order => {

        order.products.forEach(product => {

            revenue += product.price * product.quantity;

        });

    });

    document.getElementById("revenue-total").textContent =
        "$" + revenue.toFixed(2);

}

updateDashboard();
