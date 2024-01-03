# More Extensions in VS Code
In the **Extensions** on the left side of the VS Code window, you may find these extensions interesting. You can install them if you want to.

## Better Comments

You can install [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) to help you write consistent comments for functions. Before a function, you need to type `\**` and press **tab**, it will fill in a template for you to fill in. The template requires description of the function and input and return parameters. You can also use it at the beginning of your file to describe the contents of the file.

For example, an example of a function description is as follows:

```{code-block} c
/**
 * @brief Multiply a number by two.
 * @details This function multiplies a number by two.
 * @param var The number to multiply.
 * @param flag A flag to determine if the number should be multiplied by two.
 * @return The product of the multiplication.
 */
double multiplyTwo(int var, bool flag) {
  double product = 0;
  if (flag) {
    product = 2.0 * var;
  } else {
    product = var;
  }
  return product;
}
```

## Error Gutters

Installing [Error Gutters](https://marketplace.visualstudio.com/items?itemName=IgorSbitnev.error-gutters) helps in bringing your attention to errors/warnings in your code. It will show a red cross on the left side of the lines where the error is and a yellow caution symbol next to lines that cause a warning.

```{figure} ./images/error-gutters.png
:alt: Error Gutters
:width: 600px
:align: center

Error Gutters in action
```

## Error Lens

[Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) is another extension that helps you identify errors in your code. It will show a red dot on the left side of the line where the error is. You can hover over the red dot to see the error message.

