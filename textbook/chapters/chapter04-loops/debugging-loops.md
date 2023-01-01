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