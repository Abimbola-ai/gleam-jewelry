
// Function to fetch product data from JSON file
async function fetchProducts() {
    try {
        const response = await fetch("./json/products.json");
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return []; // Return an empty array if an error occurs
    }
}

// Function to create and append product cards to the page (with click event for heart icon)
function createProductCard(product) {
    const productContainer = document.getElementById("products-list");
    const productCard = document.createElement("div");
    productCard.classList.add("col-md-4", "mb-4", "product-card");

    productCard.innerHTML = `
        <div class="card">
            <img src="${product.image}" class="card-img-top" alt="Product Image">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <span class="card-price">${product.price}</span>
                <i class="heart-icon fas fa-heart"></i>
            </div>
        </div>
    `;

    // Add a click event listener to the product card
    productCard.addEventListener("click", () => {
        // Define the action to perform when the card is clicked
        // For example, navigate to the product detail page:
        window.location.href = `/product_detail?id=${product.id}`;
    });

    // Add a click event listener to the heart icon
    const heartIcon = productCard.querySelector(".heart-icon");
    heartIcon.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent the click event from bubbling to the product card

        // Toggle the "favorite-heart" class to change the heart's color
        heartIcon.classList.toggle("favorite-heart");
    });

    productContainer.appendChild(productCard);
}

// Function to display products based on the current page number and products per page
function displayProductsByPage(pageNumber, productsPerPage, productList) {
    const startIndex = (pageNumber - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = productList.slice(startIndex, endIndex);

    for (const product of productsToShow) {
        createProductCard(product);
    }
}

// Function to filter products based on search input
function filterProducts(searchTerm) {
    const filteredProducts = productsData.filter(product => {
        const productName = product.name.toLowerCase();
        return productName.includes(searchTerm.toLowerCase());
    });

    updateProductPage(filteredProducts);
}

// Function to handle search input changes
function handleSearch() {
    const searchInput = document.getElementById("search-input");
    const searchTerm = searchInput.value.trim();

    if (searchTerm === "") {
        updateProductPage(productsData); // Show all products if search input is empty
    } else {
        filterProducts(searchTerm); // Filter products based on search term
    }
}

// Add event listener for search input changes
document.getElementById("search-input").addEventListener("input", handleSearch);

// Function to update the product page with data
function updateProductPage(products) {
    const productContainer = document.getElementById("products-list");
    productContainer.innerHTML = ""; // Clear previous product cards

    for (const product of products) {
        createProductCard(product);
    }
}


// Fetch products from the JSON file and update the page
async function loadProducts() {
    try {
        productsData = await fetchProducts();
        updateProductPage(productsData);
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

// Call the function to load products from the JSON file
loadProducts();

