# Debugging for loops

In this section, we debug an example program that uses a nested loop to print a pattern. The program is shown below. We go through common mistakes and types of errors that you might encounter when writing a code with a loop.

## Goal of debugging exercises

* Practice reviewing/reading other people's code
* Fix mistakes in other people's code (debugging)
* See/avoid mistakes in your own code

## Common mistakes

The first step in debugging is to identify the common mistakes. Here are some common mistakes that you might make when writing a loop.

* Wrong initialization of the loop variable, *e.g.*, initializing `i = 0` instead of `i = 1` for a loop that starts from 1.
* Did not have a statement that changes the condition appropriately, *e.g.*, `i -= 1` instead of `i += 1`.
* Using incorrect logical operator, *e.g.*, used `&&` instead of `||` or vice versa.
* Using uncomfortable loop type, *e.g.*, using a `while` loop in case where it is easier to deal with `do-while` loop.
* Missing an `=` or adding an `=` in the wrong place, *e.g.*, having `while(x > 0)` instead of `while ( x >= 0)`.

## Debugging a program with a loop

{{ video_embed | replace("%%VID%%", "eviO1AYRgoU")}}

The following is a code to print a pattern of stars. The code is shown below. Download {download}`triangle-with-bugs.c <../../code/chapter04/triangle-with-bugs/triangle-with-bugs.c>` to debug the program yourself. 

```{code-block} c
#include <stdio.h>

int main(void) {
  int n = 0;
  printf("Enter the number of rows: ");
  scanf("%d", &n);

  for (int row = 1; row <= n; row += 1) {
    for (int col = 1; col < n; col += 1) {
      if (col <= n - row) {
        printf(" ");
      } else if (col >= n - row || col <= n - 1 + row) {
        printf("*");
      }
    }
    printf("\n");
  }
  return 0;
}

```

**Expected output**
<pre>
Enter the number of rows: <b>5</b>
    *
   ***
  *****
 *******
*********
</pre>

<pre>
Enter the number of rows: <b>4</b>
   *
  ***
 *****
*******
</pre>

<pre>
Enter the number of rows: <b>3</b>
  *
 ***
*****
</pre>
<!-- Need to check for when n = 0 or 1-->

**Actual Output**
<pre>
Enter the number of rows: <b>5</b>
    
   *
  **
 ***
****
</pre>

You can find the corrected code below. Download {download}`triangle-fixed.c <../../code/chapter04/triangle-fixed/triangle-fixed.c>` to see the corrected code.

**Corrected Code**
```{code-block} c
#include <stdio.h>

int main(void) {
  int n = 0;
  printf("Enter the number of rows: ");
  scanf("%d", &n);

  for (int row = 1; row <= n; row += 1) {
    for (int col = 1; col < 2 * n; col += 1) {
      if (col <= n - row) {
        printf(" ");
      } else if (col > n - row && col <= n - 1 + row) {
        printf("*");
      }
    }
    printf("\n");
  }
  return 0;
}
```

## Debugging a program with a do-while loop

{{ video_embed | replace("%%VID%%", "Or3EP7hXwnU")}}

The following code is supposed to take input `int` from the user into `maxRange` variable, then finds a random prime number between $1$ and `maxRange`. However, it has a few bugs that we discuss and fix in the video above. You can try out debugging the code yourself here before watching the video: {download}`random-primeNum-with-bugs.c <../../code/chapter04/random-primeNum-with-bugs/random-primeNum-with-bugs.c>`. 

**Code with bugs**
```{code-block} c
// Question 11 in Winter 2018 Midterm Exam
// Debug the following code
// The program is supposed to take in from the user
// an int variable named maxRange.
// Then, it should print a prime number randomly generated
// between 1 and maxRange.
// Prime number is a number that is not divisible by any number
// except for itself and 1.

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

int main(void) {
  // Enter input
  int maxRange = 0;
  printf("Enter the maximum range: ");
  scanf("%d", &maxRange);

  // Generate a random number, check if it is prime, if yes, great, if not
  // re-generate
  bool isPrime = true;
  int primeRandNum = 0;
  do {
    primeRandNum = rand() % (maxRange - 1 + 1) + 1;

    isPrime = true;
    for (int denom = 2; denom < primeRandNum; denom++) {
      if (primeRandNum % denom == 0) {
        break;
      }
    }

  } while (!isPrime);

  printf("Random prime number generated is %d", primeRandNum);

  return 0;
}
```

Download the fixed code: {download}`random-primeNum.c <../../code/chapter04/random-primeNum/random-primeNum.c>`.

**Fixed code**
```{code-block} c
// Question 11 in Winter 2018 Midterm Exam
// Fixed code!
// The program is supposed to take in from the user
// an int variable named maxRange.
// Then, it should print a prime number randomly generated
// between 1 and maxRange.
// Prime number is a number that is not divisible by any number
// except for itself and 1, e.g. 2, 3, 5, 11, 13 ...

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

int main(void) {
  // Enter input
  int maxRange = 0;
  printf("Enter the maximum range: ");
  fflush(stdout);
  scanf(" %d", &maxRange);

  // Generate a random number, check if it is prime, if yes, great, if not
  // re-generate
  bool isPrime = true;
  int primeRandNum = 0;
  do {
    primeRandNum = rand() % (maxRange - 1 + 1) + 1;

    isPrime = true;
    for (int denom = 2; denom < primeRandNum && isPrime; denom++) {
      if (primeRandNum % denom == 0) {
        isPrime = false;
      }
    }
    if (primeRandNum == 1) {
      isPrime = false;
    }
  } while (!isPrime);

  printf("Random prime number generated is %d\n", primeRandNum);

  return 0;
}

```

{{quiz_embed | replace("%%FILENAME%%", "chapter-4/sec-5") }}