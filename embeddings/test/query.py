# This script is used to test the difference between Sentence Transformer and transformer.js
# Results: in the settings of this repository, transformer.js normalize the vector, but 
# this does not affect consince similarity score

from sentence_transformers import SentenceTransformer
import numpy as np

# Initialize Sentence-Transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Generate embeddings
query_embedding = model.encode("What is a pointer")

# Convert embeddings to a numpy array
embeddings_np = np.array(query_embedding, dtype='float32')

# Print the query embedding (as a list of floats)
print("Query embedding:", query_embedding)

# Print the numpy embedding (as a numpy array)
print("Numpy embedding:", embeddings_np)
