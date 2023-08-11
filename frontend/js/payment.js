// Retrieve the stored firstName from localStorage
const storedFirstName = localStorage.getItem('firstName');
const storedLastName = localStorage.getItem('lastName');
const storedPhoneNumber = localStorage.getItem('phoneNumber');
const storedAddress = localStorage.getItem('address');
const storedCity = localStorage.getItem('city');
const storedState = localStorage.getItem('state');
const storedProvince = localStorage.getItem('province');
const storedPostalCode = localStorage.getItem('postalCode');

// Retrieve the element where you want to display the firstName
const displayFirstNameElement = document.getElementById('display-first-name');
const displayLastNameElement = document.getElementById('display-last-name');
const displayPhoneNumberElement = document.getElementById('display-phone-number');
const displayAddressElement = document.getElementById('display-address-1');
const displayCityElement = document.getElementById('display-city');
const displayProvinceElement = document.getElementById('display-province');
const displayStateElement = document.getElementById('display-state');
const displayPostalCodeElement = document.getElementById('display-postal-code');


// Check if the element exists and the stored firstName is available
if (displayFirstNameElement && storedFirstName) {
  displayFirstNameElement.textContent = storedFirstName;
}
if (displayLastNameElement && storedLastName) {
    displayLastNameElement.textContent = storedLastName;
}
if (displayPhoneNumberElement && storedPhoneNumber) {
    displayPhoneNumberElement.textContent = storedPhoneNumber;
}
if (displayAddressElement && storedAddress) {
    displayAddressElement.textContent = storedAddress;
}

if (displayCityElement && storedCity) {
    displayCityElement.textContent = storedCity;
}

if (displayProvinceElement && storedProvince) {
    displayProvinceElement.textContent = storedProvince;
}

if (displayStateElement && storedState) {
    displayStateElement.textContent = storedState;
}



if (displayPostalCodeElement && storedPostalCode) {
    displayPostalCodeElement.textContent = storedPostalCode;
}


