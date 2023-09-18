# Nested loops

Just like how if-statements can be nested, loops can be nested too. Nested loops would be necessary if we decompose a problem into multiple parts, and each part has its own repetition.

For example, in this next exercise, we print multiple lines where each line has different repetition pattern. 

(2D-pattern)=
## Print a 2 dimensional pattern

**Exercise**

Write a C program that prints the following pattern:

<pre>
*
**
***
****
*****
</pre>

**Step 1: Toy example.** The expected output is shown above. But a more simplified version of the output is printing only three line as follows.

<pre>
*
**
***
</pre>

**Step 2: Think of a solution!** There are **two** sources of repetition. The first source of repetition is the number of lines, *i.e.*, we are printing three lines in the toy example. The second source of repetition is the number of stars in each line. In the first line, we are printing 1 `*`, in the second line, we are printing 2 `*`s and so on.

We can use a loop to repeat the action of printing lines. For each line, we can use another loop to repeat the action of printing stars. In every line, we can print out the number of stars that is equal to the line number.

**Step 3: Decompose into steps.** We can decompose the problem into two parts. The first part is in each line, we print out the number of stars that is equal to the line number. The second part is to print out all the number of lines. In other words, we need a loop that repeats printing stars, and another loop that repeats printing lines. Printing lines can be decomposed into the following steps:

1. Initialize a variable `line` to $1$.
2. Print out stars equal to the line number.
3. Increment the variable `line` by $1$.
4. Repeat 2 and 3 until the variable `line` is greater than number of lines to be printed, e.g. $3$.

The second step **"2. Print out stars equal to the line number."** can be decomposed into the following steps:

1. Initialize a variable `star` to $1$.
2. Print out a `*`.
3. Increment the value of `star` by $1$.
4. Repeat 2 and 3 until the value of `star` is greater than the value `line`.

**Step 4: Write the code.** The code is shown below. Download {download}`print-stars-pattern.c <../../code/chapter04/print-stars-pattern/print-stars-pattern.c>` if you want to run the program yourself.

{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" output="*<br>**<br>***">
#include &lt;stdio.h&gt;
<br>
int main(void) {
  for (int line = 1; line <= 3; line += 1) {  // loop over lines
    for (int star = 1; star <= line;
         star += 1) {  // loop over stars in a single line
      printf("*");
    }
    printf("\n");
  }
  return 0;
}
</code-runner>
</pre>

**Step 5: Test the code.** Try changing 3 to 5 and see what happens. It should print the following pattern.

<pre>
*
**
***
****
*****
</pre>

**Step 6: Debug the code.** It is possible that you do not get the expected output. Some common mistakes are:

1. Misplacing the `printf("\n")` statement to be in the inner loop. This will print a new line for every `*`. If you did so, the output will look like this:
  
    **Misplacing `printf("\n")` in the inner loop.**

    <pre class="code-runner-wrapper">
    <code-runner language="c" highlight-lines="8" output="*<br>*<br>*<br>*<br>*<br>*"> 
    #include &lt;stdio.h&gt;
    <br>
   int main(void) {
     for (int line = 1; line <= 3; line += 1) {  // loop over lines
       for (int star = 1; star <= line;
          star += 1) {  // loop over stars in a single line
         printf("*");
         printf("\n");  // misplaced
       }
     }
     return 0;
   }
    </code-runner>
    </pre>

    **Undesired Output**
    <pre>*<br>*<br>*<br>*<br>*<br>*</pre>

    It should be placed after the inner loop only when one line is printed out.
    

2. Some people prefer to start `line` and `star` from `0`, instead of `1`. This is perfectly fine, unless you are printing out the number of stars that is equal to the line number. In that case, you need to change the condition in the outer loop to `line < 3` or `line <= 2`. There is no need to change the condition in the inner loop. This is because `line` is now already reduced by `1` since it starts from `0`.

    **Starting `line` and `star` from `0`.**
    <pre class="code-runner-wrapper">
    <code-runner language="c" input="5" highlight-lines="4 5"
    output="*<br>**<br>***">
    &#35;include &lt;stdio.h&gt;
    <br>
   int main(void) {
     for (int line = 0; line < 3; line += 1) {  // loop over lines
       for (int star = 0; star <= line;
          star += 1) {  // loop over stars in a single line
         printf("*");
       }
       printf("\n");
     }
     return 0;
   }
    </code-runner>
    </pre>

## Let's tweak the pattern a little!

**Exercise**

Write a C program that prints the following pattern with $n$ rows. $n$ would be taken as input from the user. In the following pattern, $n$ is set to $5$. 

<pre>
    *
   **
  ***
 ****
*****
</pre>

**Step 1: Toy example.** The expected output is shown above. We can use it as a toy example to develop our solution.

**Step 2: Think of a solution!** Again, here we need an outer loop for the number of rows to print, and an inner loop for the number of spaces and number of stars to print in each row. 

In the following figure, we can see a pattern in the number of spaces and number of stars in each line. The number of spaces is equal to $n$ - row number and the number of stars is equal to row number.

We will use a loop to print out each row. For each row, we will use another loop to print out the number of spaces and number of stars. In every row, we can print out the number of spaces that is equal to $n$ - row number. Then, we can print the number of stars that is equal to row number.

```{figure} ./images/stars-pattern.png
:alt: Pattern of stars/asterisks
:width: 400px
:align: center

Pattern of stars/asterisks
```

**Step 3: Decompose into steps.** We can decompose the problem into two parts. The first part is to print out the number of rows. The second part is to print out the number of spaces and number of stars in each line. The second part can be decomposed into the following steps:

1. Initialize a variable `row` to $1$.
2. Print out the number of spaces that is equal to $n$ - row number and stars that is equal to row number.
3. Increment the variable `row` by $1$.
4. Repeat 2 and 3 until the variable `row` is greater than $n$ for the toy example.

The second step **"2. Print out the number of spaces that is equal to $n$ - row number and stars that is equal to row number"** can be decomposed into the following steps:

1. Initialize a variable `column` to $1$.
2. Print a space if the value of `column` is less than or equal to $n$ - row number.
3. Otherwise, print out a `*`.
4. Increment the variable `column` by $1$.
5. Repeat 2 to 4 until the variable `column` is greater than $n$.

**Step 4: Write the code.** The code is shown below. Download {download}`reverse-stars-pattern.c <../../code/chapter04/reverse-stars-pattern/reverse-stars-pattern.c>` if you want to run the program yourself.

<pre class="code-runner-wrapper">
<code-runner language="c" input="5"
output="Enter the number of rows:<b>5</b><br>    *<br>   **<br>  ***<br> ****<br>*****">
#include &lt;stdio.h&gt;
<br>
int main(void) {
  int n = 0;
  printf("Enter the number of rows:");
  scanf("%d", &n);
  for (int row = 1; row <= n; row += 1) {
    for (int col = 1; col <= n; col += 1) {
      if (col <= n - row) {
        printf(" ");
      } else {
        printf("*");
      }
    }
    printf("\n");
  }
  return 0;
}
</code-runner>
</pre>

**Step 5: Test the code.** Test the code with corner numbers that may break your code. For example, try changing $5$ to $1$ and see what happens. It should print only one `*`. Try changing $5$ to $0$ and see what happens. It should print nothing.

**Step 6: Debug the code.** It is possible that you do not get the expected output. Some common mistakes in printing patterns were discussed in the previous exercise. 


{{quiz_embed | replace("%%FILENAME%%", "chapter-4/sec-4") }}