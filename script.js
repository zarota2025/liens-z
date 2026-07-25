<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>LIENS Z | Smart Shopping</title>

<link rel="stylesheet" href="style.css">

<link rel="preconnect" href="https://fonts.googleapis.com">

<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

</head>

<body>

<!-- ================= HEADER ================= -->

<header class="header">

<div class="header-container">

<button id="menu-btn" class="menu-btn">
☰
</button>

<a href="index.html" class="logo">

<img src="logo.png" alt="LIENS Z">

<span>LIENS Z</span>

</a>

<div class="header-icons">

<a href="favorites.html" id="favorite-count">
❤️ <span>0</span>
</a>

<a href="cart.html" id="cart-count">
🛒 <span>0</span>
</a>

</div>

</div>

<div class="search-box">

<input
id="search"
type="text"
placeholder="Search products...">

<button id="search-btn">
🔍
</button>

</div>

</header>

<!-- ================= SIDE MENU ================= -->

<aside id="side-menu" class="side-menu">

<nav>

<a href="#home">🏠 Home</a>

<a href="#categories">📂 Categories</a>

<a href="#products">📦 Products</a>

<a href="#deals">🔥 Deals</a>

<a href="#about">ℹ About</a>

<a href="#contact">📞 Contact</a>

<a href="favorites.html">❤️ Favorites</a>

<a href="cart.html">🛒 Cart</a>

</nav>

</aside>

<!-- ================= HERO ================= -->

<section class="hero" id="home">

<div class="slider">

<div class="slide active">

<img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1600" alt="Phone">

<div class="overlay"></div>

<div class="hero-content">

<h1>Discover Amazing Deals</h1>

<p>Premium products at unbeatable prices.</p>

<a href="#products" class="hero-btn">

Shop Now

</a>

</div>

</div>

<div class="slide">

<img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600" alt="Shoes">

<div class="overlay"></div>

<div class="hero-content">

<h1>Fashion Collection</h1>

<p>New arrivals every week.</p>

<a href="#products" class="hero-btn">

Explore

</a>

</div>

</div>

<div class="slide">

<img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600" alt="Headphones">

<div class="overlay"></div>

<div class="hero-content">

<h1>High Quality Audio</h1>

<p>Experience crystal clear sound.</p>

<a href="#products" class="hero-btn">

Buy Now

</a>

</div>

</div>

</div>

<div class="slider-dots">

<span class="dot active"></span>

<span class="dot"></span>

<span class="dot"></span>

</div>

</section>
<!-- ================= CATEGORIES ================= -->

<section class="categories" id="categories">

<h2 class="section-title">
Shop by Category
</h2>

<div class="categories-grid">

<div class="category-card" data-category="phones">
📱
<span>Phones</span>
</div>

<div class="category-card" data-category="laptops">
💻
<span>Laptops</span>
</div>

<div class="category-card" data-category="headphones">
🎧
<span>Headphones</span>
</div>

<div class="category-card" data-category="gaming">
🎮
<span>Gaming</span>
</div>

<div class="category-card" data-category="fashion">
👟
<span>Fashion</span>
</div>

<div class="category-card" data-category="accessories">
⌚
<span>Accessories</span>
</div>

</div>

</section>

<!-- ================= FEATURED PRODUCTS ================= -->

<section class="products" id="products">

<h2 class="section-title">
🔥 Featured Products
</h2>

<div class="products-grid">

<!-- Product 1 -->

<div class="card" data-category="phones">

<span class="discount">-20%</span>

<button class="favorite">❤</button>

<img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600" alt="iPhone">

<div class="card-content">

<h3>iPhone 15 Pro</h3>

<div class="stars">
★★★★★
</div>

<p class="price">

<span class="new-price">$799</span>

<span class="old-price">$999</span>

</p>

<div class="card-buttons">

<a href="product.html?id=iphone15" class="details-btn">

View

</a>

<button
class="buy-btn"
data-name="iPhone 15 Pro"
data-price="799"
data-image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600">

🛒 Add

</button>

</div>

</div>

</div>

<!-- Product 2 -->

<div class="card" data-category="fashion">

<span class="discount">-35%</span>

<button class="favorite">❤</button>

<img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" alt="Nike">

<div class="card-content">

<h3>Nike Shoes</h3>

<div class="stars">
★★★★★
</div>

<p class="price">

<span class="new-price">$120</span>

<span class="old-price">$180</span>

</p>

<div class="card-buttons">

<a href="product.html?id=nike" class="details-btn">

View

</a>

<button
class="buy-btn"
data-name="Nike Shoes"
data-price="120"
data-image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600">

🛒 Add

</button>

</div>

</div>

</div>

<!-- Product 3 -->

<div class="card" data-category="headphones">

<span class="discount">-15%</span>

<button class="favorite">❤</button>

<img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600" alt="Sony">

<div class="card-content">

<h3>Sony Headphones</h3>

<div class="stars">
★★★★★
</div>

<p class="price">

<span class="new-price">$149</span>

<span class="old-price">$199</span>

</p>

<div class="card-buttons">

<a href="product.html?id=sony" class="details-btn">

View

</a>

<button
class="buy-btn"
data-name="Sony Headphones"
data-price="149"
data-image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600">

🛒 Add

</button>

</div>

</div>

</div>

</div>

</section>
<!-- ================= TOP DEALS ================= -->

<section class="top-deals" id="deals">

<h2 class="section-title">
⚡ Top Deals
</h2>

<div class="deals-banner">

<div class="deal-box">

<h3>Summer Sale</h3>

<p>Up to <strong>70% OFF</strong></p>

<a href="#products" class="hero-btn">
Shop Now
</a>

</div>

<div class="deal-box">

<h3>Free Shipping</h3>

<p>On orders over <strong>$100</strong></p>

<a href="#products" class="hero-btn">
Explore
</a>

</div>

<div class="deal-box">

<h3>New Arrivals</h3>

<p>Latest products every week</p>

<a href="#products" class="hero-btn">
Discover
</a>

</div>

</div>

</section>

<!-- ================= WHY CHOOSE US ================= -->

<section class="features">

<h2 class="section-title">
Why Choose LIENS Z?
</h2>

<div class="features-grid">

<div class="feature">

🚚

<h3>Fast Delivery</h3>

<p>Worldwide shipping with trusted carriers.</p>

</div>

<div class="feature">

💳

<h3>Secure Payment</h3>

<p>Your payments are protected and encrypted.</p>

</div>

<div class="feature">

⭐

<h3>Premium Quality</h3>

<p>Only high-quality products from trusted brands.</p>

</div>

<div class="feature">

📞

<h3>24/7 Support</h3>

<p>Our team is always ready to help you.</p>

</div>

</div>

</section>

<!-- ================= NEWSLETTER ================= -->

<section class="newsletter">

<h2>
Stay Updated
</h2>

<p>
Subscribe to receive the latest deals and exclusive offers.
</p>

<div class="newsletter-box">

<input
type="email"
placeholder="Enter your email">

<button>

Subscribe

</button>

</div>

</section>
