---
:orphan:
:hidden:
orphan: true
# https://github.com/executablebooks/jupyter-book/issues/1006

# orphan was supposed to disconnect this page from the the jupyter book; that is to say,
# this page should not appear on toc left-side nav bar and not included in default search and etc.

# However, orphan or hidden directives did not work as expected, 
# the above expected behavior is poorly done by not having a title for this page, 
# as the line below is not placed in markdown: 

# Semantic Search Result
---

<div>
  <h2 id="semantic-search-title"> </h2>
  <p id="search-progress" class="search-summary"></p>
  <div id="semantic-search-results" class="semantic-results-container">
    <!-- The search results will be injected here by JavaScript -->
  </div>
</div>

<script type="module">
import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';
import * as ort from 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/ort.js';

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM fully loaded and parsed");
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q');
  console.log("Query parameter:", query);

  if (query) {
    const titleElement = document.getElementById('semantic-search-title');
    if (titleElement) {
      titleElement.innerText = `Searching for ${query}...`;
      console.log(`Progress: Searching for ${query}...`);
    }
    
    // Check if the result is already in local storage
    const cachedResult = localStorage.getItem(query);
    if (cachedResult) {
      console.log("Using cached result");
      const cachedData = JSON.parse(cachedResult);
      displayCachedResults(cachedData.similarities, cachedData.metadata, cachedData.textData);
      titleElement.innerText = `Semantic Search Results for ${query}`;
      return;
    }
    
    performSemanticSearch(query).catch(error => {
      console.error("Error in performSemanticSearch:", error);
      if (titleElement) {
        titleElement.innerText = `An Error Occurred during search for ${query}`;
      }
    });
  }
});

async function loadSemantic(modelName) {
  try {
    console.log(`Loading model: ${modelName}`);
    const extractor = await pipeline('feature-extraction', modelName, { ort });
    console.log("Model loaded successfully");
    return extractor;
  } catch (error) {
    console.error("Error loading model:", error);
    const progressElement = document.getElementById('search-progress');
    if (progressElement) {
      progressElement.innerText = 'Error loading model. Please try again.';
    }
    throw error;
  }
}

async function embedQuery(extractor, text) {
  try {
    console.log(`Embedding query: ${text}`);
    const output = await extractor([text], { pooling: 'mean', normalize: true });
    console.log("Query embedded successfully:", output);
    return output.tolist()[0]; // Convert Tensor to nested array and return the first embedding
  } catch (error) {
    console.error("Error embedding query:", error);
    const progressElement = document.getElementById('search-progress');
    if (progressElement) {
      progressElement.innerText = 'Error embedding query. Please try again.';
    }
    throw error;
  }
}

async function performSemanticSearch(query) {
  console.log("Performing semantic search for query:", query);
  const progressElement = document.getElementById('search-progress');
  if (progressElement) {
    progressElement.innerText = 'Loading model...';
    console.log('Progress: Loading model...');
  }
  const extractor = await loadSemantic('Xenova/all-MiniLM-L6-v2');
  if (progressElement) {
    progressElement.innerText = 'Embedding query...';
    console.log('Progress: Embedding query...');
  }
  const queryEmbedding = await embedQuery(extractor, query);

  if (progressElement) {
    progressElement.innerText = 'Fetching embeddings and metadata...';
    console.log('Progress: Fetching embeddings and metadata...');
  }

  // Adding a cache-busting parameter to the URLs
  const timestamp = new Date().getTime();
  const embeddings = await fetch(`outputs/embeddings.json?t=${timestamp}`).then(res => res.json());
  const metadata = await fetch(`outputs/embedding_to_location.json?t=${timestamp}`).then(res => res.json());
  const textData = await fetch(`outputs/all_text_data.json?t=${timestamp}`).then(res => res.json());

  if (progressElement) {
    progressElement.innerText = 'Calculating similarities...';
    console.log('Progress: Calculating similarities...');
  }
  const similarities = await getSimilarities(queryEmbedding, embeddings);
  if (progressElement) {
    progressElement.innerText = 'Displaying results...';
    console.log('Progress: Displaying results...');
  }
  displayNewResults(similarities, metadata, textData);
  const titleElement = document.getElementById('semantic-search-title');
  if (titleElement) {
    titleElement.innerText = `Semantic Search Results for ${query}`;
    console.log(`Results displayed successfully.`);
  }

  // Cache only the necessary data
  const cachedData = {
    similarities,
    metadata: similarities.map(result => metadata[result.index]),
    textData: similarities.map(result => textData[result.index])
  };
  localStorage.setItem(query, JSON.stringify(cachedData));
}

