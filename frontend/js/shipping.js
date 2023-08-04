// generate order number as a random string.
const generatOrderNumber = function (length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// Update the order number element with the generated order number
document.getElementById('order-number').textContent = generatOrderNumber(11);

// Function to update the order summary
function updateOrderSummary(subtotal, tax) {
  const shippingFee = 20.0;
  const grandTotal = subtotal + shippingFee + tax;

  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('grand-total').textContent = `$${grandTotal.toFixed(
    2
  )}`;
}
