---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.14.5
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# sample

```{code-cell} ipython3
:tags: ["remove-input"]
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
