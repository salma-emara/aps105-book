# Exercises

Many of these exercises are taken from past exams of APS105 Computer Fundamentals courses at University of Toronto. The solutions are provided in the answer boxes.

Headings in this page classify the exercises into different categories: **[Easy]**, **[Intermediate]**, and **[Challenging]**. I suggest you start by easy exercises and work your way up to the challenging ones.

**Question 5 in Winter 2020 Midterm Exam [Easy]**

Write the output of the following program.

```{code-block} c
#include <stdio.h>

void skipSpace(int n) {
  for (int i = 1; i <= n; i++) printf(" ");
}

void printLeft(int n) {
  for (int i = 1; i <= n; i++) printf("/");
}

void printRight(int n) {
  for (int i = 1; i <= n; i++) printf("\\");
}

int main(void) {
  const int TSize = 5;
  int i;
  skipSpace(TSize);
  printf("*\n");
  for (i = 0; i < TSize - 2; i++) {
    skipSpace(TSize - 1 - i);
    printLeft(i + 1);
    printf("|");
    printRight(i + 1);
    printf("\n");
  }
  skipSpace(TSize);
  printf("|");
  return 0;
}
```

```{admonition} Answer
:class: dropdown
<pre>
     *
    /|\
   //|\\
  ///|\\\
     |
</pre>
```

**Question 4 in Winter 2022 Midterm Exam[Easy]**

The following function is called with three distinct characters and returns the middle character, e.g., if 'a', 'b', and 'c' is passed as arguments to the function, it returns 'b'. Rewrite this function such that it only uses one return and one if statement.

```{code-block} c
char median(char a, char b, char c) {
  if (a < b) {
    if (b < c) {
      return b;
    } else if (a < c) {
      return c;
    } else {
      return a;
    }
  }
  if (c < b) {
    return b;
  }
  if (a < c) {
    return a;
  }
  return c;
}
```

````{admonition} Answer
:class: dropdown
```{code-block} c
char median(char a, char b, char c) {
  char result = a;
  if ((a < b && b < c) || (c < b && b < a)) {
    result = b;
  } else if ((a < c && c < b) || (b < c && c < a)) {
    result = c;
  }
  return result;
}
```
````

**Question 11 in Fall 2015 Midterm Exam [Intermediate]**

Write a C function `reverseDigits`, the prototype of which is given below, that takes an integer argument value, and returns an integer with its digits reversed. For example, if the argument is `1234`, the function will return `4321`.

```
int reverseDigits(int value);
```

````{admonition} Answer
:class: dropdown
```{code-block} c
int reverseDigits(int value) {
  int sum = 0, lastDigit;
  while (value != 0) {
    lastDigit = value % 10;
    sum = sum * 10 + lastDigit;
    value = value / 10;
  }
  return sum;
}
```
````

**Question 12 in Fall 2015 Midterm Exam [Challenging]**

In 1706, John Machin, then a professor in London UK, devised a formula for calculating $\pi$:

$\frac{\pi}{4} = 4 \cdot \arctan(\frac{1}{5}) − \arctan(\frac{1}{239})$

where the `arctan` values can be calculated using the following formula:

$\arctan(x) = x − \frac{x^3}{3} + \frac{x^5}{5} - \frac{x^7}{7} + \frac{x^9}{9} \dots - 
\frac{x^{299}}{299} + \frac{x^{301}}{301}$

Write a C program that calculates and prints $\pi$ using this method, printing $10$ digits after the decimal point. You must define your own function called `arctan` to compute the `arctan` values, and you are not allowed to use the `atan` function from the `math` library. When your program is run, its output should be (up to 10 decimal places):

<pre>
Pi = 3.1415926536
</pre>

````{admonition} Answer
:class: dropdown
```{code-block} c
double arctan(double x) {
  int sign = 1;
  double sum = 0;
  for (int i = 1; i <= 301; i += 2) {
    sum += sign * pow(x, i) / i;
    if (sign == 1)
      sign = -1;
    else
      sign = 1;
    // or sign = -sign;
  }
  return sum;
}
int main(void) {
  printf("Pi = %.10lf\n", (4 * arctan(1 / 5.0) - arctan(1 / 239.0)) * 4);
  return 0;
}
```
````


**Question 9 in Winter 2020 Midterm Exam [Challenging]**

A pythagorean triple is a triple of integers $(x, y, z)$ such that $x^2 + y^2 = z^2$. 

Complete this function that takes a single positive integer `x` as an argument and prints three positive integer values `x`, `y` and `z` such that:
1. $x^2 + y^2 = z^2$
2. $y > 0$ and $y < 100$
3. $y < z$.

If there is no triple that satisfies these conditions print “no solution exists.” Start with the following definition:

```{code-block} c
void pythagoreanTriples (int x) {
```

````{admonition} Answer
:class: dropdown

**An easier solution**
```{code-block} c
void pythagoreanTriples(int x) {
  for (int y = 1; y < 100; y++) {
    int zz = x * x + y * y;
    int z = sqrt(x * x + y * y);
    if ((z > y) && (sqrt(zz) == z)) {
      printf("x = %d, y = %d, z = %d\n", x, y, z);
      return;
    }
  }
  printf("no solution exists.\n");
}
```


**Solution given in marking scheme**
```{code-block} c
void pythagoreanTriples(int x) {
  for (int y = 1; y < 100; y++) {
    for (int z = y + 1; z < x * x + y * y; z++) {
      if (x * x + y * y == z * z) {
        printf("x = %d, y = %d, z = %d\n", x, y, z);
        return;
      }
    }
  }
  printf("no solution exists.\n");
}
```
````

