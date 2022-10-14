# aps105-book
This is where I start writing a book for APS105.

Getting Started:

1. `source aps105/bin/activate` or `conda activate aps105-conda` and `conda install pip`
2. `pip install rst-to-myst[sphinx]`
3. `rst2myst convert docs/**/*.rst`
4. `pip install sphinx-autobuild`
5. `pip install jupyter_sphinx`
6. `pip install sphinx_thebe`
7. `pip install nbsphinx`
8. `pip install myst-nb`
9. `pip3 install myst_parser`
10. `pip install sphinx_book_theme`
11. `pip3 install pydevd`
12. `sphinx-autobuild docs/source docs/build/html/`

When you add a new .md file, remember to include it in the toctree in index.md