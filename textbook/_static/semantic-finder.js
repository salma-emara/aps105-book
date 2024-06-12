document.addEventListener("DOMContentLoaded", function() {
    var searchField = document.querySelector(".bd-search");
    var customNavContent = document.getElementById("custom-nav-content");
    if (searchField && customNavContent) {
      searchField.parentNode.insertBefore(customNavContent, searchField.nextSibling);
    }
  });
  
