// cart.js

// Listen for the input event on quantity input fields
document.addEventListener('input', (event) => {
  // Check if the input field has the 'quantity-input' class
  if (event.target.classList.contains('quantity-input')) {
    const productId = event.target.dataset.productId;
    const newQuantity = parseInt(event.target.value, 10);

    // Call a function to update the quantity in the cart
    updateQuantity(productId, newQuantity);
  }
});

// Function to update the quantity of a product in the cart
async function updateQuantity(productId, newQuantity) {
  console.log('Updating quantity for productId:', productId);
  console.log('New quantity:', newQuantity);
  console.log('Cart Data:', cartData);
  
  // Check if productId and newQuantity are valid before making the request
  if (!productId || isNaN(newQuantity) || newQuantity <= 0) {
    console.error('Invalid product ID or quantity:', { productId, newQuantity });
    return;
  }

  // Send a POST request to update the quantity on the server
  try {
    const response = await fetch('/update_quantity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, newQuantity }),
    });

    if (response.ok) {
      // If the response is successful, update the cart UI with the new quantity
      const data = await response.json();
      const { cartItems } = data;
      updateCartUI(cartItems);
    } else {
      // If there's an error in the response, display an error message
      const data = await response.json();
      console.error('Error updating quantity:', data.error);
    }
  } catch (error) {
    console.error('Unexpected error while updating quantity:', error);
  }
}

// Function to update the cart UI with new subtotal, tax, and total
// Function to update the cart UI with new subtotal, tax, and total
function updateCartUI(cartItems) {
  
  // Calculate and update the new subtotal, tax, and total
  const subtotal = calculateSubtotal(cartItems);
  const tax = calculateTax(subtotal);
  const total = subtotal + tax;

  document.getElementById('subtotal').textContent = `Subtotal: CAD ${subtotal.toFixed(2)}`;
  document.getElementById('tax').textContent = `Tax: CAD ${tax.toFixed(2)}`;
  document.getElementById('total').textContent = `Total: CAD ${total.toFixed(2)}`;

  const cartContainer = document.querySelector('.cart-items');

  // Clear the existing cart items
  cartContainer.innerHTML = '';
  if (Object.keys(cartItems).length === 0) {
    // If the cart is empty, display a message
    cartContainer.innerHTML = '<p>Your cart is empty. Add some products to see them here!</p>';
  } else {
    // If the cart has items, display each item in the cart
    for (const productId in cartItems) {
      const product = products.find((p) => p.id === productId);
      if (product && typeof product.price === 'string') {
        const price = parseFloat(product.price.replace('CAD', '').trim());
        const quantity = parseInt(cartItems[productId]);
        const itemTotal = price * quantity;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        const cartItemImage = document.createElement('img');
        cartItemImage.src = product.image;
        cartItemImage.alt = product.name;
        cartItemDiv.appendChild(cartItemImage);

        const cartItemName = document.createElement('p');
        cartItemName.textContent = product.name;
        cartItemDiv.appendChild(cartItemName);

        const cartItemPrice = document.createElement('p');
        cartItemPrice.textContent = `Price: ${product.price}`;
        cartItemDiv.appendChild(cartItemPrice);

        const cartItemQuantity = document.createElement('p');
        cartItemQuantity.textContent = `Quantity: ${quantity}`;
        cartItemDiv.appendChild(cartItemQuantity);

        cartContainer.appendChild(cartItemDiv);
      }
    }
  }
}

// function updateCartUI(cartItems) {
//   // Fetch the products data from the server using AJAX
//   fetch('/get_products')
//     .then((response) => response.json())
//     .then((products) => {
//       console.log('Products array:', products);

//       const cartContainer = document.querySelector('.cart-items');

//       // Clear the existing cart items
//       cartContainer.innerHTML = '';
//       if (Object.keys(cartItems).length === 0) {
//         // If the cart is empty, display a message
//         cartContainer.innerHTML = '<p>Your cart is empty. Add some products to see them here!</p>';
//       } else {
//         // If the cart has items, display each item in the cart
//         for (const productId in cartItems) {
//           const product = products.find((p) => p.id === productId);
//           if (product && typeof product.price === 'string') {
//             const price = parseFloat(product.price.replace('CAD', '').trim());
//             const quantity = parseInt(cartItems[productId]);
//             const itemTotal = price * quantity;

//             const cartItemDiv = document.createElement('div');
//             cartItemDiv.classList.add('cart-item');

//             const cartItemImage = document.createElement('img');
//             cartItemImage.src = product.image;
//             cartItemImage.alt = product.name;
//             cartItemDiv.appendChild(cartItemImage);

//             const cartItemName = document.createElement('p');
//             cartItemName.textContent = product.name;
//             cartItemDiv.appendChild(cartItemName);

//             const cartItemPrice = document.createElement('p');
//             cartItemPrice.textContent = `Price: ${product.price}`;
//             cartItemDiv.appendChild(cartItemPrice);

//             const cartItemQuantity = document.createElement('p');
//             cartItemQuantity.textContent = `Quantity: ${quantity}`;
//             cartItemDiv.appendChild(cartItemQuantity);

//             cartContainer.appendChild(cartItemDiv);
//           }
//         }

//         // Calculate and update the new subtotal, tax, and total
//         const subtotal = calculateSubtotal(cartItems, products);
//         const tax = calculateTax(subtotal);
//         const total = subtotal + tax;

//         document.getElementById('subtotal').textContent = `Subtotal: CAD ${subtotal.toFixed(2)}`;
//         document.getElementById('tax').textContent = `Tax: CAD ${tax.toFixed(2)}`;
//         document.getElementById('total').textContent = `Total: CAD ${total.toFixed(2)}`;
//       }
//     })
//     .catch((error) => {
//       console.error('Error fetching products:', error);
//     });
// }

// Function to calculate the subtotal based on the cart items
function calculateSubtotal(cartItems, products) {
  let subtotal = 0;
  for (const productId in cartItems) {
    const product = products.find((p) => p.id === productId);
    if (product && typeof product.price === 'string') {
      const price = parseFloat(product.price.replace('CAD', '').trim());
      const quantity = parseInt(cartItems[productId]);
      const itemTotal = price * quantity;
      subtotal += itemTotal;
    }
  }
  return subtotal;
}

// Function to calculate the tax based on the subtotal
function calculateTax(subtotal) {
  const taxRate = 0.1; // Assuming tax rate is 10% (0.1)
  return subtotal * taxRate;
}
