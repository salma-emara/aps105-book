# Functions

Functions are called subroutines, modules or procedures in other programming languages. They are a sequence of instructions that can be called by name. Functions are useful for decomposing a problem into smaller sub-problems. This is referred to as **modular programming**. The modularity concept is the extent to which a program can be divided into smaller pieces.

## Why functions?

Decomposing a solution into functions is helpful because:

1. **Improve collaboration.** We can divide work among different programmers. Each programmer can work on a different function, and we later assemble/integrate the functions to solve the bigger problem.
    
2. **Improve reusability.** You do not need to re-implement the same code over and over again. If you have a function that you use in multiple places, you can just call the function instead of writing the same code over and over again. For example, `printf()`, `scanf()`, `rand()`, `rint()`, `pow()`, etc. are all functions that are already implemented in C. You can use them in your programs without having to write the code for them. 

3. **Less code means less bugs.** Since you are reusing code and writing fewer lines of code, you are less likely to make mistakes.

4. **Easier testing.** Since sub-problems will be isolated into different functions. We can test each function individually. This makes it easier to debug the code.

## Example where modular programming is useful

Recall the example {ref}`2D-pattern`, where we had to print the following pattern:

<pre>
*
**
***
****
</pre>

In-progress!
<!-- We decomposed the solution into steps:

1. -->