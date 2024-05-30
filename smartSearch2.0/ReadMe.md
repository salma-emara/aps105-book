
# SmartSearch Semantic Search Tool

## Overview
SmartSearch is designed to enhance the ability to search through structured documents like textbooks by leveraging semantic search techniques. The project includes scripts to preprocess documents and perform efficient semantic searches using advanced machine learning models and indexing technologies.

## Prerequisites
- **Anaconda** or **Miniconda** (Conda environment manager)

## Environment Setup
Clone the repository to your local machine and navigate to the project directory. Then, set up the required environment using the `environment.yml` file provided:

```bash
conda env create -f environment.yml
```
## Activate Environment
Before running the scripts, activate the Conda environment: 

```bash
conda activate smartSearch
```

## Usage

### Preparing Your Environment
Ensure your terminal is opened in the `aps105-book` directory. This is necessary as the scripts rely on specific relative paths from this directory.

 Make sure that your terminal prompt resembles `(smartSearch) jiahanwen@Jiahans-MacBook-Pro aps105-book %` indicating that you are in the correct virtual environment and directory:


### Generating Embeddings
First, generate the embeddings from your HTML files. Ensure that the get_embeddings.py script points to the correct directory where your HTML files are stored:

```bash
python ./smartSearch2.0/get_embeddings.py
```

### Performing Semantic Searches
To perform semantic searches, run the query.py script. It provides an interactive prompt for entering search queries:

```bash
python ./smartSearch2.0/query.py
```

Follow the on-screen prompts to enter your search queries. Type 'quit' to exit the interactive search interface.

## Files Description
- get_embeddings.py: Script for processing HTML files and generating embeddings.
- query.py: Script for performing semantic searches with user input.
- environment.yml: Conda environment file specifying all dependencies.

## Contributing

## License


