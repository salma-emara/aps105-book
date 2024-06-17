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

  // Separate Deployment and Local for correct relative paths
  // Jumps to result page at search
  const form = document.getElementById('semantic-search-form');
  
  // Function to check if the environment is local
  function isLocalEnvironment() {
    return window.location.protocol === 'file:';
  }

  // Set the form action based on the environment
  if (isLocalEnvironment()) {
    // For local environment
    const pathArray = window.location.pathname.split('/');
    const buildIndex = pathArray.indexOf('_build');
    if (buildIndex !== -1) {
      const localPath = pathArray.slice(0, buildIndex + 2).join('/');
      form.action = `${localPath}/semantic-search.html`;
    }
  } else {
    // For deployment environment
    form.action = `${window.location.origin}/semantic-search.html`;
  }

});

