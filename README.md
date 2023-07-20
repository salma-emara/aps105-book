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
# To build everything
jupyter-book build --all textbook 
# To build after updating an md file
jupyter-book build textbook
```

4- To view the book, you can run:

```open textbook/_build/html/index.html```

## Contributing

Most contributions require knowledge of Markdown. I ask you to be consistent with the rest of the book if you will make substantial changes. If you want to add advanced features, you may seek help from [Jupyter Book](https://jupyterbook.org/en/stable/intro.html) website. 

If you are using VS Code, install MyST-Markdown extension to allow syntax highlighting for .md files.

When you add a new .md file, remember to include it in `textbook/_toc.yml`.

## Correcting mistakes 

Since this book is still under development, it will have mistakes. If you find a typographical, grammatical or any other mistake, I would highly appreciate if you open an issue pointing out the mistake is in which file. You may also correct it and create a pull request! 

If you do not have a GitHub account, you may send the primary author an email at `salma@ece.utoronto.ca`.

Thank you in advance!

## Automatic Deployment

For anyone with a write request to main branch, with every push Netlify will automatically deploy it to [learningc.org](learningc.org). This is done folowing instructions on [Netlify for Jupyter-Book](https://jupyterbook.org/en/stable/publish/netlify.html).

## Quizzes: Add or Edit

The quizzes for the book are created in TOML files, which are then converted into JavaScript files to be read by the code to build the book.

To convert .toml files to .js files:

1- Ensure you have Node.js installed on your system. You can download it from their official website (https://nodejs.org).

2- Download the required package by executing the following command:

```
npm install @iarna/toml
```

To add a new quiz:

1- Create a new .toml file containing the quiz in tetbook/quizzes in the chapter folder of your choice.

2- In your terminal, execute the following command.

```
node toml_to_js_convertor.js
```
A .js file will be created in the same folder for the .toml file.

3- Open the .md file where you want the quiz to be and add the following line. Replace `file-name` with the name of your quiz file (without .js extension). 

```
{{quiz_embed | replace("%%FILENAME%%", "file-name") }}
```

To edit an existing quiz:

1- Open the .toml file of the quiz you want to edit and make the desired changes.

2- In your terminal, execute the following command.

```
node toml_to_js_convertor.js
```


Build the book locally and ensure the quiz is behaving as expected.
