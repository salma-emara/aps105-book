document.addEventListener("DOMContentLoaded", function() {
  // Get the full URL
  const url = window.location.href;

  // Split the URL at '?' to separate query parameters
  const urlParts = url.split('?');
  const queryString = urlParts[1]; // This should now contain 'highlight=ca%20' or null if there's no query parameters
  console.log(queryString);

  // Parse query parameters from the query string
  if (queryString) {
    const params = new URLSearchParams(queryString);
    const highlightText = params.get('semantic-highlight');

    console.log("Getting highlight text:");
    console.log(highlightText);

    if (highlightText) {
      highlightAndScrollToText(highlightText);
    }
  }
});

function highlightAndScrollToText(searchText) {
  console.log("go");
  const mainContent = document.querySelector('main#main-content');
  if (!mainContent) {
    console.error("Main content section not found.");
    return;
  }

  const contentElements = mainContent.querySelectorAll('p, li, table, h1, h2, h3, h4, h5, h6');
  
  // Normalize the search text to handle spaces and special characters
  const normalizedSearchText = normalizeText(searchText);
   console.log(normalizedSearchText);

  let foundElement = null;
  for (let el of contentElements) {
    const elementText = normalizeText(el.textContent);
     console.log(elementText);
    if (elementText.includes(normalizedSearchText)) {
      foundElement = el;
      break;
    }
  }

  if (foundElement) {
    foundElement.classList.add('highlight');
    foundElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    console.error("Text not found in the current document.");
  }
}

function normalizeText(text) {
  // Normalize text by removing all whitespace characters and converting to lowercase
  return text.replace(/\s+/g, '').toLowerCase();
}