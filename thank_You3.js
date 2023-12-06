// Wait for the DOM to be ready
fetch('https://cdn.jsdelivr.net/gh/Niranjan-CK/sample-script/prduct.json')
.then((response) => response.json())
    .then((json) => console.log(json));
const data = window.Shopify.checkout
// Find the product with the highest price
const highestPriceProduct = data.line_items.reduce((maxProduct, currentItem) => {
  const currentPrice = parseFloat(currentItem.price);
  const maxPrice = parseFloat(maxProduct.price);

  return currentPrice > maxPrice ? currentItem : maxProduct;
}, data.line_items[0]);

// Get the product ID of the product with the highest price
const highestPriceProductId = highestPriceProduct.product_id;

console.log("Product ID with the highest price:", highestPriceProductId);
  console.log("start")

  // Find the element with the class .order-summary__section--total-lines
  var totalLinesSection = document.querySelector('.order-summary__section--total-lines');
  console.log(totalLinesSection)
  // Check if the element is found
  if (totalLinesSection) {
    // Create a new div element
    var newDiv = document.createElement('div');
    console.log("enter");
    // Set the content or attributes for the new div if needed
    newDiv.textContent = 'Your content goes here'; // Replace with your content

    // Append the new div under the .order-summary__section--total-lines element
    totalLinesSection.appendChild(newDiv);
  }

