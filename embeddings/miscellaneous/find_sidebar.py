# This script was used trying to find path to files 
# that determine left side bar in the 
# jupyter-book/sphinx package in order to modify/overide

import sphinx_book_theme
import os

theme_path = os.path.dirname(sphinx_book_theme.__file__)
sidebar_path = os.path.join(theme_path, 'layouts', 'sidebar.html')

print(sidebar_path)
