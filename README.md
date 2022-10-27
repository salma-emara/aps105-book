# aps105-book
This is where I start writing a book for APS105.

When you add a new .md file, remember to include it in `textbook/_toc.yml`.

## Getting Started

If you are trying to build the book locally, you can follow the instructions below.

1- Need to install [Miniconda3](https://docs.conda.io/en/latest/miniconda.html) for Python3.9

2- Once Miniconda is installed or if you already have it, you can update conda, create a virtual env, and install dependencies by running the following commands:

```
conda update conda
conda create -n aps105-book python=3.9
conda activate aps105-book
pip install -r requirements.txt --upgrade
pip install jupyter 
```

3- Install jupyter-c-kernel is critical to be able to execute C code throughout the book. You can install it by running the following commands:

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
# To build only updated md
jupyter-book build textbook
```

5- To view the book, you can run:

```open textbook/_build/html/index.html```





