// Bean There — beginner-friendly JavaScript functions

const products = [
  {id:1,name:"Caramel Latte",category:"Coffee",price:450,large:550,description:"Smooth espresso, steamed milk and sweet caramel.",tag:"BEST SELLER",image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80"},
  {id:2,name:"Classic Cappuccino",category:"Coffee",price:400,large:500,description:"Rich espresso with silky milk foam.",tag:"POPULAR",image:"https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=700&q=80"},
  {id:3,name:"Iced Mocha",category:"Iced Drinks",price:520,large:620,description:"Chilled coffee blended with chocolate and milk.",tag:"CHILLED",image:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=80"},
  {id:4,name:"Classic Cold Brew",category:"Iced Drinks",price:480,large:580,description:"Slow-steeped coffee served over ice.",tag:"FAN FAVOURITE",image:"https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=700&q=80"},
  {id:5,name:"Vanilla Milk Tea",category:"Tea",price:390,large:490,description:"Creamy tea with a gentle vanilla flavour.",tag:"NEW",image:"https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=700&q=80"},
  {id:6,name:"Chocolate Brownie",category:"Desserts",price:280,large:280,description:"A soft, rich chocolate treat.",tag:"SWEET TREAT",image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80"},
  {id:7,name:"Classic Cheesecake",category:"Desserts",price:420,large:420,description:"Creamy cheesecake with a buttery base.",tag:"POPULAR",image:"https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80"},
  {id:8,name:"Chocolate Muffin",category:"Bakery",price:250,large:250,description:"Freshly baked muffin with chocolate pieces.",tag:"FRESH",image:"https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=700&q=80"},
  {id:9,name:"Americano",category:"Coffee",price:350,large:450,description:"Espresso topped with hot water.",tag:"CLASSIC",image:"https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=700&q=80"},
  {id:10,name:"Spanish Latte",category:"Coffee",price:500,large:600,description:"Espresso with creamy, lightly sweetened milk.",tag:"MUST TRY",image:"https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=700&q=80"},
  {id:11,name:"Strawberry Iced Tea",category:"Tea",price:370,large:470,description:"Refreshing iced tea with strawberry flavour.",tag:"REFRESHING",image:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=700&q=80"},
  {id:12,name:"Butter Croissant",category:"Bakery",price:300,large:300,description:"Flaky, buttery and baked until golden.",tag:"FRESH",image:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80"}
];

let selectedProduct = null;
let selectedQuantity = 1;
let cart = [];
let activeCategory = "All";

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const productModal = document.getElementById("productModal");
const cartDrawer = document.getElementById("cartDrawer");
const drawerOverlay = document.getElementById("drawerOverlay");

// Display menu items on the page.
function displayMenu(items) {
  productGrid.innerHTML = "";

  if (items.length === 0) {
    productGrid.innerHTML = '<p class="empty-cart">No items found. Try another search.</p>';
    return;
  }

  items.forEach(function(product) {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-photo">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="product-tag">${product.tag}</span>
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-bottom">
          <span class="product-price">From Rs. ${product.price}</span>
          <button class="add-button" type="button" aria-label="View ${product.name}" onclick="openProduct(${product.id})">+</button>
        </div>
      </div>`;
    productGrid.appendChild(card);
  });

  document.getElementById("menuStatus").textContent = items.length + " delicious item(s)";
}

// Filter menu by category.
function filterCategory(category) {
  activeCategory = category;
  document.querySelectorAll(".category-chip").forEach(function(button) {
    button.classList.toggle("active", button.dataset.category === category);
  });
  searchProducts();
}

// Search products by name or category.
function searchProducts() {
  const searchText = searchInput.value.toLowerCase().trim();
  const filtered = products.filter(function(product) {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText);
    return matchesCategory && matchesSearch;
  });
  displayMenu(filtered);
}

// Open a product popup.
function openProduct(productId) {
  selectedProduct = products.find(function(product) {
    return product.id === productId;
  });
  if (!selectedProduct) return;

  selectedQuantity = 1;
  document.getElementById("modalImage").src = selectedProduct.image;
  document.getElementById("modalImage").alt = selectedProduct.name;
  document.getElementById("modalCategory").textContent = selectedProduct.category;
  document.getElementById("modalName").textContent = selectedProduct.name;
  document.getElementById("modalDescription").textContent = selectedProduct.description;
  document.getElementById("quantityValue").textContent = selectedQuantity;
  document.getElementById("specialInstructions").value = "";
  document.querySelector('input[name="size"][value="Regular"]').checked = true;
  updateModalPrice();
  productModal.classList.add("show");
  productModal.setAttribute("aria-hidden", "false");
}

// Get selected size price.
function getSelectedPrice() {
  const size = document.querySelector('input[name="size"]:checked').value;
  return size === "Large" ? selectedProduct.large : selectedProduct.price;
}

// Update price shown in product popup.
function updateModalPrice() {
  if (!selectedProduct) return;
  document.getElementById("modalPrice").textContent = "Rs. " + (getSelectedPrice() * selectedQuantity);
}

// Increase or decrease quantity.
function changeQuantity(amount) {
  selectedQuantity = Math.max(1, selectedQuantity + amount);
  document.getElementById("quantityValue").textContent = selectedQuantity;
  updateModalPrice();
}

// Add selected product to cart.
function addToCart() {
  if (!selectedProduct) return;
  const size = document.querySelector('input[name="size"]:checked').value;
  const price = getSelectedPrice();
  const instructions = document.getElementById("specialInstructions").value.trim();

  cart.push({
    cartId: Date.now(),
    id: selectedProduct.id,
    name: selectedProduct.name,
    size: size,
    quantity: selectedQuantity,
    price: price,
    instructions: instructions,
    image: selectedProduct.image
  });

  closeModal();
  updateCart();
  showToast(selectedProduct.name + " added to your cart!");
}

// Update cart count, list and subtotal.
function updateCart() {
  const cartCount = cart.reduce(function(total, item) {
    return total + item.quantity;
  }, 0);
  const total = cart.reduce(function(sum, item) {
    return sum + item.price * item.quantity;
  }, 0);

  document.getElementById("cartCount").textContent = cartCount;
  document.getElementById("cartTotal").textContent = "Rs. " + total;

  const cartItems = document.getElementById("cartItems");
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty. Find something delicious!</p>';
    return;
  }

  cartItems.innerHTML = "";
  cart.forEach(function(item) {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <p>${item.size} · Qty: ${item.quantity}</p>
        <p>${item.instructions ? "Note: " + item.instructions : ""}</p>
        <button class="remove-item" type="button" onclick="removeFromCart(${item.cartId})">Remove</button>
      </div>
      <strong>Rs. ${item.price * item.quantity}</strong>`;
    cartItems.appendChild(row);
  });
}

// Remove one cart entry.
function removeFromCart(cartId) {
  cart = cart.filter(function(item) {
    return item.cartId !== cartId;
  });
  updateCart();
}

// Open and close cart drawer.
function showCart() {
  cartDrawer.classList.add("open");
  drawerOverlay.classList.add("show");
  cartDrawer.setAttribute("aria-hidden", "false");
}
function closeCart() {
  cartDrawer.classList.remove("open");
  drawerOverlay.classList.remove("show");
  cartDrawer.setAttribute("aria-hidden", "true");
}

// Close product popup.
function closeModal() {
  productModal.classList.remove("show");
  productModal.setAttribute("aria-hidden", "true");
}

// Small message at the bottom of the screen.
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(function() {
    toast.classList.remove("show");
  }, 2200);
}

// Simple hero banner text/image slider.
const heroSlides = [
  {title:"Good days<br>start with <em>coffee.</em>", text:"Freshly brewed coffee, delicious treats and little moments worth slowing down for.", image:"https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1100&q=85", alt:"Freshly brewed coffee"},
  {title:"A little sip<br>of <em>happiness.</em>", text:"Take a break, choose your favourite and enjoy the little things.", image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1100&q=85", alt:"Iced coffee"},
  {title:"Sweet treats<br>for your <em>day.</em>", text:"Pair your favourite drink with something freshly baked and delicious.", image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1100&q=85", alt:"Fresh bakery treats"}
];
let currentSlide = 0;

function changeSlide(direction) {
  currentSlide = (currentSlide + direction + heroSlides.length) % heroSlides.length;
  const slide = heroSlides[currentSlide];
  document.querySelector(".hero h1").innerHTML = slide.title;
  document.querySelector(".hero-description").textContent = slide.text;
  const heroImage = document.querySelector(".hero-image-wrap img");
  heroImage.src = slide.image;
  heroImage.alt = slide.alt;
  document.querySelectorAll(".hero-dots button").forEach(function(dot, index) {
    dot.classList.toggle("active", index === currentSlide);
  });
}

// Connect buttons and controls to functions.
document.getElementById("categoryList").addEventListener("click", function(event) {
  if (event.target.matches(".category-chip")) {
    filterCategory(event.target.dataset.category);
  }
});
searchInput.addEventListener("input", searchProducts);
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("quantityMinus").addEventListener("click", function() { changeQuantity(-1); });
document.getElementById("quantityPlus").addEventListener("click", function() { changeQuantity(1); });
document.getElementById("modalAdd").addEventListener("click", addToCart);
document.querySelectorAll('input[name="size"]').forEach(function(radio) {
  radio.addEventListener("change", updateModalPrice);
});
document.getElementById("cartButton").addEventListener("click", showCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
drawerOverlay.addEventListener("click", closeCart);
document.getElementById("heroPrev").addEventListener("click", function() { changeSlide(-1); });
document.getElementById("heroNext").addEventListener("click", function() { changeSlide(1); });
document.querySelectorAll(".hero-dots button").forEach(function(dot, index) {
  dot.addEventListener("click", function() {
    currentSlide = index - 1;
    changeSlide(1);
  });
});
document.getElementById("mobileMenuButton").addEventListener("click", function() {
  document.getElementById("mainNav").classList.toggle("open");
});
document.querySelectorAll(".main-nav a").forEach(function(link) {
  link.addEventListener("click", function() {
    document.getElementById("mainNav").classList.remove("open");
  });
});
document.getElementById("checkoutButton").addEventListener("click", function() {
  showToast("This is a demo cart. Online checkout is not connected yet.");
});
document.getElementById("year").textContent = new Date().getFullYear();

// Show all menu products when the page first loads.
displayMenu(products);
updateCart();
