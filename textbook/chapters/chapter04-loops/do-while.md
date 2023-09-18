# Do-while loop

In the previous section, we discussed how to repeat a set of instructions in programming using a while loop. In this section, we will discuss the do-while loop. The do-while loop is similar to the while loop. The only difference is that the do-while loop will always execute **at least once**, even if the condition is `false`. This is because the condition is checked at the end of the loop. 

## What is the do-while loop?

The syntax of the do-while is as follows:

```{code-block} c
do {
  <statements>;
} while (<condition>);
```

```{figure} ./images/do-while-loop-flow-chart.png
:alt: The flow chart of a do-while loop
:class: with-shadow
:width: 200px
:align: center

The flow chart of a do-while loop.
```

As the above flow chart shows, the execution of the do-while loop starts by:

1. Executing the statements inside the curly braces.
2. Checking the condition of the loop.
3. If the condition is `true`, repeat 1 and 2 until the condition becomes `false`.
4. Once the condition is `false`, the loop will exit and nothing inside the curly braces will be executed anymore. The program will continue executing the statements after the do-while loop.

Let's look at an example to study the order of execution. In the following code, we do the exact same thing as in {ref}`while-order-of-execution` figure. We print numbers from $1$ to $3$. The only difference is that we use a do-while loop instead of a while loop.
    
```{figure} ./images/do-while-order-of-execution.png
:alt: The execution of a program with a do-while loop.
:class: with-shadow
:width: 600px
:align: center

The execution of a program with a do-while loop.
``` 

If we want to print numbers from $1$ to $10$, we just need to change the condition from `i <= 3` to `i <= 10` as in the following code. Download {download}`do-while-print-nums.c <../../code/chapter04/do-while-print-nums/do-while-print-nums.c>` if you want to run the program yourself.

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" output="1 2 3 4 5 6 7 8 9 10">
&#35;include &lt;stdio.h&gt;
<br>
int main(void) {
  int i = 1;
  do {
    printf("%d ", i);
    i++;
  } while (i <= 10);
  return 0;
}
</code-runner>
</pre>

(do-while-validate)=
## Do-while loop vs. while loop

The main difference between the do-while and the while loop is that the do-while loop will always execute the statements between `{}` at least once, even if the condition is `false`. While the while loop will not execute the statements between `{}` if the condition is `false`.

This makes do-while loops useful when we want to execute a set of statements at least once. For example, we can use a do-while loop to validate user input like in the following exercise. 

````{admonition} Exercise

Write a C program that asks the user to enter a number between $1$ and $10$. If the user enters a number that is not between $1$ and $10$, the program will ask the user to enter a number again. The program will keep asking the user to enter a number until the user enters a number between $1$ and $10$. Once the user enters a number between $1$ and $10$, the program will print out the number.

**Step 1: Toy example.** For example, if the user enters $-2$, the program will ask the user to enter a number again. If the user enters $5$, the program will print out $5$.

**Step 2: Think of a solution!** The program should **repeatedly** take in numbers from the user until the number falls between $1$ and $10$, *i.e.*, `(num >= 1 && num <= 10)`. Repetition needs a loop. Repetition is for repeatedly entering numbers from the user. This is on the condition that the previous numbers entered were outside the bound of 1 and 10, i.e. `!(num >= 1 && num <= 10)` or `(num < 0 || num > 10)`. The program should stop when the user enters a number between $1$ and $10$.

**Step 3: Decompose into steps.** A potential pseudocode for this program is as follows:

1. Ask the user to enter a number.
2. Check if the number is between $1$ and $10$.
3. Repeat 1 -- 2, if the number is not between $1$ and $10$.
4. If the number is between $1$ and $10$, print out the number.

**Step 4: Draw your solution (optional).** 

```{figure} ./images/do-while-exercise.png
:alt: The flow chart of the do-while loop exercise
:class: with-shadow
:width: 200px
:align: center

The flow chart of the do while loop exercise that validates that the user input number is between $1$ and $10$.
``` 

**Step 5: Write the code.** Download {download}`validate-input.c <../../code/chapter04/validate-input/validate-input.c>` to get the following code.

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" input="-2 5"
output="Please enter a number between 1 and 10 (inclusive): <b>-2</b>
Please enter a number between 1 and 10 (inclusive): <b>5</b>
The number entered is 5.">
&#35;include &lt;stdio.h&gt;
<br>
int main(void) {
  int num;
<br>
  do {
    printf("Please enter a number between 1 and 10 (inclusive): ");
    scanf("%d", &num);
  } while (num < 1 || num > 10);
<br>
  printf("The number entered is %d.\n", num);
  return 0;
}
</code-runner>
</pre>

**Step 6: Test your code.** Test your code with other numbers. For example, try a number at the boundary, e.g., $1$, $10$ , $0$, $11$.
````


{{quiz_embed | replace("%%FILENAME%%", "chapter-4/sec-2") }}