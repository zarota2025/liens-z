/* =====================================
   LIENS Z
   PRODUCT PAGE
===================================== */

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

/* ========================= */

const products = JSON.parse(localStorage.getItem("adminProducts")) || [];

const product = products.find(item => item.id == productId);

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
/* =====================================
   ADD TO CART
===================================== */

const addCart=document.getElementById("add-cart");

addCart.onclick=()=>{

let cart=JSON.parse(localStorage.getItem("cart"))||[];

const existing=cart.find(item=>item.name===product.name);

if(existing){

existing.quantity+=quantity;

}else{

cart.push({

name:product.name,

price:product.price,

image:product.image,

quantity:quantity

});

}

localStorage.setItem("cart",JSON.stringify(cart));

alert("Product added to cart 🛒");

};
/* =====================================
   FAVORITE
===================================== */

const favoriteBtn=document.getElementById("add-favorite");

favoriteBtn.onclick=()=>{

let favorites=JSON.parse(localStorage.getItem("favorites"))||[];

if(!favorites.includes(product.name)){

favorites.push(product.name);

localStorage.setItem("favorites",JSON.stringify(favorites));

alert("Added to Favorites ❤️");

}else{

alert("Already in Favorites ❤️");

}

};
