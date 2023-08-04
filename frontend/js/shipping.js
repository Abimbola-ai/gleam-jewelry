// generate order number as a random string.
const generateOrderNumber = function (length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// Update the order number element with the generated order number
document.getElementById('order-number').textContent = generateOrderNumber(11);

// Use JavaScript to extract the subtotal value from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const subtotal = urlParams.get('subtotal');
const tax = urlParams.get('tax');

// Display the subtotal and tax
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');

if (subtotalElement && taxElement) {
  subtotalElement.textContent = `$${subtotal}`;
  taxElement.textContent = `$${tax}`;
  console.log(subtotal);
  console.log(tax);
}

// Calculate the grand total
const shippingFee = 20.0;
const grandTotal = parseFloat(subtotal) + shippingFee + parseFloat(tax);

// Display the grand total
const grandTotalElement = document.getElementById('grand-total');

if (grandTotalElement) {
  grandTotalElement.textContent = `$${grandTotal.toFixed(2)}`;
  console.log(grandTotal);
}
