import os
from markdown import markdown
from bs4 import BeautifulSoup
from sentence_transformers import SentenceTransformer
import numpy as np
import faiss
import re

# Personal
from func_time import time_block
from md_finder import get_md_files

# Apply the time_block decorator to the imported functions
get_md_files = time_block("get_md_files")(get_md_files)

# Function to read and extract sentences/paragraphs from a Markdown file
@time_block("read_markdown_file")
def read_markdown_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        md_content = file.read()
        html_content = markdown(md_content)
        soup = BeautifulSoup(html_content, "html.parser")
        
        elements = []
        for element in soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code', 'li', 'table']):
            text = element.get_text(separator="\n")
            # Split text into sentences based on punctuation
            sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', text)
            elements.extend(sentences)
        
        return elements

# List of markdown files
# file_paths = [
#     'textbook/chapters/chapter01-computers/basic-structure.md',
#     'textbook/chapters/chapter01-computers/dev-cycle.md',
#     'textbook/chapters/chapter01-computers/intro.md',
#     'textbook/chapters/chapter01-computers/main-memory.md',
#     'textbook/chapters/chapter01-computers/simple-C-code.md'
# ]
base_directory = ''
directory = 'textbook/chapters'
file_paths = get_md_files(directory, base_directory)

base_url = "https://learningc.org/"

# Function to convert file path to URL
@time_block("file_path_to_url")
def file_path_to_url(file_path):
    relative_path = os.path.relpath(file_path, start='textbook')
    url_path = relative_path.replace(os.sep, '/').replace('.md', '')
    return base_url + url_path

all_text_data = []
embedding_to_location = {}
current_index = 0

for file_path in file_paths:
    text_data = read_markdown_file(file_path)
    all_text_data.extend(text_data)
    url = file_path_to_url(file_path)
    for i, _ in enumerate(text_data):
        embedding_to_location[current_index] = {
            "url": url,
            "position": f"sentence {i+1}"
        }
        current_index += 1

# Initialize Sentence-Transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Generate embeddings
embeddings = model.encode(all_text_data)

# Convert embeddings to a numpy array
embeddings_np = np.array(embeddings, dtype='float32')

# Initialize FAISS index
index = faiss.IndexFlatL2(embeddings_np.shape[1])

# Add embeddings to the index
index.add(embeddings_np)

# Function to perform semantic search
@time_block("semantic_search")
def semantic_search(query, top_k=5):
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

# Example search query
query = "What is pointer?"
results = semantic_search(query)

# Display results
for result in results:
    print(f"Text: {result['text']}")
    print(f"URL: {result['url']}")
    print(f"Position: {result['position']}")
    print(f"Distance: {result['distance']}")
    print()
