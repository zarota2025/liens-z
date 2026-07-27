/* =====================================
   LIENS Z PRODUCTS
===================================== */

const defaultProducts = [

{

id:1,

name:"iPhone 15 Pro",

price:799,

oldPrice:999,

category:"phones",

discount:"-20%",

badge:"Best Seller",

image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"

},

{

id:2,

name:"Nike Shoes",

price:120,

oldPrice:180,

category:"shoes",

discount:"-35%",

badge:"New",

image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"

},

{

id:3,

name:"Sony Headphones",

price:149,

oldPrice:199,

category:"headphones",

discount:"-15%",

badge:"Top Rated",

image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"

}

];
/* =====================================
   LOAD ADMIN PRODUCTS
===================================== */

const adminProducts = JSON.parse(
    localStorage.getItem("adminProducts")
) || [];

const allProducts = [

    ...defaultProducts,

    ...adminProducts

];
/* =====================================
   RENDER PRODUCTS
===================================== */

const productsGrid = document.getElementById("products-grid");

if (productsGrid) {

    defaultProducts.forEach(product => {

        productsGrid.innerHTML += `

        <div class="card"
        data-name="${product.name.toLowerCase()}"
        data-category="${product.category}">

            <button class="favorite">
                ❤
            </button>

            <span class="discount">
                ${product.discount}
            </span>

            <span class="badge">
                ${product.badge}
            </span>

            <img src="${product.image}" alt="${product.name}">

            <div class="card-info">

                <h3>${product.name}</h3>

                <div class="stars">
                    ★★★★★
                </div>

                <p class="price">

                    <span class="new-price">
                        $${product.price}
                    </span>

                    <span class="old-price">
                        $${product.oldPrice}
                    </span>

                </p>

                <div class="card-buttons">

                    <a
                    href="product.html?id=${product.id}"
                    class="details-btn">

                    View

                    </a>

                    <button
                    class="buy-btn"
                    data-name="${product.name}"
                    data-price="${product.price}"
                    data-image="${product.image}">

                    🛒 Add

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}
