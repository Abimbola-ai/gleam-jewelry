function removeFromCart(productId) {
  const cartItem = document.querySelector(`[data-product-id="${productId}"]`);
  if (cartItem) {
    cartItem.remove();
    updateCartTotals();
    updateCartEmptyMessage();
  }
}

function updateCartTotals() {
  let newSubtotal = 0;
  const cartItems = document.querySelectorAll('.cart-item');
  cartItems.forEach((cartItem) => {
    const quantity = parseInt(
      cartItem.querySelector('.quantity-select').value,
      10
    );
    const price = parseFloat(
      cartItem.getAttribute('data-price').replace('cad ', '')
    );
    const itemTotal = price * quantity;
    newSubtotal += itemTotal;
    cartItem.querySelector('.item-total').textContent = itemTotal.toFixed(2);
  });

  const subtotal = document.getElementById('subtotal');
  const tax = document.getElementById('tax');
  const total = document.getElementById('total');
  subtotal.textContent = `CAD ${newSubtotal.toFixed(2)}`;
  tax.textContent = `CAD ${(newSubtotal * 0.13).toFixed(2)}`;
  total.textContent = `CAD ${(newSubtotal * 1.13).toFixed(2)}`;
  // After updating cart totals
  localStorage.setItem('subtotal', newSubtotal.toFixed(2));
  localStorage.setItem('tax', (newSubtotal * 0.13).toFixed(2));
  console.log(subtotal);
}


function updateCartEmptyMessage() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartEmptyMessage = document.getElementById('cart-empty-message');
  
  if (cartItemsContainer && cartEmptyMessage) {
    const cartItemElements = cartItemsContainer.querySelectorAll('.cart-item');
    console.log(cartItemElements);
    
    if (cartItemElements.length === 0) {
      cartEmptyMessage.style.display = 'block';
    } else {
      cartEmptyMessage.style.display = 'none';
    }
  }
}


const quantitySelects = document.querySelectorAll('.quantity-select');
quantitySelects.forEach((select) => {
  select.addEventListener('change', updateCartTotals);
});

// Call the updateCartEmptyMessage function on page load to handle initial display
updateCartEmptyMessage();
