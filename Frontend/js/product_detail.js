// Function to fetch product data from JSON file
async function fetchProduct(productId) {
  try {
    const response = await fetch('./json/products.json');
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const products = await response.json();
    const product = products.find((product) => product.id === productId);
    return product || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Function to display product details on the page
function displayProductDetails(product) {
  if (!product) {
    // If product not found or error occurred, display an error message
    // document.body.innerHTML = "<h1>Product not found</h1>";
    document.getElementById('productDetails').innerHTML =
      '<h1>Product not found</h1>';

    return;
  }

  // Create HTML elements for product details
  const productContainer = document.createElement('div');
  productContainer.classList.add('product-detail');

  const productImage = document.createElement('img');
  productImage.src = product.image;
  productImage.alt = 'Product Image';

  const productName = document.createElement('h2');
  productName.textContent = product.name;

  const productDescription = document.createElement('p');
  productDescription.textContent = product.description;

  const productPrice = document.createElement('span');
  productPrice.textContent = product.price;

  // Append elements to the product container
  productContainer.appendChild(productImage);
  productContainer.appendChild(productName);
  productContainer.appendChild(productDescription);
  productContainer.appendChild(productPrice);

  // Append the product container to the body
  // document.body.appendChild(productContainer);
  const productDetailsContainer = document.getElementById('productDetails');
  productDetailsContainer.innerHTML = '';
  productDetailsContainer.appendChild(productContainer);
}

// Get the product ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Fetch the product and display its details
fetchProduct(productId).then((product) => displayProductDetails(product));
