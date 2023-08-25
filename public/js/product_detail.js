// product_detail.js

// Define the products variable to store the product data
let products = [];
let cartData = {};

// Function to fetch product data from JSON file
async function fetchProducts() {
  try {
    const response = await fetch('./json/products.json');
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    products = await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Function to fetch product by ID
function getProductById(productId) {
  return products.find((product) => product.id === productId) || null;
}

// function updateCartItemsCount() {
//   const cartItemCountElement = document.querySelector('.item-count');
//   const cartItems = document.querySelectorAll('.cart-item');
//   const itemCount = cartItems.length;

//   if (cartItemCountElement) {
//     cartItemCountElement.textContent = itemCount;
//     localStorage.setItem('cartItemCount', itemCount);

//     if (itemCount > 0) {
//       cartItemCountElement.style.display = 'inline';
//     } else {
//       cartItemCountElement.style.display = 'none';
//     }
//   }
// }


document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectElement = document.querySelector('.quantity-select');
      const productId = button.dataset.productId;
      const quantity = selectElement.value;

      console.log('Product ID:', productId);
      console.log('Quantity:', quantity);
      fetch('/add_to_cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response (e.g., display a success message)
          if (data.message) {
            console.log(data.message); // You can display a message or update the UI here
            // Log the updated cart data to the console
            console.log('Cart Data:', data.cartData);
            

            const quantityInput = document.querySelector('.quantity-input');
            quantityInput.addEventListener('change', (event) => {
               // Replace with the actual product ID
              const newQuantity = parseInt(event.target.value, 10); // Read the new quantity from the input field
            
              // Dispatch the custom event with productId and newQuantity as the detail
              const cartEvent = new CustomEvent('cartUpdated', {
                detail: { productId, newQuantity },
              });
            
              document.dispatchEvent(cartEvent);
            });
            
          } else {
            console.log('Unexpected response from the server:', data);
          }
        })
        .catch((error) => {
          // Handle any errors that occur during the request
          console.error('Error adding to cart:', error);
        });
    });
  });
});


// Fetch the products when the page loads
fetchProducts().catch((error) => {
  console.error('Error fetching products:', error);
});
