# aps105-book

This is a repository for developing the first online textbook of its kind for APS105. The Book's name is Snefru: Learning Programming with C. It is developed using [Jupyter Book](https://jupyterbook.org/en/stable/intro.html). 

**In progress.** You will find the book at [learningc.org](learningc.org), or [learningc.netlify.app](https://learningc.netlify.app/)

## Getting Started

If you are trying to build the book locally, you can follow the instructions below.

Steps 2 -- 4 are optional!

1- Clone this GitHub repo. In your terminal, type the following command:

```
git clone https://github.com/salmashukry/aps105-book/
cd aps105-book
```

2 (optional)- Need to install [Miniconda3](https://docs.conda.io/en/latest/miniconda.html) for Python3.9

3 (optional)- Once Miniconda is installed or if you already have it, you can update conda, create a virtual env, and install dependencies by running the following commands:

```
conda update conda
conda create -n aps105-book python=3.9
conda activate aps105-book
cd aps105-book
pip install -r requirements.txt --upgrade
pip install jupyter 
```

4 (optional)- Installing jupyter-c-kernel is critical to be able to execute C code throughout the book. Currently, there is no C code to execute, so this process is unnecessary. You can install jupyter-c-kernel by running the following commands if you want:

```
git clone https://github.com/XaverKlemenschits/jupyter-c-kernel.git
cd jupyter-c-kernel
pip install -e .  # for system install: sudo install .
cd jupyter_c_kernel 
sudo install_c_kernel --user # this will ask you for a password
# To check if you installed correctly, start the notebook and check if a window opens in your browser
jupyter notebook
```

4- To build the book locally, run the following command:

```
# To build everything
jupyter-book build --all textbook 
# To build after updating an md file
jupyter-book build textbook
```

5- To view the book, you can run:

```open textbook/_build/html/index.html```

6 (optional)- If you are using VS Code, install MyST-Markdown extension to allow syntax highlighting for .md files.

## Contributing

Most contirbutions require knowledge of Markdown. I ask you to be consistent with the rest of the book if you will make substainial changes. If you want to add advanced features, you may seek help from [Jupyter Book](https://jupyterbook.org/en/stable/intro.html) website. 

When you add a new .md file, remember to include it in `textbook/_toc.yml`.

## Correcting mistakes 

Since this book is still under development, it will have mistakes. If you found a typographical, grammatical or any mistake, I would highly appreciate if you open an issue pointing out the mistake is in which file. You may also correct it and create a pull request! Thank you in advance.

