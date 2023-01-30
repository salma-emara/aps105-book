# How to use pointers to communicate more with functions?

Now that we know what are pointers and how to use them, we will use pointers to solve the issue with swapping two variables in a function. In the following figure, we highlight the additions we made to the source code where we called `swap` function by value (not by pointers). Source code can be downloaded from here: {download}`swapping.c <../../code/chapter06/swapping/swapping.c>`, and can be copied from below.

```{figure} ./images/changes-in-swap-code.png
:alt: highlight additions in code.
:width: 800px
:align: center

Highlight additions in code when we changed the swap function to call it by pointers, not by value.
```

**Code**
```{code-block} c
:linenos:
:emphasize-lines: 3, 8, 14-17
#include <stdio.h>

void swap(int*, int*);

int main(void) {
  int a = 9, b = 13;
  printf("Before swapping\nValue of a: %d\nValue of b: %d\n", a, b);
  swap(&a, &b);
  printf("After swapping\nValue of a: %d\nValue of b: %d\n", a, b);

  return 0;
}

void swap(int* x, int* y) {
  int temp = *x;
  *x = *y;
  *y = temp;
}
```

**Output**
<pre>
Before swapping
Value of a: 9
Value of b: 13
After swapping
Value of a: 13
Value of b: 9
</pre>

In the following video, we trace the program to see how it works. 

{{ video_embed | replace("%%VID%%", "N4YBJt4JcSk")}}

In line $3$, we changed the prototype to pass pointers as input parameters. The pointers data types are written as `int*`. 

In line $8$, instead of `swap(a, b);`, we are passing the addresses of `a` and `b` using `swap(&a, &b);`, because `swap` function now takes pointers that stores addresses, not `int` values.

In lines $14$ to $17$, we are dealing with the values stored in the addresses of `x` and `y`, hence we have to dereference `x` and `y`. `*x` accesses the value of `a` in the `main` function memory space in the main memory. Similarly, `*y` accesses the value of `b` stored in the `main` function memory space.

## What is the size of the pointer variable?

We discussed before that old machines represent addresses using 32 bits, while modern machines use 64 bits. Let's test what does my computer uses. I tried running the following code, where I print the size of pointers to main data types we use such as `int*`, `double*`, `char*` and `bool*`. All pointers require 8 bytes to store the values of addresses, *i.e.* 64 bits. Try out the code by downloading {download}`size-of-pointer.c <../../code/chapter06/size-of-pointer/size-of-pointer.c>`, and can be copied from below.

**Code**
```{code-block} c
#include <stdbool.h>
#include <stdio.h>

int main(void) {
  printf("Size of pointer (int*) is %d.\n", sizeof(int *));
  printf("Size of pointer (double*) is %d.\n", sizeof(double *));
  printf("Size of pointer (bool*) is %d.\n", sizeof(bool *));
  printf("Size of pointer (char*) is %d.\n", sizeof(char *));
  return 0;
}
```

**Output**
<pre>
Size of pointer (int*) is 8.
Size of pointer (double*) is 8.
Size of pointer (bool*) is 8.
Size of pointer (char*) is 8.
</pre>

## Can a pointer hold the address of another pointer?

A pointer can hold the address of another pointer, since they are all addresses. However, if we have a pointer that holds address of an `int` its type is `int*`, and the type of the pointer that holds the address of that `int*` pointer is `int**` -- an additional `*` is added. For example,

**Code**
```{code-block} c
#include <stdio.h>

int main(void) {
  int i = 0;
  int *pi;
  int **ppi;

  pi = &i;
  ppi = &pi;
  i = 10;

  printf("What i is storing: %d\n", i);
  printf("What pi is pointing to: %d\n", *pi);
  printf("What (ppi is pointing to) = pi is pointing to: %d\n", **ppi);
  return 0;
}
```

**Output**
<pre>
What i is storing: 10
What pi is pointing to: 10
What (ppi is pointing to) = pi is pointing to: 10
</pre>

In the main memory, the values of `i`, `pi` and `ppi` are shown in the following figure. Please note that addresses are arbitrary addresses.

```{figure} ./images/pointer to pointer.png
:alt: how does a pointer to a pointer look like in the memory.
:width: 800px
:align: center

How does a pointer to a pointer look like in the memory? It just holds another address.
```

````{admonition} Important!

It is important to note that `int* pi;` is equivalent to `int *pi;`, and 

```
int *pi = &i; 
```

is equivalent to 
```
int *pi;
pi = &i;
```

````

## Can a function return a pointer?

Let's write a function that returns a pointer to the variable with the maximum value. The function takes in two pointers to two `double` variables and returns one pointer to the largest `double`.

**Code**
```{code-block} c
:linenos:
#include <stdio.h>
double* largestValLoc(double*, double*);

double* largestValLoc(double* a, double* b) {
  double* temp;
  if (*a > *b) {
    temp = a;  // temp is double* and a is double*, so temp = a is permissible
  } else {
    temp = b;
  }
  return temp;  // temp is double*, and return type is double*
}

int main(void) {
  double x = 2.6, y = 7.3;
  double* p =
      largestValLoc(&x, &y);  // pass address of x to a, and address of y to b
  // p is (double*) and largestValLoc returns (double*)
  printf("Address of x: %p having value %.1lf.\n", &x, x);
  printf("Address of y: %p having value %.1lf.\n", &y, y);
  printf("Address of larger variable: %p.\n", p);
  return 0;
}
```

**Output**
<pre>
Address of x: 0x304757170 having value 2.6.
Address of y: 0x304757168 having value 7.3.
Address of larger variable: 0x304757168.
</pre>

## Practice Problem solved Fall 2018 Midterm Exam Q7

In-progress!