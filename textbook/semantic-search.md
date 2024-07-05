---
title: Semantic Search Results
hide:
  - navigation
  - toc
  - footer
  - header
  - breadcrumbs
  - search
hide_toc: true
hide_navbar: true
hide_pagenav: true
search_exclude: true
hide_footer: true
---

<div>
  <span id="semantic-search-title"> </span>
  <div id="semantic-search-results" class="semantic-results-container">
    <span id="search-progress" style="padding-left: 10px; font-style: italic;"></span>
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
      displayResults(cachedData.similarities, cachedData.metadata, cachedData.textData);
      titleElement.innerText = `Search finished, found ${cachedData.similarities.length} pages best matching the search query.`;
      return;
    }
    
    performSemanticSearch(query).catch(error => {
      console.error("Error in performSemanticSearch:", error);
      if (titleElement) {
        titleElement.innerText = 'Error during search. Please try again.';
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
  displayResults(similarities, metadata, textData);

  // Cache the result in local storage
  localStorage.setItem(query, JSON.stringify({ similarities, metadata, textData }));
}

async function getSimilarities(queryEmbedding, embeddings) {
  console.log("Calculating similarities");
  const results = [];
  for (let i = 0; i < embeddings.length; i++) {
    const embedding = embeddings[i];
    const similarity = calculateCosineSimilarity(queryEmbedding, embedding);
    results.push({ index: i, similarity });
  }
  results.sort((a, b) => b.similarity - a.similarity);
  console.log("Similarities calculated:", results.slice(0, 10));
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

function displayResults(similarities, metadata, textData) {
  console.log("Displaying results");
  const resultsContainer = document.getElementById('semantic-search-results');
  resultsContainer.innerHTML = ''; // Clear previous results
  similarities.forEach(result => {
    const location = metadata[result.index];
    const text = textData[result.index];
    const similarity = result.similarity;

    const resultDiv = document.createElement('div');
    resultDiv.classList.add('search-result');

    const resultLink = document.createElement('a');
    
    resultLink.href = `${location.url}?semantic-highlight=${encodeURIComponent(text)}`; 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent

    resultLink.innerHTML = `<span class="result-text">${text}</span> - <span class="similarity-score">Similarity: ${similarity.toFixed(4)}</span>`;
    resultLink.classList.add('search-result-link');

    resultDiv.appendChild(resultLink);
    resultsContainer.appendChild(resultDiv);
  });

  const titleElement = document.getElementById('semantic-search-title');
  if (titleElement) {
    titleElement.innerText = `Search finished, found ${similarities.length} pages best matching the search query.`;
    console.log(`Progress: Search finished, found ${similarities.length} pages best matching the search query.`);
  }
  console.log("Results displayed successfully");
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
