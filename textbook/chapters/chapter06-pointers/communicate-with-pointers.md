# Communication with functions using pointers

In the previous chapter, we discussed one way to communicate with a function. This was through passing several arguments and only get one value in return. In this section, we discuss another way to communicate to and from a function using pointers.

**Communicate _from_ function using return.** For example, in the following code, we have a function named `isPerfectSquare` that checks if the value in `x` is a perfect square. A perfect square is a number resulted from a *rational* number multiplied by itself. A rational number is a whole number, without a fractional part. $1$, $4$ and $25$ are all examples of perfect squares as they are a result of $1 = 1 \times 1$, $4 = 2 \times 2$ and $25 = 5 \times 5$.

**Code**
```{code-block} c
#include <math.h>
#include <stdbool.h>
#include <stdio.h>

bool isPerfectSquare(int);

int main(void) {
  int num;
  printf("Enter a number: ");
  scanf("%d", &num);

  if (isPerfectSquare(num)) {
    printf("%d is a perfect square\n", num);
  } else {
    printf("%d is NOT a perfect square\n", num);
  }
  return 0;
}

bool isPerfectSquare(int x) {
  if ((int)sqrt(x) != sqrt(x)) {
    return false;
  } else {
    return true;
  }
}

```

**Output**
<pre>
Enter a number: 36
36 is a perfect square
</pre>

````{admonition} Improvement!
Multiple returns in one function is not neat! As you develop your code with if-statements, you may mistakenly forget to consider a condition where you had to return a value. To avoid such issues, we suggest that you have one return statement that is not part of any loop or if-statement. This is to ensure that it will be definitely executed and the function will return a value. 

For example, we can re-write `isPerfectSquare` function as follows, where it returns `true` if the int part of `sqrt(x)` is equal to `sqrt(x)`, *i.e.* there is no fractional number resulting from `sqrt(x)`, and returns `false` otherwise. Download {download}`perfect-square.c <../../code/chapter06/perfect-square/perfect-square.c>` if you want to run the program yourself.

**Code snippet**
```{code-block} c
bool isPerfectSquare(int x) { 
    return ((int)sqrt(x) == sqrt(x)); 
}
```
````


**Communicate _from_ function using pointers.** Recall when we previously discussed {ref}`Call by value<variable-scope>`, whenever a parameter is passed to a function, a copy of the value is sent to the function not the variable itself. This means that whatever change happens to the value passed to the function, it wouldn't affect the variables in the caller function. For example, in the following simple code, even though `p` is changed in `simple` function, the value of `p` in `main` remains `12`. For details on why `p` in `main` function does not change refer to {ref}`Call by value<variable-scope>`.

**Code**
```{code-block} c
#include <stdio.h>

void simple(int);

int main(void) {
  int p = 12;
  simple(p);
  printf("The value of p is %d.\n", p);
  return 0;
}

void simple(int p) { 
    p = p / 2; 
}
```

**Output**
<pre>
The value of p is 12.
</pre>

What if we want to pass the value of `p` itself in `simple` function. The answer is we use **pointers**.

## What are pointers?

As we discussed earlier, every variable in our code is stored in the main memory. In the following figure, we have two variables: a `int` variable named `x` and is set to $7$, and a pointer to a `int` named `p` that holds an address to a `int`. A pointer is a variable that holds the address of another variable. 

```{figure} ./images/pointer-in-memory.png
:alt: int and pointer to int variables in code and memory.
:width: 600px
:align: center

`int` and pointer to `int` (`int*`) variables in code and memory.
```

As we learned before, declaring a variable without initializing it makes the variable hold a garbage value, *i.e.* in the above program, the variable `p` holds a garbage address. 

**How to assign a pointer an address?** Using the _reference_ operator `&`, we can get the address of a variable. For example, if we say `&x`, this gets the address of variable `x`. Then, we can assign it to `p` variable as in the following code.

```{figure} ./images/p-assigned-address.png
:alt: assign p an address value.
:width: 800px
:align: center

assign `p` the address of `x`.
```

We can also get the value of the variable that p has its address


```{figure} ./images/dereference-p.png
:alt: assign contents pointed by p to y.
:width: 800px
:align: center

assign contents pointed by `p` to `y`.
```

## Tracing exercise
