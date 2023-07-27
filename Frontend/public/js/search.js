// // JavaScript for handling search and rendering search results
// document.addEventListener('DOMContentLoaded', function () {
//     const searchInput = document.getElementById('search-input');
//     const productItems = document.querySelectorAll('.product-item');
//     const searchResultsContainer = document.getElementById('search-results');
//     const productContainer = document.getElementById('product-container');
  
//     // Function to perform the search
//     function performSearch() {
//       const searchTerm = searchInput.value.trim().toLowerCase();
//       let searchResultsHTML = '';
//       let hasSearchResults = false;
  
//       // Loop through all product items
//       productItems.forEach((item) => {
//         const title = item.querySelector('.product-title').innerText.toLowerCase();
//         const description = item.querySelector('.product-description').innerText.toLowerCase();
//         const altText = item.querySelector('img').getAttribute('alt').toLowerCase();
//         const isMatch = title.includes(searchTerm) || description.includes(searchTerm) || altText.includes(searchTerm);
  
//         // Show/hide product items based on search results
//         if (isMatch) {
//           // Add the item's HTML to searchResultsHTML
//           searchResultsHTML += `<div class="col">${item.innerHTML}</div>`;
//           hasSearchResults = true;
//         }
  
//         // Hide or show the product items based on search results
//         item.style.display = isMatch ? 'block' : 'none';
//       });
  
//       // Show/hide the product container based on search results
//       productContainer.style.display = hasSearchResults ? 'none' : 'block';
  
//       // Show/hide the search results container based on search results
//       searchResultsContainer.style.display = hasSearchResults ? 'block' : 'none';
  
//       // Display the search results
//       searchResultsContainer.innerHTML = hasSearchResults ? `<div class="row">${searchResultsHTML}</div>` : '';
//     }

  
//     // Add event listener to search input for "input" event
//     searchInput.addEventListener('input', performSearch);

    
//   });
  




//   // Function to sort the product items based on the selected option
//   function sortProductsBy(option) {
//     const productContainer = document.querySelector('.product-container');
//     const productItems = Array.from(productContainer.querySelectorAll('.product-item'));

//     switch (option) {
//       case 'best_sellers':
//         productItems.sort((a, b) => {
//           // Implement your custom logic for sorting by best sellers if needed
//           // For now, let's keep them in their current order
//           return 0;
//         });
//         break;
//       case 'price_asc':
//         productItems.sort((a, b) => {
//           const priceA = parseFloat(a.querySelector('.product-description').textContent.split('CAD ')[1]);
//           const priceB = parseFloat(b.querySelector('.product-description').textContent.split('CAD ')[1]);
//           return priceA - priceB;
//         });
//         break;
//       case 'price_desc':
//         productItems.sort((a, b) => {
//           const priceA = parseFloat(a.querySelector('.product-description').textContent.split('CAD ')[1]);
//           const priceB = parseFloat(b.querySelector('.product-description').textContent.split('CAD ')[1]);
//           return priceB - priceA;
//         });
//         break;
//       case 'metal':
//         productItems.sort((a, b) => {
//           const titleA = a.querySelector('.product-title').textContent.toLowerCase();
//           const titleB = b.querySelector('.product-title').textContent.toLowerCase();
//           return titleA.localeCompare(titleB);
//         });
//         break;
//       case 'stone':
//         productItems.sort((a, b) => {
//           const titleA = a.querySelector('.product-title').textContent.toLowerCase();
//           const titleB = b.querySelector('.product-title').textContent.toLowerCase();
//           return titleA.localeCompare(titleB);
//         });
//         break;
//       default:
//         // For best sellers or other future options, do nothing
//         break;
//     }

//     // Append the sorted items back to the container
//     productItems.forEach(item => productContainer.appendChild(item));
//   }

//   // Listen for changes to the sort options dropdown
//   const sortOptions = document.getElementById('sort-options');
//   sortOptions.addEventListener('change', (event) => {
//     const selectedOption = event.target.value;
//     sortProductsBy(selectedOption);
//   });

//   // Initial sorting on page load (best sellers is the default option)
// //   sortProductsBy('best_sellers');

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
  