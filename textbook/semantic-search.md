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

<div id="semantic-search-results">
  <!-- The search results will be injected here by JavaScript -->
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
    performSemanticSearch(query).catch(error => console.error("Error in performSemanticSearch:", error));
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
    throw error;
  }
}

async function performSemanticSearch(query) {
  console.log("Performing semantic search for query:", query);
  const extractor = await loadSemantic('Xenova/all-MiniLM-L6-v2');
  const queryEmbedding = await embedQuery(extractor, query);

  console.log("Fetching embeddings and metadata");
  const embeddings = await fetch('outputs/embeddings.json').then(res => res.json());
  const metadata = await fetch('outputs/embedding_to_location.json').then(res => res.json());
  const textData = await fetch('outputs/all_text_data.json').then(res => res.json());

  console.log("Embeddings, metadata, and text data fetched successfully");

  const similarities = await getSimilarities(queryEmbedding, embeddings);
  displayResults(similarities, metadata, textData);
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
    const div = document.createElement('div');
    const location = metadata[result.index];
    div.innerHTML = `<a href="${location.url}">${textData[result.index]} - Similarity: ${result.similarity}</a>`;
    resultsContainer.appendChild(div);
  });
  console.log("Results displayed successfully");
}
</script>
