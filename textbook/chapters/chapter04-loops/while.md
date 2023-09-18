# While Loop

The while loop is a control flow statement that allows instructions/statements/code to be executed repeatedly based on a given condition.

## What is a while loop?

The syntax of the while loop is as follows:

```{code-block} c
while (<condition>) {
  <statements>;
}
<other statements>;
```

```{figure} ./images/while-loop-flow-chart.png
:alt: The flow chart of a while loop
:class: with-shadow
:width: 200px
:align: center

The flow chart of a while loop.
```

As the above flow chart shows, the execution of the while loop starts by:

1. Checking the condition of the loop. 
2. If the condition is `true`, the statements inside the curly braces will be executed. 
3. Repeat 1 and 2 until the condition becomes `false`.
4. Once the condition becomes `false`, the while loop will exit and nothing inside the curly braces will be executed anymore. The program will continue executing the statements after the while loop.

For example, the following program will print out the numbers $1$ through $3$.

```{figure} ./images/while-order-of-execution.png
:alt: The execution of a program with a while loop.
:class: with-shadow
:width: 600px
:align: center
:name: while-order-of-execution

The execution of a program with a while loop.
```

**Output**
<pre>
1 2 3 
</pre>

To print numbers $1$ to $10$, we can change the condition to `i <= 10`. The following program will print out the numbers $1$ through $10$. Download {download}`while-print-nums.c <../../code/chapter04/while-print-nums/while-print-nums.c>` if you want to run the program yourself.

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" output="1 2 3 4 5 6 7 8 9 10">
&#35;include &lt;stdio.h&gt;
<br>
int main(void) {
  int i = 1;
  while (i <= 10) {
    printf("%d ", i);
    i++;
  }
  return 0;
}
</code-runner>
</pre>


````{admonition} Exercise
:class: note

Write a C program that takes in from the user numbers and calculates the sum of the numbers. The program should stop when the user enters a negative number.

**Step 1: Toy example.** For example, if the user enters 18, 5, 3, 2, 1, -1, the program should print out the sum of the numbers $18 + 5 + 2 + 1$, which is 29.

**Step 2: Think of a solution!** The program should **repeatedly** take in numbers from the user. Repetition needs a loop. Repetition is for:
1. repeatedly entering numbers from the user
2. repeatedly adding the entered number to the sum. 
3. This is on one condition, if **the numbers were positive**. The program should stop when the user enters a **negative number**.

**Step 3: Decompose into steps.**  Writing the steps down requires us to write a **pseudocode**. Pseudocode is an informal way of writing code that helps programmers develop code without worrying about syntax or details. Pseudocode is a good way to think about the steps that the program should take.

A potential pseudocode for this program is as follows:

1. Initialize the sum to zero.
2. Take in a number from the user.
3. Check if the number is negative. If the number is negative, exit the while loop.
4. If the number is not negative, add the number to the sum.
5. Repeat steps 2-4 until the user enters a negative number.

**Step 4: Draw your solution.** The following flow chart shows the steps that the program should take.

```{figure} ./images/while-loop-exercise.png
:alt: The flow chart of the while loop exercise
:class: with-shadow
:width: 200px
:align: center  

The flow chart of the while loop exercise that finds the sum of numbers entered by the user until the user enters a negative number.     
```

**Step 5: Write the code.** Download {download}`sum-numbers-while.c <../../code/chapter04/sum-numbers-while/sum-numbers-while.c>` to get the following code.

<pre class="code-runner-wrapper">
<code-runner language="c" input="18 5 2 1 -1" output="Enter a number: <b>18</b>
<b>5</b>
<b>2</b>
<b>1</b>
<b>-1</b>
The sum is 26">
&#35;include &lt;stdio.h&gt;
<br>
int main(void){
  int sum = 0;
  int num;
  printf("Enter a number: ");
  scanf("%d", &num);
  while(num >= 0){
    sum += num;
    scanf("%d", &num);
  }
  printf("The sum is %d\n", sum);
  return 0;
}
</code-runner>
</pre>

```{admonition} Common Confusions!
:class: tip
**Should we take the number from the user *inside* or *outside* the while loop?** Outside the while loop. This is because we need to check if the number is negative before we add it to the sum. If we decide to take in the first number from the user inside the while loop, we would have already passed the condition of the while loop.

**Should we initialize the `sum` to zero?** Yes, we should initialize the `sum` to zero. This is because the `sum` should be zero if the user enters a negative number in the beginning. If we do not initialize the `sum` to zero, the `sum` will be undefined. 
```
**Step 6: Test your code.** Test your code with other numbers. For example, try entering a negative number first. What happens? The sum should be 0. Try entering a zero number. What happens? The while loop should not stop and you should be still able to enter numbers. 
````

Kindly, refer to the following video if you want to trace the code above.

{{ video_embed | replace("%%VID%%", "VKUARRHmb_U")}}



## Infinite Loops

What happens when the condition in the while loop is always true? The while loop will never stop and the program will never exit. This is called an infinite loop. For example, the following program will never stop since `i > 0` is always `true`:

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c">
&#35;include &lt;stdio.h&gt;
<br>
int main(void){
  int i = 1;
  while(i > 0){ //will always be true
    printf("%d ", i);
    i++;
  }
  return 0;
}
</code-runner>
</pre>

{{quiz_embed | replace("%%FILENAME%%", "chapter-4/sec-1") }}