/**
 * Calculates the cosine similarities between a query embedding and an array of embeddings.
 *
 * @param {Array<number>} queryEmbedding - The embedding of the query.
 * @param {Array<Array<number>>} embeddings - The array of embeddings to compare against.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of the top 10 similarities, each with an index and similarity score.
 */
async function getSimilarities(queryEmbedding, embeddings) {
  console.log("Calculating similarities"); // Log the start of the calculation process

  const results = []; // Initialize an array to store the results

  // Iterate over each embedding in the embeddings array
  for (let i = 0; i < embeddings.length; i++) {
    const embedding = embeddings[i]; // Get the current embedding
    const similarity = calculateCosineSimilarity(queryEmbedding, embedding); // Calculate the cosine similarity between the query embedding and the current embedding
    results.push({ index: i, similarity }); // Add the index and similarity score to the results array
  }

  // Sort the results array in descending order based on the similarity score
  results.sort((a, b) => b.similarity - a.similarity);

  // Log the top 10 similarities
  console.log("Similarities calculated:", results.slice(0, 10));

  // Return the top 10 similarities
  return results.slice(0, 10);
}

function calculateCosineSimilarity(embedding1, embedding2) {
  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;
  for (let i = 0; i < embedding1.length; i++) {
    dotProduct += embedding1[i] * embedding2[i];
    normA += embedding1[i] ** 2;
    normB += embedding2[i] ** 2;
  }
  const similarity = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  return similarity;
}

function displayNewResults(similarities, metadata, textData) {
  console.log("Displaying newly computed results");
  const resultsContainer = document.getElementById('semantic-search-results');
  resultsContainer.innerHTML = ''; // Clear previous results
  similarities.forEach(result => {
    const location = metadata[result.index];
    const text = textData[result.index];
    const similarity = result.similarity;

    displayResult(similarity, text, location);
  });

  const progressElement = document.getElementById('search-progress');
  if (progressElement) {
    progressElement.innerText = `Search finished, found ${similarities.length} pages best matching the search query.`;
    console.log(`Progress: Search finished, found ${similarities.length} pages best matching the search query.`);
  }
  console.log("Results displayed successfully");
}

// Note: metadata, textData, for cached is different from the actual metadata and textData, as there's only "ten" of them
function displayCachedResults(similarities, metadata, textData) {
  console.log("Displaying cached results");
  const resultsContainer = document.getElementById('semantic-search-results');
  resultsContainer.innerHTML = ''; // Clear previous results
  similarities.forEach((result, i) => {
    const location = metadata[i];
    const text = textData[i];
    const similarity = result.similarity;

    displayResult(similarity, text, location);
  });

  const progressElement = document.getElementById('search-progress');
  if (progressElement) {
    progressElement.innerText = `Search finished, found ${similarities.length} pages best matching the search query.`;
    console.log(`Progress: Search finished, found ${similarities.length} pages best matching the search query.`);
  }
  console.log("Results displayed successfully");
}

/**
 * Displays the search result on the web page.
 *
 * @param {number} similarity - The similarity score of the search result.
 * @param {string} text - The text content of the search result.
 * @param {Object} location - The location object containing the URL of the search result.
 */
function displayResult(similarity, text, location) {
  // Create a new div element to hold the search result
  const resultDiv = document.createElement('div');
  resultDiv.classList.add('search-result'); // Add the 'search-result' class to the div

  // Create a new anchor element to act as a link to the search result
  const resultLink = document.createElement('a');
  
  // Set the href attribute of the link to the URL with the search text highlighted
  resultLink.href = `${location.url}?semantic-highlight=${encodeURIComponent(text)}`;
  // encodeURIComponent is used to ensure the text is properly encoded for use in a URL
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent

  // Set the inner HTML of the link to display the search text and similarity score
  resultLink.innerHTML = `<span class="result-text">${text}</span> - <span class="similarity-score">Similarity: ${similarity.toFixed(4)}</span>`;
  resultLink.classList.add('search-result-link'); // Add the 'search-result-link' class to the link

  // Append the link to the result div
  resultDiv.appendChild(resultLink);

  const resultsContainer = document.getElementById('semantic-search-results');
  // Append the result div to the results container on the web page
  resultsContainer.appendChild(resultDiv);
}

</script>

<style>
.semantic-results-container {
  margin-top: 20px;
}

.search-result {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.search-result-link {
  text-decoration: none;
  color: #1a0dab;
  font-weight: bold;
}

.search-result-link:hover {
  text-decoration: underline;
}

.similarity-score {
  font-size: 0.9em;
  color: #555;
}

.result-text {
  display: block;
  font-size: 1em;
}
</style>
