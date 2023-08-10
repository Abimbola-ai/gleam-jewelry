// generate order number as a random string.
// const generateOrderNumber = function (length) {
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//   let result = '';
//   const charactersLength = characters.length;
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// };

// // Generate and store the order number in Local Storage
// const orderNumber = generateOrderNumber(11);
// localStorage.setItem('orderNumber', orderNumber);

// Update the order number element with the generated order number
// document.getElementById('order-number').textContent = orderNumber;
// document.getElementById('order-number').textContent = localStorage.getItem('orderNumber');

// Update the order number element with the generated order number
// document.getElementById('order-number').textContent = generateOrderNumber(11);

// Use JavaScript to extract the subtotal value from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// const subtotal = urlParams.get('subtotal');
// const tax = urlParams.get('tax');
// Retrieve stored values from local storage
const subtotal = localStorage.getItem('subtotal');
const tax = localStorage.getItem('tax');
console.log(subtotal);
console.log(tax);

// Calculate the grand total
const shippingFee = 20.0;
const grandTotal = parseFloat(subtotal) + shippingFee + parseFloat(tax);

// Display the subtotal and tax
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const grandTotalElement = document.getElementById('grand-total');

if (subtotalElement && taxElement && grandTotalElement) {
  subtotalElement.textContent = `$${subtotal}`;
  taxElement.textContent = `$${tax}`;
  grandTotalElement.textContent = `$${grandTotal.toFixed(2)}`;
  console.log(subtotal);
  console.log(tax);
  console.log(grandTotal);
}

const useAsBillingCheckbox = document.getElementById('use-as-billing');
const continueToPaymentBtn = document.getElementById('continue-to-payment-btn');
const continueToBillingBtn = document.getElementById('continue-to-billing-btn');
const shippingForm = document.getElementById('shipping-form');

// Function to update button display based on checkbox state
function updateButtonDisplay() {
  if (useAsBillingCheckbox.checked) {
    continueToPaymentBtn.style.display = 'block';
    continueToBillingBtn.style.display = 'none';
    shippingForm.action = '/payment';
  } else {
    continueToPaymentBtn.style.display = 'none';
    continueToBillingBtn.style.display = 'block';
    shippingForm.action = '/billing_info';
  }
}

// Initial call to updateButtonDisplay to set initial button display state
updateButtonDisplay();

// Listen for changes to the checkbox
useAsBillingCheckbox.addEventListener('change', updateButtonDisplay);

// Function to submit the form
function submitForm() {
  shippingForm.submit();
}

// Attach click event handlers to the buttons
continueToPaymentBtn.addEventListener('click', submitForm);
continueToBillingBtn.addEventListener('click', submitForm);
