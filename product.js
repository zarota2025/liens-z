const products = {

    iphone15: {

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

        name: "Nike Shoes",

        price: "$120",

        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900",

        description:
        "Comfortable sports shoes with lightweight design for running and daily use."

    },

    sony: {

        name: "Sony Headphones",

        price: "$149",

        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900",

        description:
        "Premium wireless headphones with crystal clear sound and noise cancelling."

    }

};

// قراءة id من الرابط

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const product = products[id];

if(product){

document.getElementById("main-image").src = product.image;

document.getElementById("product-name").textContent = product.name;

document.getElementById("product-price").textContent = product.price;

document.getElementById("product-description").textContent = product.description;

}
