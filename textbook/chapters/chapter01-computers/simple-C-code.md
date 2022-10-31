---
jupytext:
  cell_metadata_filter: -all
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.11.5
kernelspec:
  display_name: C
  language: c
  name: c
---

# Write simple C programs

## Hello, world!

In this section, we will write our first C program. We will write a program that prints the message "Hello World!" on the screen. This is a tradition in programming. The program is very simple, but it will give you a taste of what programming is like.

```{code-cell} c
#include <stdio.h>

int main(void){
    printf("Hello World!\n");
    return 0;
}
```

Let's examine each line:

`#include <stdio.h>` gives access to functions that interface with input (like keyboard) and output (like monitor) devices. These functions include `printf` and `scanf`.

`main` is the entry point of the C program. All C programs require a main function. `main` is called when the program is executed. It returns an integer value. The value `0` indicates that the program executed successfully. Any other value indicates that the program failed.

`printf` is a function that prints a string to the screen. The string is enclosed in double quotes. The `\n` is a special character that indicates a new line. The `\` is called an escape character. It is used to indicate special characters. The `printf` function is defined in the `stdio.h` header file.


`return 0` if the main function is executed, and it reached the end, this means all previous statements were executed successfully. `return 0` makes the main function report that it returned a zero and hence won't show error messages related to issues with previous statements.

`;` every statement in C ends with a semicolon. 

## Prompt user for input 

Write a C code that prompts the user to enter the number of pizzas they have, and outputs how many slices they have. Assume each pizza has 8 slices.

```
#include <stdio.h>

int main(void){
    int num_pizzas;
    printf("How many pizzas do you have?\n");
    scanf("%d", &num_pizzas);
    printf("You have %d slices of pizza.\n", num_pizzas * 8);
    return 0;
}

```