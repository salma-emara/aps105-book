# Pass more values to a function

In this section, we will solve an exercise were we need to pass to a function three input parameters and return one.

## Worked exercise 

This exercise is a modified version of Question 7 in 2019 Midterm Exam.

Write a program that takes in three integers from the user. The `main` function should call a function named `median` to find the median among these integers, which is the number at the middle. In particular, your function should take $3$ int-type parameters and return the value of the number at the middle. For example, with integers $2$, $7$, and $5$ as input, the function returns 5; with integers $6$, $4$, and $6$ as input, the function returns $6$.

**Step 1: Toy example.** As the problem statement says, we can use `x` $= 2$, `y` $= 7$, and `z` $= 5$ as a toy example.

**Step 2: Think of a solution!** There are many ways to think of a solution. I will discuss one way. If we can compare `x` with `y`, regardless of who is greater, both can be the median. We cannot eliminate one variable by one comparison. Hence, we need to compare `x` with `y` and `z` in one statement. For example, if `x` is greater than `y` and smaller than `z`, `x` is median. But this is not the only case that makes `x` median. `x` can be greater than `z` and smaller than `y` and still be the median. What makes `x` median is if it falls between `y` and `z`. Similarly, for `y` and `z` to be the median, they have to fall in between the other two numbers.

```{figure} ./images/median-example.png
:alt: Image showing all possible arrangements of three variables
:width: 400px
:align: center
:name: median-possibilities

Image showing all possible arrangements of three variables: `x`, `y` and `z`.
```

**Step 3: Decompose into steps.** To decompose the problem into steps. The first step is to take input numbers from the user, and the next step is to check which number is the median. The latter can be written in a function as specified by the question. In that function, we will do the following steps

1. Check if `x` is the median: does it fall between `y` and `z`?
2. Store `x` in a variable or return it if it is the median.
3. Check if `y` is the median: does it fall between `x` and `z`?
4. Store `y` in a variable or return it if it is the median.
5. Check if `z` is the median: does it fall between `x` and `y`?
6. Store `z` in a variable or return it if it is the median.

The last step is to print this median.

**Step 4: Write the code.** When writing a program that is modular, *i.e.* uses functions. It is a good idea to start typing the function first. As required in the question, the function takes three `int` values and return an `int` having the value of the median.

**Code snippet**
```{code-block} c
:linenos:
:emphasize-lines: 2, 3
int median(int x, int y, int z) {
  if ((x >= z && x <= y) || (x >= y && x <= z))
    return x;
  else if ((y >= x && y <= z) || (y >= z && y <= x))
    return y;
  else
    return z;
}
```

In line 2, `(x >= z && x <= y)` checks the first possibility in the {ref}`Median Possibilities <median-possibilities>` figure above. This condition is OR-ed with the second possibility that makes `x` a median `(x >= y && x <= z)`.

In line $3$, the function will return the value of `x` if it is the median. This means further lines will never be executed. The same will happen if `y` is median in line $5$ and if `z` is median in line $7$. However, if your function is quite long and has several `return`s, it will be difficult to trace how many `return`s and debug the function if it has bugs.

Therefore, it is a good practice to have only one single `return` in a function. In our `median` function, we can re-write it by saving the value of the median in a variable and at the end of the function return the value of that variable. For example, we have one return in line 9 in the following code.

**Code snippet**
```{code-block} c
:linenos:
:emphasize-lines: 9
int median(int x, int y, int z) {
  int result = 0;
  if ((x >= z && x <= y) || (x >= y && x <= z))
    result = x;
  else if ((y >= x && y <= z) || (y >= z && y <= x))
    result = y;
  else
    result = z;
  return result;
}
```

What's left now is the main function that takes input from the user, calls median function and prints the median. Download {download}`median-function.c <../../code/chapter05/median-function/median-function.c>` if you want to run the program yourself. 

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="3 9" input="2 7 5"
output="Please enter three integers to find the median: <b>2 7 5</b>
The median is 5">
&#35;include &lt;stdio.h&gt;
<br>
int median(int, int, int);
<br>
int main(void) {
  int a, b, c;
  printf("Please enter three integers to find the median: ");
  scanf("%d %d %d", &a, &b, &c);
  printf("The median is %d\n", median(a, b, c));
  return 0;
}
<br>
int median(int x, int y, int z) {
  int result = 0;
  if ((x >= z && x <= y) || (x >= y && x <= z))
    result = x;
  else if ((y >= x && y <= z) || (y >= z && y <= x))
    result = y;
  else
    result = z;
  return result;
}
</code-runner>
</pre>

In line 3, there was no need to write the variable names of the three int arguments. Their types are enough.

In line 9, `median` is called with `a`, `b` and `c`, and in `median` the variables will be received in the same order, *i.e.* the value of `a` in main will be passed to `x`, `b` to `y` and `c` to `z`.

**Step 5: Test and debug the code.** You should make sure your code works with different input ranges, *i.e.* positive, negative and zero. Although you may believe it will work with all numbers, testing is the only way to make sure. So, I will test with all negative numbers ($-105$ $-28$ $-73$), some negative and positive and zero ($0$ $-101$ $98$), and many more. The code given should work in all these cases. 

If your program does not work, and it has many lines of code and many functions, it is difficult to find the errors. It is easier and faster to test each function separately. This method in testing is called **isolation**, where each function is tested in isolation. If I were to test the function `median` alone, I will copy it in another `.c` file and write a simple main function, where I call `median` with pre-set values. For example, in the following code we test `median` with several inputs. It is easier in this case to test `median` on many inputs, use the debugger without having to input numbers in the console, and quickly find which inputs cause issues. Download {download}`median-test.c <../../code/chapter05/median-test/median-test.c>` if you want to run the program yourself. 

**Code for testing only**
<pre class="code-runner-wrapper">
<code-runner language="c" output="The median of (-105, -28, -73) is -73
The median of (0, -101, 98) is 0
The median of (-101, -67, 0) is -67">
&#35;include &lt;stdio.h&gt;
<br>
int median(int, int, int);
<br>
int main(void) {
  printf("The median of (%d, %d, %d) is %d\n", -105, -28, -73, median(-105, -28, -73));
  printf("The median of (%d, %d, %d) is %d\n", 0, -101, 98, median(0, -101, 98));
  printf("The median of (%d, %d, %d) is %d\n", -101, -67, 0, median(-101, -67, 0));
  return 0;
}
<br>
int median(int x, int y, int z) {
  int result = 0;
  if ((x >= z && x <= y) || (x >= y && x <= z))
    result = x;
  else if ((y >= x && y <= z) || (y >= z && y <= x))
    result = y;
  else
    result = z;
  return result;
}
</code-runner>
</pre>

In lines $6$ -- $8$, we test median with three different inputs in the same code. 

**Step 6:  Debug the code.** If the desired output was not produced as you test in isolation, using the debugger will easily help you find the bug in your `median` function. Only if we are confident that `median` function is correct, now we can integrate it with the `main` function where we take input from the user or with other functions (if there are any).


{{quiz_embed | replace("%%FILENAME%%", "chapter-5/sec-4") }}