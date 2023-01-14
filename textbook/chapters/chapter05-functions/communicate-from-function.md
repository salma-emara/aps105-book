# Communicate from a function

In the previous section, we discussed an example where functions helped in dividing our problem into sub-problems. Functions make it easy to think of problems. The functions we discussed in the previous section did not return any information back to the **caller** function. In this section, we discuss problems that require returning a value to the **caller** function.

## Return a non-void variable type

For example, we want to write a function that calculates the factorial of a number. The function is to take an input parameter $n$, calculate the value of $n \times (n -1) \times (n-2) .... 3 \times 2 \times 1$, and returns it to the calling function. 

**Code**

```{code-block} c
#include <stdio.h>

int factorial(int n);

int main(void) {
  int n;
  printf("Enter a positive integer: ");
  scanf("%d", &n);
  int result = factorial(n);
  printf("Factorial of %d: %d, ", n, result);
  return 0;
}

int factorial(int n) {
  int fact = 1;

  for (int i = 1; i <= n; i++) {
    fact = fact * i;
  }

  return fact;
}
```

**Output[^1]**
<pre>
Enter a positive integer: <b>3</b>
3! = 6
</pre>


## Summary of syntax of a program with functions

```{figure} ./images/syntax-summary.png
:alt: Basic skeleton of a program that uses functions.
:width: 600px
:align: center

Basic skeleton of a program that uses functions.
```

In-progress!!

[^1]: Inputs to programs are in **bold**.