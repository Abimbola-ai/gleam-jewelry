// Function to fetch product data based on the product ID
function fetchProduct(productId) {
  // Assuming you have a productsData array that contains your product data
  const productsData = require('../frontend/json/products.json');

  // Find the product in the productsData array with the matching ID
  const product = productsData.find((product) => product.id === productId);

  // Return the product or null if not found
  return product || null;
}

module.exports = {
  fetchProduct,
};
