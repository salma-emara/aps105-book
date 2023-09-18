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

Printing the lines is a bigger problem that involves printing the stars in each line. Creating a function for each problem makes it easier to think clearly about the solution. For example, to print a particular number of stars, we can use the following function `printStars`:

```{figure} ./images/function-implementation.png
:alt: Function implementation that prints a number of stars
:width: 800px
:align: center

Function implementation that prints a number of stars.
```

1. The return type of our function is `void`. In this function, we do not return any values to the caller function. We will see how to return a value in the next section.
2. The function name is `printStars`. This name will be used to call the function to execute its instructions. 
3. The type of the input parameter is `int`.
4. The variable name of the input parameter is `numOfStars`. This is the same variable name used within the function.
5. The body of the function has instructions to print one line of `numOfStars` stars. 

And to print the lines, we can make use of `printStars` function in another `printPattern` function as follows:

```{figure} ./images/call-function.png
:alt: Function implementation that prints a pattern. It calls `printStars`.
:width: 800px
:align: center

Function implementation of `printPattern` that prints a pattern by calling `printStars`.
```

1. In `printPattern` function, we have a loop that increments the `row` number from $1$ to `numOfRows`. For each row, it calls `printStars` that prints a number of stars equal to `row`. 

2. To call `printStars` that does not return a value, it is enough to write its name and the name of the variable to send its value, as `printStars(row);`. The value of `row` will be copied to `numOfStars` in `printStars` function.

The entire code in use will be as follows. Download {download}`print-pattern-functions.c <../../code/chapter05/print-pattern-functions/print-pattern-functions.c>` if you want to run the program yourself.

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="4 5 6 12" input="5"
output="Enter the number of lines in the pattern:<b>5</b><br>*<br>**<br>***<br>****<br>*****">
// This program prints a pattern of stars using two functions
&#35;include &lt;stdio.h&gt;
<br>
// Function prototypes: Headers of functions
void printPattern(int numOfRows);
void printStars(int numOfStars);
<br>
int main(void) {
  int lines;
  printf("Enter the number of lines in the pattern:");
  scanf("%d", &lines);
  printPattern(lines);
  return 0;
}
<br>
void printStars(int numOfStars) {
  for (int star = 1; star <= numOfStars; star++) {
    printf("%c", '*');
  }
  printf("\n");  // to start a newline 
}
<br>
void printPattern(int numOfRows) {
  for (int row = 1; row <= numOfRows; row++) {
    printStars(row);
  }
}
</code-runner>
</pre>

In lines $4$ -- $6$, we wrote down the **function prototypes** of `printStars` and `printPattern`. A function prototype tells the compiler three main features of a function:

1. The type and the number of input parameters, e.g. in `void printStars(int numOfStars);`, we know `int` is the type of the only input parameter
2. The function name, e.g. `printStars`
3. The return type of the function, e.g. `void` since both of other functions do not return anything

You may or may not include the variable names as shown in the following figure.

```{figure} ./images/function-prototype.png
:alt: Two ways to write a function prototype.
:width: 400px
:align: center

Two ways to write a function prototype.
```

In line $12$, we call `printPattern` function passing the **value** of `line` variable to the variable `numOfRows`. `printPattern` ultimately calls `printStars` which prints the appropriate number of stars for each line. 

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

**Step 7**: Once `printStars` prints a line of stars, it returns to exactly where it was initially called, `printPattern`. `printPattern` will continue executing its loop, and call `printStars` again if `row` in `printPattern` remains less than or equal `numOfRows`. Steps $4$ to $7$ will continue until the loop in `printPattern` exits.

**Step 8**: When `printPattern` finishes printing the pattern, it returns to where it was initially called in the `main` function. The next step in `main` is `return 0;` where the program exits.

## Another way to write code with functions (but not favorable)

There is another way to write your program when it has functions, that does not involve writing the function prototypes. It requires that you implement all the functions before the `main` function, instead of including the function prototypes. The following code shows the code above in this new way. Function prototypes are replaced with the function implementations, that were at the end of the program. You should not have function implementations at the end of the program in this case.

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" input="5" output="Enter the number of lines in the pattern:<b>5</b><br>*<br>**<br>***<br>****<br>*****"> 
// This program prints a pattern of stars using two functions
&#35;include &lt;stdio.h&gt;
<br>
void printStars(int numOfStars) {
  for (int star = 1; star <= numOfStars; star++) {
    printf("%c", '*');
  }
  printf("\n");  // to start a newline 
}
<br>
void printPattern(int numOfRows) {
  for (int row = 1; row <= numOfRows; row++) {
    printStars(row);
  }
}
<br>
int main(void) {
  int lines;
  printf("Enter the number of lines in the pattern:");
  scanf("%d", &lines);
  printPattern(lines);
  return 0;
}
</code-runner>
</pre>

**Why is this method not favorable?**

The compiler compiles your code one line at a time from top to bottom. The compiler should have observed the function prototype or function implementation before they are **called** in any functions, including the the `main` function. For example, in the previous code, if we switched the order of the function implementations of `printStars` and `printPattern`, it will cause an error at line $6$ in the following code, because this is the first time `printStars` is observed by the compiler. The compiler did not see before line $6$ any prototype or implementation of `printStars`, which is why it flags an error. This causes a **compile-time** error. 

```{figure} ./images/function-implementation-order.png
:alt: Function implementation order can cause an issue if no caution is taken.
:width: 800px
:align: center

The order of function implementation can cause an issue if no caution is taken!
```

However, if you were to write the function prototypes before the main, then the order of the function implementations after the main function does not matter. There is no caution that is required.


<!--
```{admonition} Important!
When you call a function, you pass the value of the variable, not type not variable itself. %Needs a figure and explanation! **Exercise**

When you pass a parameter to a function, the name used inside the function should be the same as the name in the header of the function implementation. For example, in `printPattern` function, we passed the value of `lines` in `main`, but we used `numOfRows` in `printPattern`. This is because `numOfRows` is the name of the variable in the function header of `printPattern`.

```
-->


{{quiz_embed | replace("%%FILENAME%%", "chapter-5/sec-1") }}