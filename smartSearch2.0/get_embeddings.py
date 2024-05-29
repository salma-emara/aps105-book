import sys
import os
import re
from sentence_transformers import SentenceTransformer
import numpy as np
import faiss
import pickle
import logging
from bs4 import BeautifulSoup

# Personal
# Add the parent directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'smartSearch')))

from func_time import time_block
from md_finder import get_md_files

# Configuration
BASE_DIRECTORY = ''
HTML_DIRECTORY = 'textbook/_build/html/chapters/chapter04-loops'
BASE_URL = "https://learningc.org/"
OUTPUT_DIR = './smartSearch2.0/output_embeddings'

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Apply the time_block decorator to the imported functions
get_md_files = time_block("get_md_files")(get_md_files)

@time_block("get_html_files")
def get_html_files(directory, base_directory):
    """
    Get list of all HTML files in the specified directory.
    """
    html_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                html_files.append(os.path.relpath(os.path.join(root, file), base_directory))
    logging.info(f"Found {len(html_files)} HTML files.")
    return html_files

#@time_block("read_html_file")
def read_html_file(file_path):
    """
    Read an HTML file and extract sentences from paragraphs and list items.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            html_content = file.read()
            soup = BeautifulSoup(html_content, "html.parser")
            
            # Find the <main> tag
            main_content = soup.find('main')
            if not main_content:
                logging.warning(f"No <main> tag found in {file_path}")
                return []

            elements = []
            for element in main_content.find_all(['p', 'li']):
                text = element.get_text(separator="\n").strip()
                # Remove multiple spaces and newlines
                text = re.sub(r'\s+', ' ', text)
                # Split text into sentences based on punctuation
                sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', text)
                elements.extend([sentence.strip() for sentence in sentences if sentence])
            
            return elements
                
    except Exception as e:
        logging.error(f"Error reading file {file_path}: {e}")
        return []

#@time_block("file_path_to_url")
def file_path_to_url(file_path):
    """
    Convert a file path to a URL.
    """
    relative_path = os.path.relpath(file_path, start='textbook/_build/html')
    url_path = relative_path.replace(os.sep, '/').replace('.html', '')
    return BASE_URL + url_path

def save_to_file(data, file_name):
    """
    Save data to a file.
    """
    try:
        with open(file_name, 'wb') as f:
            pickle.dump(data, f)
        logging.info(f"Data saved to {file_name}.")
    except Exception as e:
        logging.error(f"Error saving data to {file_name}: {e}")

def main():
    # Get list of HTML files
    file_paths = get_html_files(HTML_DIRECTORY, BASE_DIRECTORY)
    all_text_data = []
    embedding_to_location = {}
    current_index = 0

    for file_path in file_paths:
        text_data = read_html_file(file_path)
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

    # Ensure the output directory exists
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Save embeddings, FAISS index, and mapping to the output directory
    with open(os.path.join(OUTPUT_DIR, 'embeddings_p&l_chapter4.npy'), 'wb') as f:
        np.save(f, embeddings_np)

    with open(os.path.join(OUTPUT_DIR, 'embedding_to_location_p&l_chapter4.pkl'), 'wb') as f:
        pickle.dump(embedding_to_location, f)

    with open(os.path.join(OUTPUT_DIR, 'all_text_data_p&l_chapter4.pkl'), 'wb') as f:
        pickle.dump(all_text_data, f)

    faiss.write_index(index, os.path.join(OUTPUT_DIR, 'faiss_index_p&l_chapter4.bin'))


if __name__ == "__main__":
    main()
