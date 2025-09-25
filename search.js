
function searchMeal(){
    let query = document.getElementById('search').value.trim();
    if (!query) {
        document.getElementById('recipes').innerHTML = "<p>Please enter a food name.</p>";
        return;
    }

    // Hide static food grid, marquee, and TOP RESTAURANTS heading
    let foodGrid = document.querySelector('.food-scroll-container');
    if (foodGrid) foodGrid.style.display = 'none';
    let marquee = document.querySelector('marquee');
    if (marquee) marquee.style.display = 'none';
    let topRestaurants = document.querySelector('h2');
    if (topRestaurants && topRestaurants.textContent.includes('TOP RESTAURANTS')) topRestaurants.style.display = 'none';

    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + query)
        .then(response => response.json())
        .then(data => {
            let container = document.getElementById('recipes');
            container.innerHTML = "";

            if (!data.meals) {
                container.innerHTML = "<p>No recipes found.</p>";
                return;
            }
            data.meals.forEach(meal => {
                let price = (Math.random() * 300 + 100).toFixed(0); // Random price between 100 and 400
                let rating = (Math.random() * 2 + 3).toFixed(1); // Random rating between 3.0 and 5.0
                let stars = '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
                let card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width:100%; border-radius: 8px;">
                    <h3>${meal.strMeal}</h3>
                    <p class="food-price"><strong>Price:</strong> ₹${price}</p>
                    <p class="food-rating"><strong>Rating:</strong> ${stars} (${rating})</p>
                    <p><strong>Category:</strong> ${meal.strCategory}</p>
                    <p><strong>Area:</strong> ${meal.strArea}</p>
                    <a href="${meal.strYoutube}" target="_blank">Watch Recipe</a>
                    <button class="order-search-btn">Order</button>
                `;
                // Add event listener to the order button
                card.querySelector('.order-search-btn').addEventListener('click', function() {
                    if (typeof addToCart === 'function') {
                        addToCart(meal.strMeal + ' - ₹' + price);
                    } else {
                        alert('Add to cart function not found!');
                    }
                });
                container.appendChild(card);
            })
        })
}
