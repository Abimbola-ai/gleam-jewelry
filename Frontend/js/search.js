// JavaScript for handling search and rendering search results
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const productItems = document.querySelectorAll('.product-item');
    const searchResultsContainer = document.getElementById('search-results');
    const productContainer = document.getElementById('product-container');
  
    // Function to perform the search
    function performSearch() {
      const searchTerm = searchInput.value.trim().toLowerCase();
      let searchResultsHTML = '';
      let hasSearchResults = false;
  
      // Loop through all product items
      productItems.forEach((item) => {
        const title = item.querySelector('.product-title').innerText.toLowerCase();
        const description = item.querySelector('.product-description').innerText.toLowerCase();
        const altText = item.querySelector('img').getAttribute('alt').toLowerCase();
        const isMatch = title.includes(searchTerm) || description.includes(searchTerm) || altText.includes(searchTerm);
  
        // Show/hide product items based on search results
        if (isMatch) {
          // Add the item's HTML to searchResultsHTML
          searchResultsHTML += `<div class="col-md-4">${item.innerHTML}</div>`;
          hasSearchResults = true;
        }
  
        // Hide or show the product items based on search results
        item.style.display = isMatch ? 'block' : 'none';
      });
  
      // Show/hide the product container based on search results
      productContainer.style.display = hasSearchResults ? 'none' : 'block';
  
      // Show/hide the search results container based on search results
      searchResultsContainer.style.display = hasSearchResults ? 'block' : 'none';
  
      // Display the search results
      searchResultsContainer.innerHTML = hasSearchResults ? `<div class="row">${searchResultsHTML}</div>` : '';
    }
  
    // Add event listener to search input for "input" event
    searchInput.addEventListener('input', performSearch);
  });
  