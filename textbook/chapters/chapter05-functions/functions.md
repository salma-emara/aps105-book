# Functions

Functions are called subroutines, modules or procedures in other programming languages. They are a sequence of instructions that can be called by name in a code -- we will see how shortly. Functions are useful for decomposing a problem into smaller sub-problems. This is referred to as **modular programming**. The modularity concept is the extent to which a program can be divided into smaller pieces.

## Why functions?

Decomposing a solution into functions is helpful because:

1. **Improve collaboration.** We can divide work among different programmers. Each programmer can work on a different function, and we later assemble/integrate the functions to solve the bigger problem.
    
2. **Improve reusability.** You do not need to re-implement the same code over and over again. If you have a function that you use in multiple places, you can just call the function instead of writing the same code over and over again. For example, `printf()`, `scanf()`, `rand()`, `rint()`, `pow()`, etc. are all functions that are already implemented in C. You can use them in your programs without having to write the code for them. 

3. **Less code means less bugs.** Since you are reusing code and writing fewer lines of code, you are less likely to make mistakes.

4. **Easier testing.** Since sub-problems will be isolated into different functions. We can test each function individually. This makes debugging easier.

## Example where modular programming is truly useful

Recall the example {ref}`2D-pattern`, where we had to print the following pattern:

<pre>
*
**
***
****
</pre>

We decomposed the solution into two sub-problems:

1. Printing the lines
2. Printing the stars in each line

Printing the lines is a bigger problem that involves printing the stars in each line. Creating a function for each problem makes it easier to think clearly about the solution. For example, to print a particular number of stars, we can use the following function:

```{figure} ./images/function-implementation.png
:alt: Function implementation that prints a number of stars
:width: 800px
:align: center

Function implementation that prints a number of stars
```


And to print the lines, we can make use of `printStars` function as follows:

```{figure} ./images/call-function.png
:alt: Function implementation that prints a pattern. It calls `printStars`.
:width: 800px
:align: center

Function implementation that prints a pattern. It calls `printStars`.
```

The entire code in use will be as follows. Download {download}`print-pattern-functions.c <../../code/chapter05/print-pattern-functions/print-pattern-functions.c>` if you want to run the program yourself.

**Code**
```{code-block} c
:linenos:
:emphasize-lines: 4 - 6, 12

// This program prints a pattern of stars using two functions
#include <stdio.h>

// Function prototypes: Headers of functions
void printPattern(int numOfRows);
void printStars(int numOfStars);

int main(void) {
  int lines;
  printf("Enter the number of lines in the pattern: ");
  scanf("%d", &lines);
  printPattern(lines);
  return 0;
}

void printStars(int numOfStars) {
  for (int star = 1; star <= numOfStars; star++) {
    printf("%c", '*');
  }
  printf("\n");  // to start a newline 
}

void printPattern(int numOfRows) {
  for (int row = 1; row <= numOfRows; row++) {
    printStars(row);
  }
}
```

In lines $4$ -- $6$, we wrote down the **function prototypes** of `printStars` and `printPattern`. A function prototype tells the compiler three main features of a function:

1. The type and number of input parameters
2. The function name
3. The return type of the function

You may or may not include the variable names as shown in the following figure.

```{figure} ./images/function-prototype.png
:alt: Two ways to write a function prototype.
:width: 400px
:align: center

Two ways to write a function prototype.
```

In line $12$, calls `printPattern` function passing the **value** of `line` variable. `printPattern` ultimately calls `printStars` which prints the appropriate number of stars for each line. 

