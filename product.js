/* =====================================
   LIENS Z
   PRODUCT PAGE
===================================== */

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

/* ========================= */

const products = {

iphone15:{

name:"iPhone 15 Pro",

price:799,

image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"

},

nike:{

name:"Nike Shoes",

price:120,

image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"

},

sony:{

name:"Sony Headphones",

price:149,

image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"

}

};

/* ========================= */

const product = products[productId];

const image = document.getElementById("product-image");

const title = document.getElementById("product-title");

const price = document.getElementById("product-price");

/* ========================= */

if(product){

image.src = product.image;

title.textContent = product.name;

price.textContent = "$"+product.price;

}

/* ========================= */

let quantity = 1;

const qty = document.getElementById("qty");

document.getElementById("plus").onclick=()=>{

quantity++;

qty.textContent=quantity;

};

document.getElementById("minus").onclick=()=>{

if(quantity>1){

quantity--;

qty.textContent=quantity;

}

};
