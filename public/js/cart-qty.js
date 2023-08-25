
const storedItemCount = localStorage.getItem('cartItemCount');
if (storedItemCount !== null) {
    const cartItemCountElement = document.querySelector('.item-count');
if (cartItemCountElement) {
    cartItemCountElement.textContent = storedItemCount;
    if (parseInt(storedItemCount) > 0) {
      cartItemCountElement.style.display = 'inline';
    } else {
      cartItemCountElement.style.display = 'none';
    }
  }
}
