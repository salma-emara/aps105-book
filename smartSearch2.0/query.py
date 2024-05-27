import os  # Provides functions to interact with the operating system, including file and directory operations.
#os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"  # Set environment variable to avoid OpenMP runtime conflict
from sentence_transformers import SentenceTransformer  # Provides pre-trained models to generate embeddings for sentences and paragraphs.
import numpy as np  # A powerful library for numerical computing, especially with arrays and matrices.
import faiss  # A library for efficient similarity search and clustering of dense vectors.
import pickle  # Allows for serializing and deserializing Python object structures, useful for saving and loading data.


print("Loading embeddings, mappings, and FAISS index...")

# Load embeddings and mapping
with open('smartSearch2.0/output_embeddings/embeddings_p&l.npy', 'rb') as f:
    embeddings_np = np.load(f)

with open('smartSearch2.0/output_embeddings/embedding_to_location_p&l.pkl', 'rb') as f:
    embedding_to_location = pickle.load(f)

with open('smartSearch2.0/output_embeddings/all_text_data_p&l.pkl', 'rb') as f:
    all_text_data = pickle.load(f)

# Load FAISS index
index = faiss.read_index('smartSearch2.0/output_embeddings/faiss_index_p&l.bin')

# Initialize Sentence-Transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Function to perform semantic search
def semantic_search(query, top_k=20):
    query_embedding = model.encode([query])
    distances, indices = index.search(np.array(query_embedding, dtype='float32'), top_k)
    results = []
    for i, idx in enumerate(indices[0]):
        result = {
            "text": all_text_data[idx],
            "url": embedding_to_location[idx]["url"],
            "position": embedding_to_location[idx]["position"],
            "distance": distances[0][i]
        }
        results.append(result)
    return results

if __name__ == "__main__":

# # Example search query
# query = "why do we need linked list"
# results = semantic_search(query)

    # Main loop to handle terminal input
    while True:
        query = input("Enter your query (or type 'quit' to exit): ")
        if query.lower() == 'quit':
            print("Exiting...")
            break

        results = semantic_search(query)

        # Display results
        for result in results:
            print(f"Text: {result['text']}")
            print(f"URL: {result['url']}")
            print(f"Position: {result['position']}")
            print(f"Distance: {result['distance']}")
            print()
