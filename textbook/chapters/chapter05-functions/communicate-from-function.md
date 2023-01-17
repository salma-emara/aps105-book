# Communicate from a function

In the previous section, we discussed an example where functions helped in dividing our problem into sub-problems. Functions make it easy to think of problems. The functions we discussed in the previous section did not return any information back to the **caller** function. In this section, we discuss problems that require returning a value to the **caller** function.

## Return a non-void variable type

For example, we want to write a function that calculates the factorial of a number. The function is to take an input parameter $n$, calculate the value of $n \times (n -1) \times (n-2) .... 3 \times 2 \times 1$, and returns it to the calling function. The following figure shows the code along with the order of execution. Download {download}`factorial.c <../../code/chapter05/factorial/factorial.c>` if you want to run the program yourself.

```{figure} ./images/factorial-order-of-execution.png
:alt: Order of execution in a code that gets the factorial.
:width: 800px
:align: center

Order of execution in a code that gets the factorial.
```

1. As always, the execution starts from the `main` function. 
2. `factorial` function takes in 4 as an input
3. The variable `n` in `factorial` function is assigned the value of 4.
4. The function `factorial` returns the value of 24 to the caller function, which is the `main` function.
5. `factorial(number)` now is evaluated as 24.
6. The value of `result` is set to the evaluated value of `factorial(number)`, which is 24.
   
**Output**
<pre>
Factorial of 4: 24.
</pre>

## Variable scope

In the previous example, we found that we created a new variable `n` in `factorial` to take in the value of `number` from the `main` function. This is because we cannot access `number` inside `factorial` function. Likewise, `n` cannot be access in the `main` function. We say the scope of `number` is within the main function, and the scope of `n` is `factorial` function.

All variables created within the `{` `}` can only be accessed within `{` `}`.

Recall, when we discussed for loops, we said that the following would cause a compile-time error.

```{code-block} c
for (int count = 1; count <= n; count++) {
  printf("*");
}
count = 10;
```

## Summary of syntax of a program with functions

```{figure} ./images/syntax-summary.png
:alt: Basic skeleton of a program that uses functions.
:width: 600px
:align: center

Basic skeleton of a program that uses functions.
```

In-progress!!

The order of the parameters passed to a function MUST be the same as the order of the parameters in the header of the function. We will see examples of this in the next section.

[^1]: Inputs to programs are in **bold**.