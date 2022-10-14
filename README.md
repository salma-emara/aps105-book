# aps105-book
This is where I start writing a book for APS105.

Getting Started:

# TODO add these to requirement.txt
1. `pip install rst-to-myst[sphinx]`
2. `rst2myst convert docs/**/*.rst`
3. `pip install sphinx-autobuild`
4. `pip install jupyter_sphinx`
5. `pip install sphinx_thebe`
6. `pip install nbsphinx`
7. `pip install myst-nb`
8. `pip3 install myst_parser`
9.  `pip install sphinx_book_theme`
10. `pip3 install pydevd`
11. `sphinx-autobuild docs/source docs/build/html/`

When you add a new .md file, remember to include it in the toctree in index.md

## Compiling Documentation

```
pip install -r requirements.txt --upgrade
sphinx-build docs/source docs/build/html/
open docs/build/html/index.html
```
