# Exercises

Many of these exercises are taken from past exams of APS105 Computer Fundamentals courses at University of Toronto. The solutions are provided in the answer boxes.

Headings in this page classify the exercises into different categories: **[Easy]**, **[Intermediate]**, and **[Challenging]**. I suggest you start by easy exercises and work your way up to the challenging ones.


**Question 1 Winter 2017 Final Exam [Easy]**

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
:emphaszie-lines: 5
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

**Question 6 Winter 2017 Midterm Exam [Easy]**

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

**Question 5 in Winter 2018 Midterm Exam[Intermediate]**

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

**Modified version of Question 6 in Winter 2018 Midterm Exam[Intermediate]**

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


**Question 5 in Winter 2022 Midterm Exam[Challenging]**

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