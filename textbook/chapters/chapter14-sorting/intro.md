---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---
# Sorting

Sorting puts elements of an array or linked list in order.  The order can be ascending or descending. We can sort numbers in ascending or descending order, or characters or strings in lexicographical order. This helps in producing a list of items that we can easily search through, analyze, visualize and understand. Sorting is used in many applications, including database systems, word processors, and web browsers.

```{code-cell}
from ipywidgets import widgets
from IPython.display import display, Markdown

question = widgets.HTML(
   value="<b>What is the first alphabet?</b>"
)

option_a = "A"
option_b = "B"
option_c = "C"

options = [option_a, option_b, option_c]

option_buttons = widgets.RadioButtons(
   options=options,
   description="Options:",
   value=None
)

submit_button = widgets.Button(description="Submit")

display(question, option_buttons, submit_button)

def check_answer(button):
    if option_buttons.value == "A":
        display(Markdown("✅ Correct!"))
    else:
        display(Markdown("❌ Incorrect."))

submit_button.on_click(check_answer)
```


There are several sorting algorithms, but will only focus on:

1. Insertion Sort
2. Selection Sort
3. Bubble Sort
4. Quicksort

**Disclaimer:** We discuss these sorting algorithms to sort integers in an array in ascending order. The same algorithms can be used to sort integers in descending order or to sort characters or strings in lexicographical order or to sort nodes in a linked list. However, we will not discuss these variations in this chapter.