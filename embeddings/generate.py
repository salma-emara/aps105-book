import sys
import os
import re
from sentence_transformers import SentenceTransformer
import numpy as np
# import faiss
# import pickle
import logging
from bs4 import BeautifulSoup
import json

from func_time import time_block

# Configuration
BASE_DIRECTORY = ''
HTML_DIRECTORY = 'textbook/_build/html/chapters'
BASE_URL = "https://learningc.org/"
OUTPUT_DIR = './embeddings/outputs'

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

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
    Read an HTML file and extract content from headers, paragraphs, list items, and tables, associating with anchors and sections' info.
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
            current_section_number = ""
            current_section_name = "" # a section is from one 'h2' to the next 'h2' in this jupyter book
            current_page_title = "" # a page title include section-number and page title, this usually is a h1
            previous_sentence = None

            def handle_table(table):
                rows = table.find_all('tr')
                table_sentences = []
                for row in rows:
                    columns = row.find_all(['th', 'td'])
                    row_text = " ".join([col.get_text(separator=" ").strip() for col in columns])
                    table_sentences.append(row_text)
                return table_sentences
            # Find headers and update current_anchor based on header links
            for element in main_content.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'table']): # no 'li' because in jupyter book it duplicates with 'p'
                if element.name == 'h1':
                    anchor_tag = element.find('a', class_='headerlink')
                    current_anchor = anchor_tag.get('href').lstrip('#') if anchor_tag else ""
                    title_text = element.get_text(separator=" ").strip()
                    # Remove the trailing '#' from the title text if it exists
                    current_page_title = title_text[:-1].strip() if title_text.endswith('#') else title_text
                    current_section_number = ""
                    current_section_name = ""
                    # elements.append((current_page_title, current_anchor, current_section_number, current_section_name, current_page_title))
                elif element.name == 'h2': # updates anchor, current_section_number, and current_section_name
                    anchor_tag = element.find('a', class_='headerlink')
                    current_anchor = anchor_tag.get('href').lstrip('#') if anchor_tag else current_anchor

                    # Extract the section number
                    section_number = element.find('span', class_='section-number')
                    current_section_number = section_number.get_text(strip=True) if section_number else ""
                    
                    section_text = element.get_text(' ', strip=True)
                    if section_number:
                        section_text = section_text.replace(current_section_number, '', 1).strip()
                    # Remove the trailing '#' from the title text if it exists
                    if section_text.endswith('#'):
                        section_text = section_text[:-1].strip()
                    current_section_name = section_text if section_text else current_section_name    
                elif element.name in ['h3', 'h4', 'h5', 'h6']: # updates anchor, and include text in semantic search
                    anchor_tag = element.find('a', class_='headerlink')
                    current_anchor = anchor_tag.get('href').lstrip('#') if anchor_tag else current_anchor
                    text = element.get_text(separator=" ").strip()
                    elements.append((text, current_anchor, current_section_number, current_section_name, current_page_title))
                elif element.name == 'table':
                    rows = handle_table(element)
                    for row in rows:
                        elements.append((row, current_anchor, current_section_number, current_section_name, current_page_title))
                else:
                    if element.find_parent('table'):
                        continue  # Skip <p> and <li> elements inside a table
                    if element.find('span', class_='caption-number') or element.find('span', class_='caption-text'):
                        text = element.get_text(separator=" ").strip()
                        elements.append((text, current_anchor, current_section_number, current_section_name, current_page_title))
                    else:
                        text = element.get_text(separator="\n").strip()
                        text = re.sub(r'\s+', ' ', text)  # Normalize whitespace
                        text = re.sub(r'\s+([.?!,:;])', r'\1', text) # remove white space before punctuation
                        sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<!Fig\.)(?<!vs\.)(?<=\.|\?)\s', text)
                        for sentence in sentences:
                            sentence = sentence.strip()
                            if len(sentence.split()) > 1 and sentence != previous_sentence:
                                elements.append((sentence, current_anchor, current_section_number, current_section_name, current_page_title))
                                previous_sentence = sentence
            
            return elements
                
    except Exception as e:       
        logging.error(f"Error reading file {file_path}: {e}")
        return []

def file_path_to_url(file_path, anchor=""):
    """
    Convert a file path to a URL relative to web root with an optional anchor.
    """
    relative_path = os.path.relpath(file_path, start='textbook/_build/html')
    relative_url_path = relative_path.replace(os.sep, '/').replace('.html', '')
    if anchor:
        return relative_url_path + ".html" + "#" + anchor
    return relative_url_path + ".html"

# def save_to_file(data, file_name):
#     """
#     Save data to a file.
#     Used for FAISS version (Terminal Version and App version (a second server)) before Semantic-Finder
#     """
#     try:
#         with open(file_name, 'wb') as f:
#             pickle.dump(data, f)
#         logging.info(f"Data saved to {file_name}.")
#     except Exception as e:
#         logging.error(f"Error saving data to {file_name}: {e}")

def save_to_json(data, file_name):
    """
    Save data to a JSON file.
    """
    try:
        with open(file_name, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
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
    clear_output_directory(OUTPUT_DIR)
    file_paths = get_html_files(HTML_DIRECTORY, BASE_DIRECTORY)
    all_text_data = []
    embedding_to_location = {}
    current_index = 0
    prev_anchor = ''

    for file_path in file_paths:
        text_data = read_html_file(file_path)  # text_data now includes tuples (sentence, anchor, ...)
        position = 0
        for sentence, anchor, section_number, section_name, page_title in text_data:
            if anchor != prev_anchor:
                position = 1
                prev_anchor = anchor
            else:
                position += 1
            all_text_data.append(sentence)  # Collecting all sentences for embedding
            # Forming the URL including the anchor for precise navigation
            relative_url = file_path_to_url(file_path)
            embedding_to_location[current_index] = {
                "url": relative_url,
                "position": f"sentence {position}",
                "anchor": anchor,
                "section_number": section_number,
                "section_name" : section_name,
                "page_title": page_title
            }
            current_index += 1

    # Initialize Sentence-Transformer model
    model = SentenceTransformer('all-MiniLM-L6-v2')

    # Generate embeddings
    embeddings = model.encode(all_text_data)

    # Convert embeddings to a numpy array
    embeddings_np = np.array(embeddings, dtype='float32')
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    embeddings_np.tofile(os.path.join(OUTPUT_DIR, 'embeddings.bin')) # tofile() wrties the array data to a binary file in raw format
    print("Binary Data saved to " + OUTPUT_DIR + "embeddings.bin")
    save_to_json(embedding_to_location, os.path.join(OUTPUT_DIR, 'embedding_to_location.json'))
    save_to_json(all_text_data, os.path.join(OUTPUT_DIR, 'all_text_data.json'))

if __name__ == "__main__":
    main()
