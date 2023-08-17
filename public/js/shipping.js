// shipping.js

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


const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const phoneNumberInput = document.getElementById('phone-number');
const addressInput = document.getElementById('address-1');
const cityInput = document.getElementById('city');
const provinceInput = document.getElementById('province');
const stateInput = document.getElementById('state');
const postalCodeInput = document.getElementById('postal-code');

// Add an event listener to the buttons
continueToPaymentBtn.addEventListener('click', function() {
  // Store the first name in localStorage when continuing to payment
  localStorage.setItem('firstName', firstNameInput.value);
  localStorage.setItem('lastName', lastNameInput.value);
  localStorage.setItem('phoneNumber', phoneNumberInput.value);
  localStorage.setItem('address', addressInput.value);
  localStorage.setItem('city', cityInput.value);
  localStorage.setItem('province', provinceInput.value);
  localStorage.setItem('state', stateInput.value);
  localStorage.setItem('postalCode', postalCodeInput.value);

  submitForm();
});

continueToBillingBtn.addEventListener('click', function() {
  // Store the first name in localStorage when continuing to billing
  localStorage.setItem('firstName', firstNameInput.value);
  localStorage.setItem('lastName', lastNameInput.value);
  localStorage.setItem('phoneNumber', phoneNumberInput.value);
  localStorage.setItem('address', addressInput.value);
  localStorage.setItem('city', cityInput.value);
  localStorage.setItem('province', provinceInput.value);
  localStorage.setItem('state', stateInput.value);
  localStorage.setItem('postalCode', postalCodeInput.value);
  submitForm();
});

// Attach click event handlers to the buttons
continueToPaymentBtn.addEventListener('click', submitForm);
continueToBillingBtn.addEventListener('click', submitForm);
