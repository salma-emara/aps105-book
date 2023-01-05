# Exercises

Many of these exercises are taken from past exams of APS105 Computer Fundamentals courses at University of Toronto. The solutions are provided in the answer boxes.

Headings in this page classify the exercises into different categories: **[Easy]**, **[Intermediate]**, and **[Challenging]**. I suggest you start by easy exercises and work your way up to the challenging ones.

## Loops

**Question 1 in Winter 2022 Final Exam [Easy]**

Re-write the following code snippet replacing the for loop with a while loop. The changes you make should not change the functionality of the code snippet. Your code snippet should have exactly the same number of variables and the same variable names. 

```{code-block} c
int result = 2;
for (int i = 2; i <= 989; i = i * 2) {
  result *= i;
}
```

````{admonition} Answer
:class: dropdown
```{code-block} c
int result = 2, i = 2;
while (i <= 989) {
  result *= i;
  i = i * 2;
}
```
````

**Question 8 in Winter 2022 Final Exam [Easy]**

Write a complete C program that calculates and prints the sum of all numbers between $1$ and $999$ (inclusive) that satisfy **all** the following conditions:

* The number is divisible by $9$.
* The number is even.
* The ten's digit of the number is *not* $7$. For example, the ten's digit in $753$ is $5$, the ten's digit of $671$ is $7$, and the ten's digit of $9$ is $0$.

````{admonition} Answer
:class: dropdown
```{code-block} c
#include <stdio.h>
int main(void) {
  int sum = 0;
  for (int number = 1; number <= 999; number++) {
    // divisible by 9 and is even
    if (number % 9 == 0 && number % 2 == 0) {
      // Computes the ten's digit
      int tenDigit = number / 10 - (number / 100) * 10;
      if (tenDigit != 7) {
        sum += number;
      }
    }
  }
  printf("%d\n", sum);
  return 0;
}
```
````


**Modified version of Question 4 in Winter 2018 Midterm Exam [Intermediate]**

Write a C program that prints the most significant digit of a positive int-type integer that is taken from the user. The program should prompt the user "Enter a number:" and prints "The leading digit is: " followed by the most significant digit. 

For example, if the user input is `987654321`, the program will print `9`. You can assume that the user always enters a positive integer.


````{admonition} Answer
:class: dropdown
```{code-block} c
#include <stdio.h>

int main(void) {
  int number = 0;

  printf("Enter a number: ");
  scanf("%d", &number);

  int leadingDigit = 0;
  while (number > 0) {
    leadingDigit = number % 10;
    number /= 10;
  }

  printf("The leading digit is %d\n", leadingDigit);
}
```
````

**Question 6 in Winter 2020 Midterm Exam [Intermediate]**

The value of the mathematical constant $e$ can be expressed using the infinite series:
$ e = 1 + \frac{1}{1!} + \frac{1}{2!} + \frac{1}{3!} + ...$

Write a C program that approximates the value of $e$ by approximating $1 + \frac{1}{1!} + \frac{1}{2!} + \frac{1}{3!} + ...$.

Rather than adding an infinite number of terms, your program should continue adding terms until the value of a term is less than $0.001$. Your program should print the approximation to $e$ and the number of terms used to determine the approximation. The terms in the series are $1$, $\frac{1}{1!}$, $\frac{1}{2!}$ and so on.

````{admonition} Answer
:class: dropdown
```{code-block} c
#include <stdio.h>

int main(void) {
  const double TOLERANCE = 0.001;
  double sum = 0.0, term = 1.0;
  int n = 0;

  while (term >= TOLERANCE) {
    sum = sum + term;  // accumulate the term
    n = n + 1;         // determine next term
    term = term / n;
  }

  printf("The value of e is approximately %f.\n", sum);
  printf("The number of terms in the sum is %d.\n", n);
  return 0;
}
```
````

**Question 11 in Winter 2018 Midterm Exam [Challenging]**

Write a C program that returns a randomly generated prime number between $1$ and a maximum `int`-type integer, `maxRange` (inclusive), which is provided as
by the user as input, and is assumed to be greater than $1$. A prime number is a natural number greater than 1 that cannot be formed by multiplying two smaller natural numbers. For example, $2$, $3$, $5$, $11$, and $13$ are all prime numbers.

The program prompts the user "Enter the maximum range: " to enter the `maxRange` value and prints "Random prime number generated is " followed by the randomly generated prime number. You can assume that the user always enters a positive integer greater than $1$. You are not allowed to use arrays or pointer variables in your implementation. For convenience, you do not need to seed the random number generator.

````{admonition} Answer
:class: dropdown

```{code-block} c
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

int main() {
  int maxRange = 1;
  printf("Enter the maximum range: ");
  scanf("%d", &maxRange);

  int primeNum = 0;
  bool foundNotPrime = false;
  do {
    foundNotPrime = false;
    primeNum =
        rand() % maxRange + 1;  // to generated a number between 1 and maxRange
    // check if primeNum is prime
    // We will further discuss how to check if a number is prime in the next
    // chapter
    for (int i = 2; !foundNotPrime && i <= primeNum / 2; i++) {
      if (primeNum % i == 0) {  // make sure remainder of all divisions is not 0
                                // to confirm if a number is prime
        foundNotPrime = true;
      }
    }
    // Check special cases: to prevent 1 of becoming prime
    if (primeNum == 1) foundNotPrime = true;
  } while (foundNotPrime);

  printf("Random prime number generated is %d", primeNum);

  return 0;
}
```

````



## Debugging/Finding Errors

**Question 8 in Winter 2018 Midterm Exam[Intermediate]**

Identify and correct all compile-time errors you find in the C program below. Compile-time errors are errors — not warnings — that the compiler will report when compiling the program. Each line may or may not contain compile-time errors, and there may be more than one error per line.

**Code with compile-time errors**
```{code-block} c
:linenos:
#include <stdio.h>
int main(void) {
  double a, b = 3.14;
  do {
    int i = 0;
    printf("Enter a positive integer for offset: \n");
    scanf("%d", &a);
 } while (i < 5 && (a < 100 || a > 1);
 int j;
 for (j = 0, j < 3, j++) {
    y = b * j % a;
    printf("%d\n", y);
}
 return 0;
}
```


````{admonition} Answer
:class: dropdown
Line 5: the scope of `i` is only within the `{}` of the do-while loop, so it cannot be used outside the loop in the conditional statement. Hence, `i` should be declared before the do-while loop. More on scope in the next chapter.

Line 8: Missing closing `)`

Line 10: Commas should be semi-colon

Line 11: Cannot use modulo operator with double values, should be corrected to
`y = (int) b * j % (int) a;` (or declare variable `a` and `b` as int)

Line 11: variable `y` is not declared but used here. Can be declared with `j` as `int j, y;`

````