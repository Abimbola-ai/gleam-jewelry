// shared.js
function generateOrderNumber() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 11; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  // Retrieve or generate and store the order number
  let orderNumber = localStorage.getItem('orderNumber');
  if (!orderNumber) {
    orderNumber = generateOrderNumber();
    localStorage.setItem('orderNumber', orderNumber);
  }
  