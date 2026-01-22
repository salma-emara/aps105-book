# Snefru: Learning Programming with C

This is a repository for developing the first online textbook of its kind for APS105. The book's name is Snefru: Learning Programming with C. It is developed using [Jupyter Book](https://jupyterbook.org/en/stable/intro.html). 

You will find the book at [learningc.org](https://learningc.org), or [learningc.netlify.app](https://learningc.netlify.app/)

## Getting Started

If you are trying to build the book locally, you can follow the instructions below.

1- Clone this GitHub repo. In your terminal, type the following command:

```
git clone https://github.com/salma-emara/aps105-book/
cd aps105-book
```

2- Install jupyter-book by running the following command in the terminal

```
pip install -r requirements.txt
```

3- To build the book locally, run the following command:

```
# To build everything for the first time 
node ./textbook/_static/toml_to_js_convertor.js
jupyter-book build --all textbook
cp -r textbook/quizzes/ textbook/_build/html/quizzes
cp -r textbook/exercises/ textbook/_build/html/exercises
cp -r embeddings/outputs textbook/_build/html

# To build everything
jupyter-book build --all textbook 

# To build after updating a markdown file
jupyter-book build textbook

# To build after updating quizzes
node ./textbook/_static/toml_to_js_convertor.js
jupyter-book build --all textbook
cp -r textbook/quizzes/ textbook/_build/html/quizzes

# To build after updating exercises
node ./textbook/_static/toml_to_js_convertor.js
jupyter-book build --all textbook
cp -r textbook/exercises/ textbook/_build/html/exercises
```


4- To view the book, you have two options:

1. **Open directly**:
   ```bash
   open textbook/_build/html/index.html
   ```
   **Note**: Opening the book this way uses the `file:///` protocol, which may cause issues with functionalities like search or semantic search due to CORS policies.

2. **Run a local server** (recommended for full functionality):
   ```bash
   cd textbook/_build/html
   python -m http.server 8000
   open http://localhost:8000
   ```
   This method ensures all functionalities, including search and semantic search, work correctly.

5- To update text embeddings for Semantic Search after a change, follow these steps:

1. Ensure you have installed the necessary packages as described in the `embeddings/README.md` file. Or run the following command 
   ```bash
   pip install sentence-transformers beautifulsoup4 numpy
   ```
2. Run the following commands:
   ```bash
   python embeddings/generate.py
   cp -r embeddings/outputs textbook/_build/html
   ```

### Extra: to solve no title issue for semantic-search page
1. Run the following command when deploying on Netlify:
   ```bash
   cp -r textbook/semantic-search.html textbook/_build/html
   ```
2. Whenever a change that could affect table of content or semantic-search page
   1. Run the following command after jupyter-book build to update locally stored semantic-search.html
      ```bash
      cp -r textbook/_build/html/semantic-search.html textbook
      ```
   2. Run the following command or open directly the local semantic-search.html in VSCode edit mode
      ```bash
      code textbook/semantic-search.html
      ```
   3. Make changes in the local semantic-search.html
      1. Use ctrl + F or cmd + F and search for title
      2. change  
         ```<title>&lt;no title&gt; &#8212; Snefru: Learning Programming with C</title>```  
         to below:  
         ```<title>Semantic Search &#8212; Snefru: Learning Programming with C</title>```
   4. Run the following command again to update the changes in _build when deploying on Netlify
      ```bash
      cp -r textbook/semantic-search.html textbook/_build/html
      ```
### Check spelling mistakes

To check spelling mistakes, you need to install `pyspelling` using the following command:

```
pip install pyspelling
```

Then run the following command:

```
cd spell-check/
pyspelling -c spell-check.yml
```

## Contributing

Most contributions require knowledge of Markdown. I ask you to be consistent with the rest of the book if you will make substantial changes. If you want to add advanced features, you may seek help from [Jupyter Book](https://jupyterbook.org/en/stable/intro.html) website. 

If you are using VS Code, install MyST-Markdown extension to allow syntax highlighting for `.md` files.

When you add a new `.md` file, remember to include it in `textbook/_toc.yml`.

## Correcting mistakes 

Since this book is still under development, it will have mistakes. If you find a typographical, grammatical or any other mistake, I would highly appreciate if you open an issue pointing out the mistake is in which file. You may also correct it and create a pull request! 

If you do not have a GitHub account, you may send the primary author an email at `salma@ece.utoronto.ca`.

Thank you in advance!

## Automatic Deployment

For anyone with a write request to main branch, with every push Netlify will automatically deploy it to [learningc.org](learningc.org). This is done following instructions on [Netlify for Jupyter-Book](https://jupyterbook.org/en/stable/publish/netlify.html).

## Quizzes: Add or Edit

The quizzes for the book are created in TOML files, which are then converted into JavaScript files to be read by the code to build the book.

To convert .toml files to .js files:

1- Ensure you have Node.js installed on your system. You can download it from their official website (https://nodejs.org).

2- Download the required package by executing the following command:

```
npm install @iarna/toml
```

To add a new quiz:

1- Create a new .toml file containing the quiz in textbook/quizzes in the chapter folder of your choice.

2- In your terminal, execute the following command in `aps105-book` directory.

```
node ./textbook/_static/toml_to_js_convertor.js
```
A .js file will be created in the corresponding folders for all the .toml files present in the textbook/quizzes directory.

3- Open the .md file where you want the quiz to be and add the following line. Replace `file-name` with the name of your quiz file (without .js extension). 

```
{{quiz_embed | replace("%%FILENAME%%", "file-name") }}
```

To edit an existing quiz:

1- Open the .toml file of the quiz you want to edit and make the desired changes.

2- In your terminal, go to `aps105-book` directory and execute the following command.

```
node ./textbook/_static/toml_to_js_convertor.js
```

Build the book locally and ensure the quiz is behaving as expected.


## Exercises: Add or Edit

The exercises for the book are created in TOML files, which are then converted into JavaScript files to be read by the code to build the book.

To convert .toml files to .js files:

1- Ensure you have Node.js installed on your system. You can download it from their official website (https://nodejs.org).

2- Download the required package by executing the following command:

```
npm install @iarna/toml
```

To add a new exercise page:

1- Create a new .toml file containing the exericses in textbook/exercises in the chapter folder of your choice.

2- In your terminal, execute the following command in `aps105-book` directory.

```
node ./textbook/_static/toml_to_js_convertor.js
```
A .js file will be created in the corresponding folders for all the .toml files present in the textbook/exercises directory.

3- Open the .md file where you want the exercises to be and add the following line. Replace `file-name` with the name of your exercise file (without .js extension). 

```
{{exercise_embed | replace("%%FILENAME%%", "file-name") }}
```

To edit an existing exercise page:

1- Open the .toml file of the exercise you want to edit and make the desired changes.

2- Run the question ID patcher to ensure all exercises have unique IDs:

``` 
node ./textbook/_static/add_question_ids.js
```

3- In your terminal, go to `aps105-book` directory and execute the following command.

```
node ./textbook/_static/toml_to_js_convertor.js
```

To validate all exercise files

1- In your terminal, go to `aps105-book` directory and execute the following command.

```
node textbook/exercises/toml-parser.js
```

2- If any file contains errors, only the first error in that file will be reported. Rerun the following command to catch the next one
```
node textbook/exercises/toml-parser.js
```
3- If no errors occur, an "All done." message will be shown in the terminal.

Build the book locally and ensure the quiz is behaving as expected.

### License

This project is licensed under the GPL-3.0 license. However, it includes components licensed under the Apache License 2.0, specifically the `all-MiniLM-L6-v2` model from Hugging Face.

- The GPL-3.0 license applies to the project as a whole.
- The `all-MiniLM-L6-v2` model is licensed under the Apache License 2.0, which is compatible with GPL-3.0 and is included here accordingly.

By using this project, you agree to the terms of the GPL-3.0 license for the overall project and the terms of the Apache License 2.0 for the `all-MiniLM-L6-v2` component.

Note: The `all-MiniLM-L6-v2` model is provided "as-is" without any warranties, as per the terms of the Apache License 2.0.

The model was obtained from [Hugging Face: sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2/tree/main), with the JavaScript version available [Xenova/all-MiniLM-L6-v2](https://huggingface.co/Xenova/all-MiniLM-L6-v2).

For more information, see the full texts of the [GPL-3.0 License](LICENSE) and [Apache License 2.0](LICENSE.Apache-2.0) included in this repository.