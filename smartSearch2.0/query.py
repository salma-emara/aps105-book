import os  # Provides functions to interact with the operating system, including file and directory operations.
from sentence_transformers import SentenceTransformer  # Provides pre-trained models to generate embeddings for sentences and paragraphs.
import numpy as np  # A powerful library for numerical computing, especially with arrays and matrices.
import faiss  # A library for efficient similarity search and clustering of dense vectors.
import pickle  # Allows for serializing and deserializing Python object structures, useful for saving and loading data.
import sys  # Provides access to some variables used or maintained by the interpreter and to functions that interact strongly with the interpreter.

print("Loading embeddings, mappings, and FAISS index...")

try:
    # Load embeddings and mapping
    with open('smartSearch2.0/output_embeddings/embeddings_p&l_chapter4.npy', 'rb') as f:
        embeddings_np = np.load(f)

    with open('smartSearch2.0/output_embeddings/embedding_to_location_p&l_chapter4.pkl', 'rb') as f:
        embedding_to_location = pickle.load(f)

    with open('smartSearch2.0/output_embeddings/all_text_data_p&l_chapter4.pkl', 'rb') as f:
        all_text_data = pickle.load(f)

    # Load FAISS index
    index = faiss.read_index('smartSearch2.0/output_embeddings/faiss_index_p&l_chapter4.bin')
except FileNotFoundError as e:
    print(f"File not found: {e}")
    sys.exit(1)
except Exception as e:
    print(f"An error occurred while loading data: {e}")
    sys.exit(1)

# Initialize Sentence-Transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

def semantic_search(query, top_k=20):
    """
    Perform a semantic search on the precomputed embeddings.

    Parameters:
    query (str): The search query.
    top_k (int): The number of top results to return.

    Returns:
    list: A list of dictionaries containing the search results.
    """
    query_embedding = model.encode([query])
    distances, indices = index.search(np.array(query_embedding, dtype='float32'), top_k)
    results = []
    for i, idx in enumerate(indices[0]):
        result = {
            "text": all_text_data[idx],
            "url": embedding_to_location[idx]["url"],
            "position": embedding_to_location[idx]["position"],
            "distance": distances[0][i],
            "rank": i + 1  # Adding the rank based on the index
        }
        results.append(result)
    return results

if __name__ == "__main__":
    while True:
        query = input("Enter your query (or type 'quit' to exit): ").strip()
        if query.lower() == 'quit':
            print("Exiting...")
            break
        if not query:
            print("Query cannot be empty. Please enter a valid query.")
            continue

        results = semantic_search(query)

        # Display results
        print("\n" + "=" * 40 + f"\nResults for query: '{query}'\n" + "=" * 40 + "\n")
        for result in results:
            print(f"Rank: {result['rank']}")
            print(f"Text: {result['text']}")
            print(f"URL: {result['url']}")
            print(f"Position: {result['position']}")
            print(f"Distance: {result['distance']}\n")

        # Separation between different queries
        print("\n" + "#" * 80 + "\n")
