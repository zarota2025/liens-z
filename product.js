const products = {

    iphone15: {
    id: "iphone15",
    name: "iPhone 15 Pro",

    price: "$799",

    images: [

        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900",

        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=900",

        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=900",

        "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=900"

    ],

    description:
    "The latest Apple smartphone with A17 Pro chip, 48MP camera and Super Retina XDR display."

},

    nike: {
    id: "nike",
    name: "Nike Shoes",

    price: "$120",

    images: [

        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900",

        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900",

        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900",

        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900"

    ],

    description:
    "Comfortable sports shoes with lightweight design for running and daily use."

},

    sony: {
    id: "sony",
    name: "Sony Headphones",

    price: "$149",

    images: [

        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900",

        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900",

        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900",

        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900"

    ],

    description:
    "Premium wireless headphones with crystal clear sound and noise cancelling."

},

};

// قراءة id من الرابط

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const product = products[id];

if(product){

const mainImage = document.getElementById("main-image");

mainImage.src = product.images[0];

const thumbs = [

document.getElementById("thumb1"),

document.getElementById("thumb2"),

document.getElementById("thumb3"),

document.getElementById("thumb4")

];

thumbs.forEach((thumb,index)=>{

    if(product.images[index]){

        thumb.src = product.images[index];

        thumb.onclick = ()=>{

            mainImage.src = product.images[index];

            document
                .querySelectorAll(".thumbnail")
                .forEach(t=>t.classList.remove("active"));

            thumb.classList.add("active");

        };

    }else{

        thumb.style.display="none";

    }

});
document.getElementById("product-name").textContent = product.name;

document.getElementById("product-price").textContent = product.price;

document.getElementById("product-description").textContent = product.description;

}
// ===== Colors =====

const colorButtons = document.querySelectorAll(".color-btn");

colorButtons.forEach(button=>{

button.addEventListener("click",()=>{

colorButtons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

});

});

// ===== Storage =====

const storageButtons = document.querySelectorAll(".storage-btn");

storageButtons.forEach(button=>{

button.addEventListener("click",()=>{

storageButtons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

});

});
// ===== Quantity =====

let quantity = 1;

const quantityText = document.getElementById("quantity");

const plusBtn = document.getElementById("plus-btn");

const minusBtn = document.getElementById("minus-btn");

plusBtn.addEventListener("click",()=>{

quantity++;

quantityText.textContent = quantity;

});

minusBtn.addEventListener("click",()=>{

if(quantity > 1){

quantity--;

quantityText.textContent = quantity;

}

});
