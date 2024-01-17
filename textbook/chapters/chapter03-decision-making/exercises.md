# Exercises

Many of these exercises are taken from past exams of APS105 Computer Fundamentals courses at University of Toronto. The solutions are provided in the answer boxes.

## Conditional Statements

### Practice 1

**Question 2 in Winter 2018 Midterm Exam**

Write a single C statement — which contains exactly one terminating semi-colon (`;`), and does
not contain brace brackets (`{` or `}`) — that declares a `bool` variable named `isHighlighted`, and
sets its value to true if and only if the value stored in an integer variable named `characterCount`
is an **even positive** number. Assume that the variable `characterCount` has already been declared
and initialized.

````{admonition} Answer
:class: dropdown
```{code-block} c
bool isHighlighted = characterCount % 2 == 0 && characterCount > 0;
```
````

### Practice 2

**Question 2 in Winter 2019 Midterm Exam**

Write a single C statement that declares a boolean-type variable named `divisible` and assigns
true to divisible if and only if the value stored in the int variable named `numOfItems` is exactly
divisible by $5$ or $7$. Assume that variable `numOfItems` has been declared and initialized.

````{admonition} Answer
:class: dropdown
```{code-block} c
bool divisible = numOfItems % 5 == 0 || numOfItems % 7 == 0;
```
````

### Practice 3 

**Question 7 in Winter 2018 Final Exam**

Evaluate the following relational expressions by circling the right answer.

|Expression |`true` / `false`|
|:---|:---|
|`'\O' == 0`| |
|`int x = 10 % 8;`<br>`(x > 0) && (x % 2 == 0) && !false`||
|`'c' - 3 == 'a'`| |
|`int w = rand() % 75 * 2 - 99;`<br>`(w < -99) \|\| (w > 49);`<br>| |


```{admonition} Answer
:class: dropdown
|Expression |`true` / `false`|
|:---|:---|
|`'\O' == 0`| `true`, since `\0` has ASCII code of zero|
|`int x = 10 % 8;`<br>`(x > 0) && (x % 2 == 0) && !false`|`true`, since `x` stores $2$|
|`'c' - 3 == 'a'`| `false`, since `'c' - 2 == 'a'`|
|`int w = rand() % 75 * 2 - 99;`<br>`(w < -99) \|\| (w > 49);`|`false`, since the range of random numbers in `w` is between -99 and 49 inclusive|
```

### Practice 4

**Question 3 in Winter 2022 Midterm Exam**

Suppose that `x` and `y` are `int` type variables, write a single C statement that is equivalent to the following statement, but is simpler, *i.e.* with fewer boolean and relational operators.

```{code-block} c
bool var = !(x <= y && y <= z);
```
    
````{admonition} Answer
:class: dropdown
```{code-block} c
bool var = (x > y || y > z);
```
````

## Nested-if Statements

### Practice 1

**Modified version of Question 7 in Winter 2019 Midterm Exam**

Write C program to find the median, which is the number at the middle, among three integers `p`, `q` and `r`. The program should prompt the user to enter three integers, which get stored in `p`, `q` and `r`. Your program should print the value of the number at the middle. For example, with integers $2$, $7$, and $5$ as input, the function returns 5; with integers $6$, $4$, and $6$ as input, the function returns $6$.

````{admonition} Answer
:class: dropdown

Download {download}`median.c <../../code/chapter03/exercise-median/median.c>` to get the following code.

```{code-block} c
#include <stdio.h>
int main(void) {
  int p = 0, q = 0, r = 0;
  printf("Enter three integers: ");
  scanf("%d %d %d", &p, &q, &r);

  if ((p >= q && p <= r) || (p >= r && p <= q)) {
    printf("%d", p);
  } else if ((q >= p && q <= r) || (q >= r && q <= p)) {
    printf("%d", q);
  } else {
    printf("%d", r);
  }
}
```
````

### Practice 2

**Modified Version of Question 4 in Winter 2022 Midterm Exam**

The following program finds the middle character, e.g., if we have `a = 'a'`, `b = 'b'`, and `c = 'c'`, the program prints `b`. Rewrite this function such that it only uses one `printf` and one nested `if-else` statement.

```{code-block} c
int main(void) {
  char a = '\0', b = '\0', c = '\0';
  printf("Enter three characters: ");
  scanf("%c %c %c", &a, &b, &c);
  if (a < b) {
    if (b < c) {
      printf("%c", b);
    } else if (a < c) {
      printf("%c", c);
    } else {
      printf("%c", a);
    }
  }

  if (c < b) {
    printf("%c", b);
  }
  if (a < c) {
    printf("%c", a);
  }
  printf("%c", c);
}
```

````{admonition} Answer
:class: dropdown
```{code-block} c
int main(void) {
  char a = '\0', b = '\0', c = '\0', result = '\0';
  printf("Enter three characters: ");
  scanf("%c %c %c", &a, &b, &c);

  char result = a;

  if ((a < b && b < c) || (c < b && b < a)) {
    result = b;
  } else if ((a < c && c < b) || (b < c && c < a)) {
    result = c;
  }

  printf("%c", result);
}
```
````