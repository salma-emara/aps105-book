# Exercises

Many of these exercises are taken from past exams of APS105 Computer Fundamentals courses at University of Toronto. The solutions are provided in the answer boxes.

Headings in this page classify the exercises into different categories: **[Easy]**, **[Intermediate]**, and **[Challenging]**. I suggest you start by easy exercises and work your way up to the challenging ones.

**Question 9 in Fall 2013 Midterm Exam [Easy]**

Determine the values of the variables `W`, `X`, `Y` and `Z` after the function `SumEm` executes in the main program of the following C program:

```{code-block} c
#include <stdio.h>
void SumEm(int *A, int B, int C, int *D) {
  if (B > C) {
    *A = B + *D;
    *D = C;
  } else {
    *A = C + *D;
    *D = B;
  }
  return;
}
int main(void) {
  int W, X, Y, Z;
  W = 0;
  X = 5;
  Y = 8;
  Z = 10;
  SumEm(&W, X, Y, &Z);
  return 0;
}
```

<pre>
W =
X =
Y =
Z =
</pre>

```{admonition} Answer
:class: dropdown

<pre>
W = 18
X = 5
Y = 8
Z = 5
</pre>
```

**Question 1 in Winter 2017 Final Exam [Easy]**

Find and correct all compile-time errors (mistakes that would cause compilation or that would cause the ‘build’ to fail) in the following C program. Your answer should both identify what the error is, and what the correction should be. Marks will be deducted if you identify correct items as compile-time errors. 

```{code-block} c
#include <stdio.h>
int main(void) {
  int j, k;
  int *i = &j;
  for (*i = 0; *i < 10, *i = *i + 1) {
    scanf("%d", &k);
    printf("%d", (*i) * (*i) * (*i));
  }
}
```

````{admonition} Answer
:class: dropdown

Corrected condition and increment fields: 

`*i < 10, *i = *i + 1` to `*i < 10; *i = *i + 1`

```{code-block} c
:emphasize-lines: 5
#include <stdio.h>
int main(void) {
  int j, k;
  int *i = &j;
  for (*i = 0; *i < 10; *i = *i + 1) {
    scanf("%d", &k);
    printf("%d", (*i) * (*i) * (*i));
  }
}
```
````

**Question 1 in Fall 2014 Midterm Exam [Easy]**

What will be printed when the following C program is executed?

```{code-block} c
int main(void) {
  int first = 1, second = 10;
  int *pointerToFirst, *pointerToSecond;

  pointerToFirst = &first;
  pointerToSecond = &second;
  *pointerToFirst = *pointerToSecond - *pointerToFirst;
  *pointerToSecond = *pointerToSecond - *pointerToFirst;
  *pointerToFirst = *pointerToSecond + *pointerToFirst;
  printf("%d, %d\n", first, second);
}
```

```{admonition} Answer
:class: dropdown
<pre>
10, 1</pre>
```

**Question 6 in Winter 2017 Midterm Exam [Easy]**

Consider the following code, which uses pointers:

```{code-block} c
int a, b, c, d;
int *e, *f;
a = 5;
b = 6;
e = &c;
f = &d;
*e = a + b;
*f = *e + b;
e = &a;
f = &b;
*e = c + d;
*f = a + b;
```

What are the values of the variables `a` and `b` after this code is executed?

```{admonition} Answer
:class: dropdown
`a` is 28 and `b` is 34.
```

**Question 5 in Winter 2018 Midterm Exam [Intermediate]**

Write the output of the following program.

```{code-block} c
#include <stdio.h>
int main(void) {
  int *p, x;
  int fiveInt[5] = {1, 2, 3, 4, 5};
  int *q;
  p = NULL;
  q = fiveInt;
  x = 6;
  p = &x;
  printf("A: %d %d\n", x, *p);
  *(q + 3) = *p;
  *p = *q + *(q + 3);
  printf("B: %d %d %d\n", x, *p, *q);
  return 0;
}
```

```{admonition} Answer!
:class: dropdown
<pre>
A: 6 6
B: 7 7 1
</pre>
```

**Modified version of Question 6 in Winter 2018 Midterm Exam [Intermediate]**

Identify the potential runtime error in the following code and briefly explain how you would fix it.

```{code-block} c
#include <stdio.h>
int higher(int *m, int *n) {
  int isHigher;
  if (m >= n)
    isHigher = m;
  else
    isHigher = n;
  return &isHigher;
}
int main(void) {
  int c = 9, d = 8;
  int isHigher;
  isHigher = higher(&c, &d);
  printf("%d\n", isHigher);
  return 0;
}
```

````{admonition} Answer
:class: dropdown
Problem: In the function, pointer is assigned to a standard variable. 

**Correction**
```{code-block} c
:emphasize-lines: 3, 4, 6, 7
int higherCorrect(int *m, int *n) {
  int isHigher;
  if (*m >= *n)
    isHigher = *m;
  else
    isHigher = *n;
  return isHigher;
}
```

````

**Question 9 in Winter 2019 Midterm Exam [Intermediate]**

