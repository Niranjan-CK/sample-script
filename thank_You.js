// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
  
  // Find the element with the class .order-summary__section--total-lines
  var totalLinesSection = document.querySelector('.order-summary__section--total-lines');

  // Check if the element is found
  if (totalLinesSection) {
    // Create a new div element
    var newDiv = document.createElement('div');

    // Set the content or attributes for the new div if needed
    newDiv.textContent = 'Your content goes here'; // Replace with your content

    // Append the new div under the .order-summary__section--total-lines element
    totalLinesSection.appendChild(newDiv);
  }
});
