# Generate.py

This script processes HTML files from a specified directory, extracts meaningful content, generates embeddings using a sentence transformer model, and saves the results in JSON format.

## Features

1. **HTML File Processing**: Recursively scans a directory for HTML files and extracts content from headers, paragraphs, list items, and tables.
2. **Sentence Extraction**: Breaks down paragraphs into individual sentences for detailed embedding.
3. **Embeddings Generation**: Uses the `SentenceTransformer` model to generate embeddings for the extracted sentences.
4. **Data Persistence**: Saves embeddings and associated metadata in JSON format for easy retrieval and usage.

## Prerequisites

- Python 3.7+
- `sentence-transformers`
- `beautifulsoup4`
- `numpy`
- `logging`

Optional:
- `faiss` (commented out in the script)
- `pickle` (commented out in the script)

## Directory Structure

- `textbook/_build/html/chapters`: Directory containing the HTML files to be processed.
- `./embeddings/outputs`: Output directory where the embeddings and metadata will be saved.

## Installation

1. Clone the repository.
2. Install the required Python packages:
    ```bash
    pip install sentence-transformers beautifulsoup4 numpy
    ```

Optional (if using FAISS):
    ```bash
    pip install faiss-cpu
    ```

## Usage

1. Ensure your HTML files are placed in the `textbook/_build/html/chapters` directory.
2. Run the script:
    ```bash
    python generate.py
    ```

## Configuration

The script includes a few configurable parameters at the beginning:

- `BASE_DIRECTORY`: Base directory for relative paths.
- `HTML_DIRECTORY`: Directory where the HTML files are located.
- `BASE_URL`: Base URL for constructing full URLs.
- `OUTPUT_DIR`: Directory where the output files will be saved.

## Functions

### get_html_files(directory, base_directory)
Scans the specified directory for HTML files and returns a list of their paths.

### read_html_file(file_path)
Reads an HTML file, extracts content from headers, paragraphs, list items, and tables, and associates content with HTML anchors.

### file_path_to_url(file_path, anchor="")
Converts a file path to a URL relative to the web root with an optional anchor.

### save_to_json(data, file_name)
Saves the provided data to a JSON file.

### clear_output_directory(directory)
Clears the specified output directory.

## Logging

Logging is set up to provide information on the script's progress and any potential issues. Logs are outputted to the console with timestamps.

## Example Output

The script generates several output files in the `./embeddings/outputs` directory:

- `embeddings.json`: Contains the sentence embeddings.
- `embedding_to_location.json`: Maps each embedding to its corresponding URL and position in the text.
- `all_text_data.json`: Contains all extracted sentences.

## Notes

- The FAISS-related code is currently commented out but can be enabled if FAISS is installed and required.
- The script assumes that the HTML files contain a `<main>` tag, and content is extracted from within this tag.

## License

This project is licensed under the MIT License.
