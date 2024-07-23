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
  <ul id="semantic-search-results" class="search">
    <!-- The search results will be injected here by JavaScript -->
  </ul>
</div>

<script type="module">
import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';
import * as ort from 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/ort.js';

document.addEventListener("DOMContentLoaded", function() {
  // console.log("DOM fully loaded and parsed");

  // Retrieve query parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q');
  // console.log("Query parameter:", query);

  if (query) {
    // Update the page title with the query
    const titleElement = document.getElementById('semantic-search-title');
    if (titleElement) {
      titleElement.innerText = `Searching for ${query}...`;
      // console.log(`Progress: Searching for ${query}...`);
    }
    
    // Check if the result is already in local storage
    const cachedResult = localStorage.getItem(query);
    if (cachedResult) {
      // console.log("Using cached result");
      const cachedData = JSON.parse(cachedResult);
      displayCachedResults(cachedData.similarities, cachedData.metadata, cachedData.textData, cachedData.prevTexts, cachedData.nextTexts);
      titleElement.innerText = `Semantic Search Results for ${query}`;
      return;
    }
    
    // Perform semantic search if no cached result is found
    performSemanticSearch(query).catch(error => {
      console.error("Error in performSemanticSearch:", error);
      if (titleElement) {
        titleElement.innerText = `An Error Occurred during search for ${query}`;
      }
    });
  }
});

/**
 * Loads the semantic model for feature extraction.
 *
 * @param {string} modelName - The name of the model to load.
 * @returns {Promise<Object>} A promise that resolves to the feature extractor.
 */
