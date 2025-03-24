document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
    loadCart();
});

const products = [
    { id: 1, name: "NES Console", price: 99.99, image: "images/nes.jpg" },
    { id: 2, name: "SNES Console", price: 119.99, image: "images/snes.jpg" },
    { id: 3, name: "Sega Genesis", price: 89.99, image: "images/sega.jpg" },
];

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

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

function loadCart() {
    const cartDiv = document.getElementById("cart");
    if (!cartDiv) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartDiv.innerHTML = "";
    cart.forEach(product => {
        const div = document.createElement("div");
        div.innerHTML = `<p>${product.name} - $${product.price.toFixed(2)}</p>`;
        cartDiv.appendChild(div);
    });
}

function checkout() {
    alert("Thank you for your purchase!");
    localStorage.removeItem("cart");
    loadCart();
}
