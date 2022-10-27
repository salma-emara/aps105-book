# aps105-book
This is where I start writing a book for APS105.

When you add a new .md file, remember to include it in `textbook/_toc.yml`.

## Building Documentation

You need to install jupyter-c-kernel: https://github.com/XaverKlemenschits/jupyter-c-kernel
```
git clone https://github.com/XaverKlemenschits/jupyter-c-kernel.git
cd jupyter-c-kernel
pip install -e .  # for system install: sudo install .
pip install jupyter
cd jupyter_c_kernel && install_c_kernel --user # for sys install: 
# To check if you installed correctly, start the notebook
jupyter notebook
```

```
conda update conda
conda create -n aps105-book python=3.9
conda activate aps105-book
pip install -U jupyter-book
jupyter-book create textbook
pip install jupyter
jupyter-book build textbook
pip install jupyter-sphinx
Install jupyter-c-kernel: is important
```

Then, you can compile the book with:

```
pip install -r requirements.txt --upgrade
# To build everything
jupyter-book build --all textbook 
# To build only updated md
jupyter-book build textbook
```




