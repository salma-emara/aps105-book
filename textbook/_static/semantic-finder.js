document.addEventListener("DOMContentLoaded", function() {
  // Select the default search form
  var defaultSearchField = document.querySelector(".bd-search");
  // Select the custom search form
  var semanticSearchForm = document.getElementById("semantic-search-form");
  // Check if both elements exist
  if (defaultSearchField && semanticSearchForm) {
    // Move the custom search form after the default search form
    defaultSearchField.parentNode.insertBefore(semanticSearchForm, defaultSearchField.nextSibling);
  }
});

