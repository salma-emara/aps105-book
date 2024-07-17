/*
 * Author: William J Wen
 * Contact: jwilliam.wen@mail.utoronto.ca
 *
 * This is a custom JavaScript file designed to work with Jupyter Book.
 * It applies to all pages within a Jupyter Book and is an addition to the Jupyter Book package.
 * 
 * This script is designed to highlight specific text on a webpage and scroll to it.
 * It works by parsing a query parameter from the URL, identifying the target text,
 * and then highlighting and scrolling to the first instance of that text within the
 * main content of the page. Here is an overview of the steps:
 *
 * 1. Wait for the document to be fully loaded (DOMContentLoaded event).
 * 2. Retrieve the full URL of the current page.
 * 3. Extract the query parameters from the URL.
 * 4. Parse the 'semantic-highlight' parameter to get the text to be highlighted.
 * 5. Call the highlightAndScrollToText function with the extracted text.
 * 6. The highlightAndScrollToText function:
 *    a. Searches for the main content section on the page.
 *    b. Normalizes the search text to handle spaces and special characters.
 *    c. Iterates through content elements (paragraphs, list items, tables, headers).
 *    d. Compares the normalized text content of each element to the normalized search text.
 *    e. Highlights the first matching element and scrolls to it smoothly.
 * 7. If the target text is not found, log an error message.
 *
 * The script ensures that the search is case-insensitive and whitespace-neutral
 * by normalizing both the search text and the content text.
 */


document.addEventListener("DOMContentLoaded", function() {
  // Get the full URL
  const url = window.location.href;

  // Split the URL at '?' to separate query parameters
  const urlParts = url.split('?');
  const highlightString = urlParts[1]; // This should now contain 'highlight=ca%20' or null if there's no query parameters
  console.log("Getting highlightString")
  console.log(highlightString);

  // Parse query parameters from the query string
  if (highlightString) {
    const params = new URLSearchParams(highlightString);
    const highlightText = params.get('semantic-highlight');

    console.log("Getting highlight text:");
    console.log(highlightText);

    if (highlightText) {
      highlightAndScrollToText(highlightText);
    }
  }
});

function highlightAndScrollToText(searchText) {
  // console.log("Highlight and Scroll!");
  const mainContent = document.querySelector('main#main-content');
  if (!mainContent) {
    console.error("Main content section not found.");
    return;
  }

  const contentElements = mainContent.querySelectorAll('p, tr, h1, h2, h3, h4, h5, h6');
  
  // Normalize the search text to handle spaces and special characters
  const normalizedSearchText = normalizeText(searchText);
  // console.log(normalizedSearchText);

  let foundElement = null;
  for (let el of contentElements) {
    const elementText = normalizeText(el.textContent);
    // console.log(elementText);
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