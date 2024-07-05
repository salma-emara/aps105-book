document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const highlightText = urlParams.get('semantic-highlight');
  if (highlightText) {
    highlightAndScrollToText(highlightText);
  }
});

function highlightAndScrollToText(searchText) {
  const mainContent = document.querySelector('main#main-content');
  if (!mainContent) {
    console.error("Main content section not found.");
    return;
  }

  const contentElements = mainContent.querySelectorAll('p, li, table, h1, h2, h3, h4, h5, h6');
  let found = false;
  
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