async function loadSemantic(modelName) {
  try {
    // console.log(`Loading model: ${modelName}`);
    const extractor = await pipeline('feature-extraction', modelName, { ort });
    // console.log("Model loaded successfully");
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

/**
 * Embeds the query text using the feature extractor.
 *
 * @param {Object} extractor - The feature extractor.
 * @param {string} text - The query text to embed.
 * @returns {Promise<Array<number>>} A promise that resolves to the query embedding.
 */
async function embedQuery(extractor, text) {
  try {
    // console.log(`Embedding query: ${text}`);
    const output = await extractor([text], { pooling: 'mean', normalize: true });
    // console.log("Query embedded successfully:", output);
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

/**
 * Performs the semantic search for the given query.
 *
 * @param {string} query - The query text.
 */
async function performSemanticSearch(query) {
  // console.log("Performing semantic search for query:", query);

  const progressElement = document.getElementById('search-progress');
  if (progressElement) {
    progressElement.innerText = 'Loading model...';
    // console.log('Progress: Loading model...');
  }

  // Load the semantic model
  const extractor = await loadSemantic('Xenova/all-MiniLM-L6-v2');
  if (progressElement) {
    progressElement.innerText = 'Embedding query...';
    // console.log('Progress: Embedding query...');
  }

  // Embed the query text
  const queryEmbedding = await embedQuery(extractor, query);

  if (progressElement) {
    progressElement.innerText = 'Fetching embeddings and metadata...';
    // console.log('Progress: Fetching embeddings and metadata...');
  }

  // Fetch embeddings and metadata with cache-busting parameter
  const timestamp = new Date().getTime();
  // Asynchronous Fetching: use Promise.all to fetch embeddings, metadata, and textData simultaneously.
  const [embeddings, metadata, textData] = await Promise.all([
    fetch(`outputs/embeddings.json?t=${timestamp}`).then(res => res.json()),
    fetch(`outputs/embedding_to_location.json?t=${timestamp}`).then(res => res.json()),
    fetch(`outputs/all_text_data.json?t=${timestamp}`).then(res => res.json())
  ]);

  if (progressElement) {
    progressElement.innerText = 'Calculating similarities...';
    // console.log('Progress: Calculating similarities...');
  }

  // Calculate similarities between query embedding and document embeddings
  const similarities = await getSimilarities(queryEmbedding, embeddings);
  if (progressElement) {
    progressElement.innerText = 'Displaying results...';
    // console.log('Progress: Displaying results...');
  }

  // Display the search results
  displayNewResults(similarities, metadata, textData);

  const titleElement = document.getElementById('semantic-search-title');
  if (titleElement) {
    titleElement.innerText = `Semantic Search Results for ${query}`;
    // console.log(`Results displayed successfully.`);
  }

  // Cache only the necessary data
  const cachedData = {
    similarities,
    metadata: similarities.map(result => metadata[result.index]),
    textData: similarities.map(result => textData[result.index]),
    prevTexts: similarities.map(result => {
      if (result.index > 0 && metadata[result.index - 1].anchor === metadata[result.index].anchor) {
        return textData[result.index - 1];
      }
      return '';
    }),
    nextTexts: similarities.map(result => {
      if (result.index < textData.length - 1 && metadata[result.index + 1].anchor === metadata[result.index].anchor) {
        return textData[result.index + 1];
      }
      return '';
    })
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
  // console.log("Calculating similarities"); // Log the start of the calculation process

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
  // console.log("Similarities calculated:", results.slice(0, 10));

  // Return the top 10 similarities
  return results.slice(0, 10);
}

/**
 * Calculates the cosine similarity between two embeddings.
 *
 * @param {Array<number>} embedding1 - The first embedding.
 * @param {Array<number>} embedding2 - The second embedding.
 * @returns {number} The cosine similarity between the two embeddings.
 */
function calculateCosineSimilarity(embedding1, embedding2) {
  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;

  // Calculate dot product and norms
  for (let i = 0; i < embedding1.length; i++) {
    dotProduct += embedding1[i] * embedding2[i];
    normA += embedding1[i] ** 2;
    normB += embedding2[i] ** 2;
  }

  // Compute cosine similarity
  const similarity = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  return similarity;
}

/**
 * Displays the newly computed search results on the web page.
 *
 * @param {Array<Object>} similarities - The array of similarities with index and similarity score.
 * @param {Array<Object>} metadata - The array of metadata corresponding to the embeddings.
 * @param {Array<string>} textData - The array of text data corresponding to the embeddings.
 */
function displayNewResults(similarities, metadata, textData) {
  // console.log("Displaying newly computed results");

  // Get the results container element
  const resultsContainer = document.getElementById('semantic-search-results');
  resultsContainer.innerHTML = ''; // Clear previous results

  // Iterate over the similarities and display each result
  similarities.forEach(result => {
    const location = metadata[result.index];
    const text = textData[result.index];
    const similarity = result.similarity;

    let prev_text = '';
    let next_text = '';

    // Check for previous sentence
    if (result.index > 0 && metadata[result.index - 1].anchor === metadata[result.index].anchor) {
      prev_text = textData[result.index - 1];
    }

    // Check for next sentence
    if (result.index < textData.length - 1 && metadata[result.index + 1].anchor === metadata[result.index].anchor) {
      next_text = textData[result.index + 1];
    }

    displayResult(similarity, text, location, prev_text, next_text);
  });

  const progressElement = document.getElementById('search-progress');
  if (progressElement) {
    progressElement.innerText = `Search finished, found ${similarities.length} pages best matching the search query.`;
    // console.log(`Progress: Search finished, found ${similarities.length} pages best matching the search query.`);
  }
  // console.log("Results displayed successfully");
}

/**
 * Displays the cached search results on the web page.
 *
 * @param {Array<Object>} similarities - The array of similarities with index and similarity score.
 * @param {Array<Object>} metadata - The array of metadata corresponding to the cached embeddings.
 * @param {Array<string>} textData - The array of text data corresponding to the cached embeddings.
 */
function displayCachedResults(similarities, metadata, textData, prevTexts, nextTexts) {
  // console.log("Displaying cached results");

  // Get the results container element
  const resultsContainer = document.getElementById('semantic-search-results');
  resultsContainer.innerHTML = ''; // Clear previous results

  // Iterate over the similarities and display each cached result
  similarities.forEach((result, i) => {
    const location = metadata[i];
    const text = textData[i];
    const similarity = result.similarity;
    const prev_text = prevTexts[i];
    const next_text = nextTexts[i];
    displayResult(similarity, text, location, prev_text, next_text);
  });

  const progressElement = document.getElementById('search-progress');
  if (progressElement) {
    progressElement.innerText = `Search finished, found ${similarities.length} pages best matching the search query.`;
    // console.log(`Progress: Search finished, found ${similarities.length} pages best matching the search query.`);
  }
  // console.log("Results displayed successfully");
}

/**
 * Displays the search result on the web page.
 *
 * @param {number} similarity - The similarity score of the search result.
 * @param {string} text - The text content of the search result.
 * @param {Object} location - The location object containing the URL of the search result.
 * @param {string} prev_text - The previous sentence text.
 * @param {string} next_text - The next sentence text.
 */
function displayResult(similarity, text, location, prev_text, next_text) {
  // Create a new li element to hold one search result
  const li = document.createElement('li');

  // Create a page title element and act as a link to the search result
  const a = document.createElement('a');
  const anchor = location.anchor ? `#${location.anchor}` : '';
  // Set the href attribute of the link to the URL with the search text highlighted
  a.href = `${location.url}?semantic-highlight=${encodeURIComponent(text)}${anchor}`;
  // encodeURIComponent is used to ensure the text is properly encoded for use in a URL
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent

  // Include the section number and page title in the display
  const pageTitle = location.page_title ? `${location.page_title}` : '';
  const sectionNumber = location.section_number ? `<span class="section-number">${location.section_number} </span>` : '';
  const sectionName = location.section_name ? location.section_name : '';
  if (sectionName == '') {
    a.innerHTML = pageTitle;
  } else {
    a.innerHTML = `${pageTitle} - ${sectionName}`;
  }

  // Create <p> element for context
  const p = document.createElement('p');
  p.className = 'context';
  
  const highlightedText = `<span class="highlighted" style="color:black">${text}</span>`;
  p.innerHTML = `${prev_text} ${highlightedText} ${next_text}`;

  //<span class="result-text">${text}</span> - <span class="similarity-score">Similarity: ${similarity.toFixed(4)}</span>

  // Append <a> and <p> elements to <li> element
  li.appendChild(a);
  li.appendChild(p);

  const resultsContainer = document.getElementById('semantic-search-results');
  // Append the result li to the results container on the web page
  resultsContainer.appendChild(li);
}

</script>

<style>
/* Style for the similarity score */
.similarity-score {
  font-size: 0.9em;
  color: #555;
}
</style>
