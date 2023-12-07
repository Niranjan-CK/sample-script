// Wait for the DOM to be ready
 async function fetchData() {
    try {
      console.log('----------------------------------------------------------------');
      const response = await fetch('https://cdn.jsdelivr.net/gh/Niranjan-CK/sample-script/product1.json');
      const data = await response.json();
  
      console.log(data);
      console.log('----------------------------------------------------------------');

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  fetchData();
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
newDiv.innerHTML = `
  <div style="
    display: flex;
    gap: 20px;
    padding: 5px;
    border: 1px solid lawngreen;
    width: fit-content;">
    <div style="width: 100px; height: 50px;">img</div>
    <div style="width: 100px; height: fit-content;">name</div>
    <div>btn</div>
  </div>
`;

// Append the new div to the body of the document

    // Append the new div under the .order-summary__section--total-lines element
    totalLinesSection.appendChild(newDiv);
  }

