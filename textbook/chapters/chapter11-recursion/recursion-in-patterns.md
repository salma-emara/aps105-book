# Recursion in Patterns

In the previous section, we discuss recursion in functions, *e.g.* greatest common divisor using euclidean algorithm or the factorial function. In this section, we discuss recursion in patterns.

In general, recursive functions will have the following structure:

<pre>
Recursive function (problem)
    if terminating condition
        may do a simple calculation;
        return;
    else:
        break problem into a smaller piece/s
        Recursive function (smaller piece/s)
</pre>

## Print a row of stars

Let's start with a simple example. We want to print a row of stars recursively. The number of stars in the row is given as an input to the function. Since the function only prints, it does not return any values to the calling function. The function prototype is as follows:

```{code-block} c
void printRow(int n);
```

**Think recursively!** We need to "think recursively" to develop a recursive function. This means we need to think of doing a small task in printing the row, then calling the same function, but on a smaller row, for example. We can print one star then, call `printRow(n - 1);`. However, we need to remember this is only the **recursive call**. The terminating case could be the smallest possible row of stars, for example, a row of one star. Given that, the **base case** is when `n == 0`. In this case, we print `*\n` only. The following figure illustrates the recursive thought process.

```{figure} ./images/printRow.png
:alt: Print a row of stars
:width: 400px
:align: center
:name: printRow

Print a row of stars recursively.
```

The following code uses the recursive function `printRow`. Download {download}`printRow.c <../../code/chapter11/printRow/printRow.c>` if you want to run the program yourself.
:emphasize-lines: 15, 17 - 18
**Code**
```{code-block} c
:linenos:

#include <stdio.h>

void printRow(int n);

int main(void) {
  int stars;
  printf("Enter number of stars: ");
  scanf("%d", &stars);
  printRow(stars);
  return 0;
}

void printRow(int n) {
  if (n == 1) {
    printf("*\n");
  } else {
    printf("*");
    printRow(n - 1);
  }
}
```

**Output[^1]**
<pre>
Enter number of stars: <b>4</b>
****
</pre>

Line $15$ will be executed only once in the base case, when `n == 1`.

Lines $17$ to $18$ will be executed several times as they are part of the recursive call till `n == 1`.

**What happens when `printRow(4)` is called?** Let's trace `printRow(4)`. In {numref}`printRow-execution`, we show the order of execution.

- `printRow(4)` is called in `main`. 
- `n == 4` is not equal to `1`, so line $12$ is executed.
- `printRow(3)` is called on line $13$
- `n == 3` is not equal to `1`, so line $12$ is executed.
- `printRow(2)` is called on line $13$
- `n == 2` is not equal to `1`, so line $12$ is executed.
- `printRow(1)` is called on line $13$
- `n == 1` is **equal** to `1`, so line $10$ is executed.
- `printRow(1)` should return to `printRow(2)` at line $13$ when it was called, but there is no more code to execute in `printRow(2)`, so `printRow(2)` should return to `printRow(3)`, and so on.
  

```{figure} ./images/printRow-execution.png
:alt: Print a row of stars
:width: 700px
:align: center
:name: printRow-execution

The order of execution of `printRow(4)`.
```

````{admonition} What is we switch the order of printf("*") and printRow(n - 1)?
:class: tip

If we switch the order of `printf("*")` and `printRow(n - 1)`, the order of execution will be different. In {numref}`printRow-execution-switch`, we show the order of execution when the order of `printf("*")` and `printRow(n - 1)` is switched. In short, the recursive call is executed first, then the `printf("*")` is executed. This will make the first print statement to be the one in the base case, and the last print statement to be the one in the recursive call.

```{figure} ./images/printRow-execution-switch.png
:alt: Print a row of stars
:width: 700px
:align: center
:name: printRow-execution-switch

The order of execution of `printRow(4)` when the order of printf("*") and printRow(n - 1) is switched.
```
````

## Print a triangle of stars

In-progress!

[^1]: Inputs to programs are in **bold**.