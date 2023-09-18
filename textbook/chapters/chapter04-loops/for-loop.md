# For loops

In the previous sections, we discussed how to repeat instructions using while and do-while loops. In this section, we will discuss the for loop.

## Forming the structure of a for loop from a while loop

Recall the example, where we used while and do-while loops to print numbers between $1$ and $3$. In the following code, we highlight the specific structure of the while loop that allows us to go through fixed number of iterations. The structure highlights three features: initialization, condition, and increment.

```{figure} ./images/structure-while.png
:alt: The main features of while loop for fixed number of iterations.
:class: with-shadow
:width: 600px
:align: center

The main features of while loop for fixed number of iterations: initialization, condition, and increment.
```

The pre-mentioned structure is common, so C has a special loop called the **for loop** that allows us to write the same code in a more compact way. The syntax of the for loop is as follows:

```{code-block} c
for (<initialization>;<condition>;<increment>) {
  <statements>;
}
<other statements>;
```

```{figure} ./images/for-loop-flow-chart.png
:alt: The flow chart of a for loop
:class: with-shadow
:width: 200px
:align: center

The flow chart of a for loop.
```

The following figure shows the order of execution in a for loop that prints numbers from $1$ to $3$.

```{figure} ./images/for-order-of-execution.png
:alt: The execution of a program with a for loop.
:class: with-shadow
:width: 600px
:align: center

The execution of a program with a for loop.
```

Again if we want to print numbers from $1$ to $10$, we only change the condition from `i <= 3` to `i <= 10`. The following program will print out the numbers $1$ through $10$ using a for loop. Download {download}`for-print-nums.c <../../code/chapter04/for-print-nums/for-print-nums.c>` if you want to run the program yourself.

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" 
output="1 2 3 4 5 6 7 8 9 10">
&#35;include &lt;stdio.h&gt;
<br>
int main(void) {
  for (int i = 1; i <= 10; i++) {
    printf("%d ", i);
  }
  return 0;
}
</code-runner>
</pre>

(scope-for-loop)=
## Scope of the loop variable

In the `for` loop, the initialization and declaration of the loop variable are done in the same statement, *e.g.*, `int i = 1`. This makes the `i` variable only visible inside the for loop. After the for loop, the loop variable is no longer visible.

For example, if we compile the following code, we would get a compilation error.

**Code with compilation error**
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="4 5" output="(compiler-time error)">
&#35;include &lt;stdio.h&gt;
<br>
int main(void) {
  for (int i = 1; i <= 10; i++) {  // declare & initialize the loop variable inside the loop
    printf("%d ", i);
  }
  <br>  
  printf("\nWe exited the loop with i = %d \n", i);

  return 0;
}
</code-runner>
</pre>

**Error**

The error in the following figure is because the loop variable `i` is not visible outside the loop. We refer to the visibility of the loop variable as the **scope** of the loop variable. `i` is **out of scope** after the loop. We will discuss scope more later! 

```{figure} ./images/for-scope-error.png
:alt: The error message when the loop variable is used outside the loop.
:class: with-shadow
:width: 600px
:align: center

The error message when the loop variable is used outside the loop.
```

**Solution!** If you want to use the loop variable outside the loop, you can declare it outside the loop and initialize it inside the loop. For example, the following code will compile and run without any error. Download {download}`for-loop-scope.c <../../code/chapter04/for-loop-scope/for-loop-scope.c>` if you want to run the program yourself.

<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="4 5"
output="1 2 3 4 5 6 7 8 9 10
We exited the loop with i = 11">
&#35;include &lt;stdio.h&gt;
<br>
int main(void) {
  int i;                       // declare the loop variable outside the loop
  for (i = 1; i <= 10; i++) {  // initialize the loop variable inside the loop
    printf("%d ", i);
  }
  <br>
  printf("\nWe exited the loop with i = %d \n", i);
  <br>
  return 0;
}
</code-runner>
</pre>

(variations-for-loop)=
## Variations in for loop

You can use the for loop in different ways, including omitting some statements.

1. You can omit the **initialization and/or increment** statements. For example, the following code snippet shows a for loop to print out the numbers $1$ through $10$ without initialization and increment statements.

    ```{code-block} c
    :linenos:
    :emphasize-lines: 1, 2, 4
    int i = 1;  // initialization
    for (; i <= 10;) {
      printf("%d ", i);
      i++;  // increment
    }
    ```

