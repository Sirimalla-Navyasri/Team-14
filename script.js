// Restore static content when Home is clicked
document.addEventListener('DOMContentLoaded', function() {
    var homeLink = document.getElementById('home-link');
    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Show static food grid and marquee
            var foodGrid = document.querySelector('.food-scroll-container');
            if (foodGrid) foodGrid.style.display = '';
            var marquee = document.querySelector('marquee');
            if (marquee) marquee.style.display = '';
            // Clear search results
            var recipes = document.getElementById('recipes');
            if (recipes) recipes.innerHTML = '';
        });
    }
});
// Handle order button in cart.html
function handleOrder() {
    localStorage.removeItem('cart');
    displayCart();
    alert('Your order has been placed!');
}

if (window.location.pathname.includes('cart.html')) {
    const orderBtn = document.getElementById('order-btn');
    if (orderBtn) {
        orderBtn.addEventListener('click', handleOrder);
    }
}

// Add item to cart and save to localStorage
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(item + " added to cart!");
}

// Display cart items from localStorage
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartList = document.getElementById('cart-items');
    if (cartList) {
        cartList.innerHTML = '';
        cart.forEach(function(item) {
            let li = document.createElement('li');
            li.textContent = item;
            cartList.appendChild(li);
        });
    }
}

// Only run displayCart in cart.html
if (window.location.pathname.includes('cart.html')) {
    displayCart();
}