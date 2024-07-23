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
 * 5. Call the highlightAndScrollToText function with the extracted text and the anchor (if present).
 * 6. The highlightAndScrollToText function:
 *    a. Searches for the main content section on the page.
 *    b. Normalizes the search text to handle spaces and special characters.
 *    c. Collects all relevant content elements (paragraphs, table rows, headers).
 *    d. If an anchor is provided, identifies the parent element of the anchor link and starts searching from there.
 *    e. Iterates through the content elements to compare their normalized text content to the normalized search text.
 *    f. Highlights the first matching element and scrolls to it smoothly.
 * 7. If the target text is not found, logs an error message.
 *
 * The script ensures that the search is case-insensitive and whitespace-neutral
 * by normalizing both the search text and the content text.
 */


document.addEventListener("DOMContentLoaded", function() {
  // Get the full URL
  const url = window.location.href;

  // Extract the query parameters and the anchor
  const urlObj = new URL(url);
  const highlightString = urlObj.search; // Query parameters
  const anchor = urlObj.hash.substring(1); // Anchor without '#'
  // console.log("Anchor is");
  // console.log(anchor);
  if (highlightString) {
    const params = new URLSearchParams(highlightString);
    const highlightText = params.get('semantic-highlight');

    // console.log("Getting highlight text:");
    // console.log(highlightText);

    if (highlightText) {
      highlightAndScrollToText(highlightText, anchor);
    }
  }
});

function highlightAndScrollToText(searchText, anchor) {
  const mainContent = document.querySelector('main#main-content');
  if (!mainContent) {
    console.error("Main content section not found.");
    return;
  }

  // Collect all relevant elements within the main content
  let contentElements = Array.from(mainContent.querySelectorAll('p, tr, h1, h2, h3, h4, h5, h6'));

  if (anchor) {
    const anchorElement = mainContent.querySelector(`a[href="#${anchor}"]`);
    if (anchorElement) {

      // console.log("anchorElement is ...")
      // console.log(anchorElement)

      // Find the parent of the anchor link
      const parentElement = anchorElement.closest('h1, h2, h3, h4, h5, h6');
      if (parentElement) {

        // console.log("h# is found!");
        // console.log(parentElement);

        // Filter elements to those that follow the parent element of the anchor
        const index = contentElements.indexOf(parentElement);
        contentElements = contentElements.slice(index + 1);
      }
    } else {
      console.error("Anchor element not found. Searching from the beginning of the main content.");
    }
  }

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
