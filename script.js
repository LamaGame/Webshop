document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
    loadCart();
});

// Sample product list
const products = [
    { id: 1, name: "NES Console", price: 99.99, image: "images/nes.jpg" },
    { id: 2, name: "SNES Console", price: 119.99, image: "images/snes.jpg" },
    { id: 3, name: "Sega Genesis", price: 89.99, image: "images/sega.jpg" },
];

// Load all products dynamically to the product list page
function loadProducts() {
    const productList = document.getElementById("product-list");
    if (!productList) return;

    productList.innerHTML = "";
    products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product-card");
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(div);
    });
}

// Add product to cart (with quantity handling)
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(p => p.id === id);
    
    if (existingProduct) {
        // If the product is already in the cart, increase its quantity by 1
        existingProduct.quantity += 1;
    } else {
        // If it's a new product, add it with quantity 1
        const product = products.find(p => p.id === id);
        cart.push({ ...product, quantity: 1 });
    }

    // Save the updated cart in localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart!");
    loadCart(); // Update the cart UI
}

// Load the cart from localStorage and display it
function loadCart() {
    const cartDiv = document.getElementById("cart");
    const totalPriceDiv = document.getElementById("total-price");

    if (!cartDiv || !totalPriceDiv) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Clear the cart display before reloading
    cartDiv.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity; // Calculate total price

        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <p>${item.name}</p>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <input type="text" value="${item.quantity}" readonly>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
        `;
        cartDiv.appendChild(div);
    });

    totalPriceDiv.innerText = `Total: $${totalPrice.toFixed(2)}`;
}

// Update the quantity of a specific product in the cart
function updateQuantity(productId, amount) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = cart.find(p => p.id === productId);
    if (!product) return;

    product.quantity += amount;

    // Prevent quantity from being less than 1
    if (product.quantity < 1) product.quantity = 1;

    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
    loadCart(); // Update the cart UI
}

// Handle checkout process
function checkout() {
    alert("Thank you for your purchase!");
    localStorage.removeItem("cart"); // Clear the cart
    loadCart(); // Reload the cart to reflect that it's empty
}