2. If the condition in the for loop is empty, then the **default is that the condition is `true`**. For example, the following code snippet with infinitely print `*`.

    ```{code-block} c
    :linenos:
    :emphasize-lines: 1
    for (;;) {
      printf("*");
    }
    ```

3. You can have more **complex expressions** in initialization or increment statements. For example, you can have multiple statements in the initialization or increment statements. Multiple statements should be separated by a comma `,`. If there were no statements in the body of the loop, the for loop should end with a `;`. For example, the following code snippet will print out the numbers $1$ through $3$.

    ```{code-block} c
    for (int i = 1; i <= 3; printf("%d ", i), i++)
      ;
    ```

    The order of execution for such for loop is shown in the following figure.

    ```{figure} ./images/compact-for.png
    :alt: The order of execution for a compact for loop.
    :class: with-shadow
    :width: 600px
    :align: center

    The order of execution for a compact for loop.
    ```

    You can declare and initialize multiple variables in the initialization statement. For example, the following code snippet will print out the timetable of 7.

    **Code**
    <pre class="code-runner-wrapper">
    <code-runner language="c"
    output="7 * 1 = 7
   7 * 2 = 14
   7 * 3 = 21
   7 * 4 = 28
   7 * 5 = 35
   7 * 6 = 42
   7 * 7 = 49
   7 * 8 = 56
   7 * 9 = 63
   7 * 10 = 70">
    &#35;include &lt;stdio.h&gt;  
    <br>
   int main(void) {
     for (int i = 1, j = 7; i <= 10; printf("7 * %d = %d\n", i, j), i += 1, j += 7)
       ;
     return 0;
   }
    </code-runner>
    </pre>

4. You can have complex conditions. The condition can be complex using logical (`&&`, `||`, `!`) and relational operators (`>`, `>=`, `<`, `<=`, `==`, `!=`). Conditions cannot be separated using `,` as the initialization and increment statements can. 

    ````{admonition} Exercise
    Write a C program to print out the squares of the numbers from $1$ to $50$ or until the square of the number is greater than $200$. 

    **Step 1: Toy example.** The expected output is 
    <pre>
    1 4 9 16 25 36 49 64 81 100 121 144 169 196
    </pre>

    **Step 2: Think of a solution!** You can use a for loop to loop over the numbers from $1$ to $50$ and print their squares. However, there is an additional condition that the square of the number should be less than $200$. You can add this condition statement to exit the loop when the condition is not satisfied.

    **Step 3: Decompose into steps.** You can decompose the problem into the following steps.

    1. Initialize a number to $1$.
    2. Print the square of the number.
    3. Increment the number by $1$.
    4. Check if the square of the number is less than $200$ and the number is less than $50$.
    5. If the condition is satisfied, go to step 2. Otherwise, exit the loop.

    **Step 4: Draw your solution (optional).** You can draw your solution to help you write the correct code. The following figure shows the solution.

    ```{figure} ./images/for-exercise-flow-chart.png
    :alt: The flow chart for the solution.
    :class: with-shadow
    :width: 200px
    :align: center

    The flow chart for the solution.
    ```

    **Step 5: Write the code.** You can write the code as follows.

    **Code**
    <pre class="code-runner-wrapper">
    <code-runner language="c" 
    output="1 4 9 16 25 36 49 64 81 100 121 144 169 196">
    &#35;include &lt;stdio.h&gt;
    <br>
    int main(void) {
      for (int num = 1; (num <= 50) && (num * num < 200); num += 1) {
        printf("%d ", num * num);
      }
      return 0;
    }
    </code-runner>
    </pre>

    **Step 6: Test your code.** You can test your code easily by looking at the numbers printed out. 196, which is the last square printed is less than 200. All numbers printed are squares. 196 is a square of 14, which is less than 50. Therefore, the code is $\sim 100\%$ correct. I have the $\sim$ to encourage you to be **skeptical**!
    ````

## How to choose the kind of the loop: while, do-while, for?

You can use the:

1. `for`: if you know the number of iterations in advance.
2. `do-while`: if you want to test the condition after executing the body of the loop at least once.
3. `while`: if you want to test the condition before executing the body of the loop.

{{quiz_embed | replace("%%FILENAME%%", "chapter-4/sec-3") }}
