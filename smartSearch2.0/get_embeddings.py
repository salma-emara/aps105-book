import sys # Access to functions and variables that interact with the Python runtime environment.
import os  # Provides functions to interact with the operating system, including file and directory operations.
import re  # Enables regular expression operations for complex string processing and manipulation.
from sentence_transformers import SentenceTransformer  # Provides pre-trained models to generate embeddings for sentences and paragraphs.
import numpy as np  # A powerful library for numerical computing, especially with arrays and matrices.
import faiss  # A library for efficient similarity search and clustering of dense vectors.
import pickle  # Allows for serializing and deserializing Python object structures, useful for saving and loading data.
import sys  # Provides access to some variables used or maintained by the interpreter and to functions that interact strongly with the interpreter.
import logging  # Provides a way to configure logging and log messages from the script.
from bs4 import BeautifulSoup  # Library for parsing HTML and XML documents.


# Add the parent directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'smartSearch')))

from func_time import time_block
from md_finder import get_md_files

# Configuration
BASE_DIRECTORY = ''
HTML_DIRECTORY = 'textbook/_build/html/chapters'
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

@time_block("read_html_file")
def read_html_file(file_path):
    """
    Read an HTML file and extract content from paragraphs, list items, and tables, associating with anchors.
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
            current_anchor = ""
            previous_sentence = None

            def handle_table(table):
                rows = table.find_all('tr')
                table_text = []
                for row in rows:
                    columns = row.find_all(['th', 'td'])
                    row_text = [col.get_text(separator=" ").strip() for col in columns]
                    table_text.append(" | ".join(row_text))
                return "\n".join(table_text)

            # Find headers and update current_anchor based on header links
            for element in main_content.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'table']):
                if element.name in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
                    anchor_tag = element.find('a', class_='headerlink')
                    current_anchor = anchor_tag.get('href').lstrip('#') if anchor_tag else current_anchor
                elif element.name == 'table':
                    text = handle_table(element)
                    elements.append((text, current_anchor))
                else:
                    # Check if the element is inside a table
                    if element.find_parent('table'):
                        continue  # Skip <p> and <li> elements inside a table
                    if element.find('span', class_='caption-number') or element.find('span', class_='caption-text'):
                        # This is for Fig. and 4.5 case
                        text = element.get_text(separator=" ").strip()
                        elements.append((text, current_anchor))
                    else:
                        text = element.get_text(separator="\n").strip()
                        text = re.sub(r'\s+', ' ', text)  # Normalize whitespace
                        # Split text into sentences based on punctuation
                        sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', text)
                        for sentence in sentences:
                            sentence = sentence.strip()
                            # handle one-word sentence and split-caused duplicates
                            if len(sentence.split()) > 1 and sentence != previous_sentence:
                                elements.append((sentence, current_anchor))
                                previous_sentence = sentence
            
            return elements
                
    except Exception as e:
        logging.error(f"Error reading file {file_path}: {e}")
        return []

def file_path_to_url(file_path, anchor=""):
    """
    Convert a file path to a URL with an optional anchor.
    """
    relative_path = os.path.relpath(file_path, start='textbook/_build/html')
    url_path = relative_path.replace(os.sep, '/').replace('.html', '')
    if anchor:
        return BASE_URL + url_path + "#" + anchor
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

def clear_output_directory(directory):
    """
    Clear the output directory.
    """
    try:
        for filename in os.listdir(directory):
            file_path = os.path.join(directory, filename)
            if os.path.isfile(file_path):
                os.unlink(file_path)
        logging.info(f"Cleared output directory: {directory}")
    except Exception as e:
        logging.error(f"Failed to clear output directory: {e}")

def main():
    # Clear the output directory before saving new files
    clear_output_directory(OUTPUT_DIR)
    
    # Get list of HTML files
    file_paths = get_html_files(HTML_DIRECTORY, BASE_DIRECTORY)
    all_text_data = []
    embedding_to_location = {}
    current_index = 0
    prev_anchor = ''

    for file_path in file_paths:
        text_data = read_html_file(file_path)  # text_data now includes tuples (sentence, anchor)
        position = 0
        for sentence, anchor in text_data:
            if anchor != prev_anchor:
                position = 1
                prev_anchor = anchor
            else:
                position += 1
            all_text_data.append(sentence)  # Collecting all sentences for embedding
            # Forming the URL including the anchor for precise navigation
            url = file_path_to_url(file_path, anchor)
            embedding_to_location[current_index] = {
                "url": url,
                "position": f"sentence {position}"
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
    with open(os.path.join(OUTPUT_DIR, 'embeddings.npy'), 'wb') as f:
        np.save(f, embeddings_np)

    with open(os.path.join(OUTPUT_DIR, 'embedding_to_location.pkl'), 'wb') as f:
        pickle.dump(embedding_to_location, f)

    with open(os.path.join(OUTPUT_DIR, 'all_text_data.pkl'), 'wb') as f:
        pickle.dump(all_text_data, f)

    faiss.write_index(index, os.path.join(OUTPUT_DIR, 'faiss_index.bin'))

if __name__ == "__main__":
    main()
