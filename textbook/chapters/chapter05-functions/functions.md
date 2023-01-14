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

Function implementation that prints a number of stars.
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

## Order of execution with functions

The following figure shows the order of executing a program with functions. 

```{figure} ./images/execution-order-with-functions.png
:alt: Steps take to execute a program with functions.
:width: 800px
:align: center

Steps taken to execute a program with functions.
```

**Step 1**: instructions in the main function are the first to be executed. 

**Step 2**: The main function called `printPattern` function. The *value* of `lines` is to be "passed" to `printPattern`. 

**Step 3**: `printPattern` function will catch the passed value of `lines` in a new variable named `numOfRows`. 

**Step 4**: `printPattern` function calls `printStars` function. The value of `row` is to be "passed" to `printStars`. 

**Step 5**: `printStars` function will catch the passed value of `row` in a new variable named `numOfStars`.

**Step 6**: `printStars` function body will print a line of stars equal to `numOfStars`.

**Step 7**: Once `printStars` prints a line of stars, it returns to exactly where it was initially called, `printPattern`. `printPattern` will continue executing its loop, and call `printStars` again if. Steps $4$ to $7$ will continue until the loop in `printPattern` exits. 

**Step 8**: When `printPattern` finishes printing the pattern, it returns to where it was initially called in the `main` function. The next step in `main` is `return 0;` where the program exits.

## Another way to write code with functions (but not favorable)

There is another way to write your program when it has functions, that does not involve writing the function prototypes. It requires that you implement all the functions before you use them in the `main` function. The following code re-writes the code above, but by replacing function prototypes with the function implementations at the end of the program. You should not have function implementations at the end of the program in this case. 

**Code**
```{code-block} c
// This program prints a pattern of stars using two functions
#include <stdio.h>

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

int main(void) {
  int lines;
  printf("Enter the number of lines in the pattern: ");
  scanf("%d", &lines);
  printPattern(lines);
  return 0;
}
```

**Why is this method not favorable?**

The compiler compiles your code one line at a time from top to bottom. This requires function implementations to be before they are **called** in any functions, other than the `main` function. For example, in the previous code, if we switched the order of the function implementations of `printStars` and `printPattern`, it will cause an error at line $6$ in the following code.

```{figure} ./images/function-implementation-order.png
:alt: Function implementation order can cause an issue if no caution is taken.
:width: 800px
:align: center

The order of function implementation can cause an issue if no caution is taken!
```

This is because the compiler does not know what is `printStars` at line 6 yet, is it a function prototype, implementation, or a function from a library? This caused a compile-time error.

However, if you were to write the function prototypes before the main, then the function implementations after the main function, the order of function prototypes at the top or the implementations does not matter. There is no caution that is required.

```{admonition} Important!
When you call a function, you pass a variable not type.

When you pass a parameter to a function, the name used inside the function should be the same as the name in the header of the function implementation. For example, in `printPattern` function, we passed the value of `lines` in main, but we used `numOfRows` in `printPattern`. This is because `numOfRows` is the name of the variable in the function header of `printPattern`.

The order of the parameters passed to a function MUST be the same as the order of the parameters in the header of the function. We will see examples of this in the next section.
```
