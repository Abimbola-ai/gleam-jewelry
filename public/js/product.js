// Declare the productsData variable in the global scope
let productsData = [];

// Function to fetch product data from JSON file
// async function fetchProducts() {
//   try {
//     const response = await fetch("./json/products.json");
//     if (!response.ok) {
//       throw new Error("Network response was not ok.");
//     }
//     const products = await response.json();

//     // Convert price string to a numeric value (e.g., "CAD 200" -> 200)
//     products.forEach((product) => {
//       const priceValue = parseFloat(product.price.split(" ")[1]);
//       product.priceValue = priceValue;
//     });
//     return products;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return []; // Return an empty array if an error occurs
//   }
// }
// async function fetchProductsByCategory(category) {
//   try {
//     const response = await fetch(`/getProducts/${category}`);
//     if (!response.ok) {
//       throw new Error('Network response was not ok.');
//     }
//     const products = await response.json();
//     return products;
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return [];
//   }
// }

// // Example usage for fetching products of different categories
// const categories = ['necklaces', 'bracelets', 'earrings']; // List of categories
// categories.forEach((category) => {
//   fetchProductsByCategory(category)
//     .then((products) => {
//       // Process the fetched products for the specific category
//       console.log(`Products for category ${category}:`, products);
//       // Perform further actions with the products data
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// });

// Function to sort products by price in ascending order
function sortProductsByPriceAscending(products) {
  return products.sort((a, b) => a.priceValue - b.priceValue);
}

// Function to sort products by price in descending order
function sortProductsByPriceDescending(products) {
  return products.sort((a, b) => b.priceValue - a.priceValue);
}

// Function to sort products by price
function sortProductsByPrice(products, sortOrder = "asc") {
  return products.sort((a, b) => {
    const priceValueA = parseFloat(a.price.split(" ")[1]);
    const priceValueB = parseFloat(b.price.split(" ")[1]);
    return sortOrder === "asc" ? priceValueA - priceValueB : priceValueB - priceValueA;
  });
}

// Function to handle the sort option selection
function handleSortOptionChange() {
  const sortOptions = document.getElementById("sort-options");
  const selectedOption = sortOptions.value;
  let sortedProducts;

  switch (selectedOption) {
    case "price_asc":
      sortedProducts = sortProductsByPriceAscending(productsData);
      break;
    case "price_desc":
      sortedProducts = sortProductsByPriceDescending(productsData);
      break;
    default:
      sortedProducts = productsData;
      break;
  }

  updateProductPage(sortedProducts);
}

// Add event listener to the sort options select element
const sortOptions = document.getElementById("sort-options");
sortOptions.addEventListener("change", handleSortOptionChange);


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


// Fetch products from the JSON file, sort by price, and update the page
async function loadProducts() {
    try {
      productsData = await fetchProducts();
      const sortedProducts = sortProductsByPrice(productsData, "asc"); // 'asc' for ascending, 'desc' for descending
      updateProductPage(sortedProducts);
  
      // Add event listener for search input changes (moved inside loadProducts)
      document.getElementById("search-input").addEventListener("input", handleSearch);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  }
  
  // Call the function to load products from the JSON file
  loadProducts();