There are $0.3048$ metres in a foot, $100$ centimetres in a metre, and $12$ inches in a foot. Write a program that will accept, as input, a length in feet and inches. **You do not have to check for valid input** -- assume the user enters positive, non-fractional values for the feet and inches. The program
will output the equivalent length in metres and centimetres **(rounded to the nearest centimetre)**.

Your code should include four functions: one for input, one for output, one to perform the calculation, and main. The function prototypes are below. For full marks, your code should not use
any global variables.

```{code-block} c
void getInput(int *outFeet, int *outInches);
void printOutput(int feet, int inches, int metres, int centimetres);
void convert(int feet, int inches, int *outMetres, int *outCentimetres);
```

An example of one run of the program is below:
<pre>
Please enter the feet and inches to convert: <b>5 10</b>
5 feet 10 inches is 1 metres and 78 centimetres
</pre>

````{admonition} Answer
:class: dropdown

```{code-block} c
#include <math.h>
#include <stdio.h>

void getInput(int *outFeet, int *outInches) {
  printf("Please enter the feet and inches to convert: ");
  scanf("%d %d", outFeet, outInches);
}

void printOutput(int feet, int inches, int metres, int centimetres) {
  printf("%d feet %d inches is %d metres and %d centimetres.\n", feet, inches,
         metres, centimetres);
}

void convert(int feet, int inches, int *outMetres, int *outCentimetres) {
  double length = feet + (inches / 12.0);
  double metres = length * 0.3048;
  *outMetres = metres;  // truncate to integer
  *outCentimetres = rint((metres - *outMetres) * 100);
}

int main(void) {
  int feet, inches;
  getInput(&feet, &inches);
  int metres, centimetres;
  convert(feet, inches, &metres, &centimetres);
  printOutput(feet, inches, metres, centimetres);
  return 0;
}
```

````

**Question 13 in Winter 2014 Midterm Exam [Challenging]**

In this question, you are to complete the code for a function and its calling in a main program. The function is called `sumAndProductOfMultiples`. It takes integers `multiple1` and `multiple2`, and a maximum bound `max` as input, and computes both the sum and the product of all the positive integers less than `max` that are multiples of either `multiple1` or `multiple2`.

For example, if `multiple1 = 3`, `multiple2 = 5`, and `max = 10`, the positive integers less than $10$ that are multiples of either $3$ or $5$ are $3$, $5$, $6$, $9$. Their sum is $23$, and their product is $810$. The function must return the `sum` and `product` values via pointer parameters `sumPtr` and `productPtr`, as implied in the skeleton code below.

In the code skeleton below, you are given most of the `main` function, but you must give the call to the `sumAndProductOfMultiples` function. After that you are given just the declaration line of the function, and you must write the remainder of the function.

```{code-block} c
#include <stdio.h>
void sumAndProductOfMultiples(int multiple1, int multiple2, int max,
                              int* sumPtr, int* productPtr);

int main(void) {
  int multi1 = 3, multi2 = 5, max = 10;
  int sum, product;
  // add your call to sumAndProductOfMultiples here:
  
  printf("m1 = %d, m2 = %d, max = %d, sum = %d, product = %d\n", multi1, multi2,
         max, sum, product);
  return 0;
}
void sumAndProductOfMultiples(int multiple1, int multiple2, int max,
                              int* sumPtr, int* productPtr) {
                
                              }
```


````{admonition} Answer
:class: dropdown
```{code-block} c
:emphasize-lines: 9, 16 - 23
#include <stdio.h>
void sumAndProductOfMultiples(int multiple1, int multiple2, int max,
                              int* sumPtr, int* productPtr);

int main(void) {
  int multi1 = 3, multi2 = 5, max = 10;
  int sum, product;
  // add your call to sumAndProductOfMultiples here:
  sumAndProductOfMultiples(multi1, multi2, max, &sum, &product);
  printf("m1 = %d, m2 = %d, max = %d, sum = %d, product = %d\n", multi1, multi2,
         max, sum, product);
  return 0;
}
void sumAndProductOfMultiples(int multiple1, int multiple2, int max,
                              int* sumPtr, int* productPtr) {
  *sumPtr = 0, *productPtr = 1;
  int i;
  for (i = 1; i < max; i++) {
    if (i % multiple1 == 0 || i % multiple2 == 0) {
      *sumPtr += i;
      *productPtr *= i;
    }
  }
}
```
````

**Question 5 in Winter 2022 Midterm Exam [Challenging]**

In the box provided below, write the output generated after the following program is completely executed.

```{code-block} c
#include <stdio.h>
int main(void) {
  int first = 1, second = 2, data[4] = {10, 20, 30, 40};
  int *third = &second, *fourth = &first, *fifth = data + first + 1;
  (*third)++;
  (*fourth)++;
  data[second] = *fifth + first + *third + *fourth;
  printf("first = %d, second = %d, third = %d, fourth = %d, fifth = %d\n",
         first, second, *third, *fourth, *fifth);
  for (int i = 0; i < 4; i++) {
    printf("%d, ", data[i]);
  }
  printf("\n");
  return 0;
}
```

```{admonition} Answer
:class: dropdown
<pre>
first = 2, second = 3, third = 3, fourth = 2, fifth = 30
10, 20, 30, 37,</pre>
```