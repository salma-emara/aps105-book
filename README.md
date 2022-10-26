# aps105-book
This is where I start writing a book for APS105.

When you add a new .md file, remember to include it in the toctree in index.md

## Compiling Documentation

You need to install jupyter-c-kernel: https://github.com/XaverKlemenschits/jupyter-c-kernel
```
git clone https://github.com/XaverKlemenschits/jupyter-c-kernel.git
cd jupyter-c-kernel
pip install -e .  # for system install: sudo install .
pip install jupyter
cd jupyter_c_kernel && install_c_kernel --user # for sys install: sudo install_c_kernel
# now you can start the notebook
jupyter notebook
```

Then, you can compile the book with:

```
pip install -r requirements.txt --upgrade
sphinx-build docs/source docs/build/html/
open docs/build/html/index.html
```

## For live development

```
sphinx-autobuild docs/source docs/build/html/
```
