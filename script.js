// Restore static content when Home is clicked
document.addEventListener('DOMContentLoaded', function() {
    var homeLink = document.getElementById('home-link');
    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Show static food grid, marquee, and TOP RESTAURANTS heading
            var foodGrid = document.querySelector('.food-scroll-container');
            if (foodGrid) foodGrid.style.display = '';
            var marquee = document.querySelector('marquee');
            if (marquee) marquee.style.display = '';
            var topRestaurants = document.querySelector('h2');
            if (topRestaurants && topRestaurants.textContent.includes('TOP RESTAURANTS')) topRestaurants.style.display = '';
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
    let cartItem;
    try {
        cartItem = JSON.parse(item);
    } catch {
        cartItem = item;
    }
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert((cartItem.name ? cartItem.name : cartItem) + " added to cart!");
}

// Display cart items from localStorage
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartList = document.getElementById('cart-items');
    let total = 0;
    if (cartList) {
        cartList.innerHTML = '';
        cart.forEach(function(item) {
            let li = document.createElement('li');
            if (typeof item === 'object' && item !== null && item.name && item.price && item.img) {
                li.innerHTML = `<img src="${item.img}" alt="${item.name}" style="width:40px; height:40px; object-fit:cover; border-radius:6px; margin-right:10px; vertical-align:middle;"> <strong>${item.name}</strong> - ₹${item.price}`;
                total += parseInt(item.price);
            } else {
                li.textContent = item;
                let match = String(item).match(/₹(\d+)/);
                if (match) {
                    total += parseInt(match[1]);
                }
            }
            cartList.appendChild(li);
        });
        // Show total cost
        let totalLi = document.createElement('li');
        totalLi.style.fontWeight = 'bold';
        totalLi.style.marginTop = '12px';
        totalLi.textContent = 'Total Cost: ₹' + total;
        cartList.appendChild(totalLi);
    }
}

// Only run displayCart in cart.html
if (window.location.pathname.includes('cart.html')) {
    displayCart();
}