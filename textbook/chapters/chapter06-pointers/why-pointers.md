# Why do we need pointers?

In the previous chapter, we discussed one way to communicate with a function. This was through passing several arguments and only get one value in return. In this section, we discuss why is this a problem.

## Communicate from a function using _return_

We can communicate from a function by returning a value. For example, in the following code, we have a function named `isPerfectSquare` that checks if the value in `x` is a perfect square. A perfect square is a number resulted from a *rational* number multiplied by itself. A rational number is a whole number, without a fractional part. $1$, $4$ and $25$ are all examples of perfect squares as they are a result of $1 = 1 \times 1$, $4 = 2 \times 2$ and $25 = 5 \times 5$. To check if `x` is a perfect square, the function `isPerfectSquare` checks that the integer part of the square root of `x` is the same as the square root of `x`. This would mean that $\sqrt{x}$ has no fractional part. `isPerfectSquare` would return either yes or no depending on if `x` is a perfect square.

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" input="36" output="Enter a number:<b>36</b>
36 is a perfect square">
&#35;include &lt;math.h&gt;
&#35;include &lt;stdbool.h&gt;
&#35;include &lt;stdio.h&gt;
<br>
bool isPerfectSquare(int);
<br>
int main(void) {
  int num;
  printf("Enter a number:");
  scanf("%d", &num);
<br>
  if (isPerfectSquare(num)) {
    printf("%d is a perfect square\n", num);
  } else {
    printf("%d is NOT a perfect square\n", num);
  }
  return 0;
}
<br>
bool isPerfectSquare(int x) {
  if ((int)sqrt(x) != sqrt(x)) {
    return false;
  } else {
    return true;
  }
}
</code-runner>
</pre>

````{admonition} Improvement!
Multiple returns in one function is not neat! As you develop your code with if-statements, you may mistakenly forget to consider a condition where you had to return a value. To avoid such issues, we suggest that you have one return statement that is not part of any loop or if-statement. This is to ensure that it will be definitely executed and the function will return a value. 

For example, we can re-write `isPerfectSquare` function as follows, where it returns `true` if the int part of `sqrt(x)` is equal to `sqrt(x)`, *i.e.* there is no fractional number resulting from `sqrt(x)`, and returns `false` otherwise. Download {download}`perfect-square.c <../../code/chapter06/perfect-square/perfect-square.c>` if you want to run the program yourself.

**Code snippet**
```{code-block} c
bool isPerfectSquare(int x) { 
    return ((int)sqrt(x) == sqrt(x)); 
}
```
````

Another important usage of **return** is that we pass value to function by **calling by value**. Recall when we previously discussed {ref}`Call by value<variable-scope>`, whenever a parameter is passed to a function, a copy of the value is sent to the function not the variable itself. This means that whatever change happens to the value passed to the function, it wouldn't affect the variables in the caller function. For example, in the following simple code, even though `p` is changed in `simple` function, the value of `p` in `main` remains `12`. For details on why `p` in `main` function does not change refer to {ref}`Call by value<variable-scope>`.

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" input="36" output="The value of p is 12.">
&#35;include &lt;stdio.h&gt;
<br>
void simple(int);
<br>
int main(void) {
  int p = 12;
  simple(p);
  printf("The value of p is %d.\n", p);
  return 0;
}
<br>
void simple(int p) { 
  p = p / 2; 
}
</code-runner>
</pre>

If we want to pass the value of `p` in `simple` function after dividing it by $2$, we have to **return** `p` from `simple` function. For example, the following code highlights the lines we changed to return the value of `p` in `simple` function.

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" output="The value of p is 6." highlight-lines="3 7 12 14">
&#35;include &lt;stdio.h&gt;
<br>
int simple(int);
<br>
int main(void) {
  int p = 12;
  p = simple(p);
  printf("The value of p is %d.\n", p);
  return 0;
}
<br>
int simple(int p) { 
  p = p / 2; 
  return p;
}
</code-runner>
</pre>

## Limitation of being only allowed to _return one value_

The problem happens when we want to communicate two or more values to the caller function. We cannot do so because we can only **return** one value, and **calling by value** only allows passing the values of the variables not the variables themselves. Hence, any change in the variables inside the function, it is only visible inside the function. 

Is there a case where we need to communicate to the caller function two or more variables? Yes! For example, let's write a function that takes in two `int` variables and swaps them. 

**How can we swap the values in assigned to two variables, `x` and `y`?** 

**Step 1** We can store the value of `x` in a temporary variable

**Step 2** Change `x` with the value of `y`

**Step 3** Then assign `y` the value of the temporary variable

The following image helps in understanding what happens in the `swap` function.

```{figure} ./images/swap-steps.png
:alt: Image showing the steps of swapping two variables
:width: 700px
:align: center
:name: swap-steps

The steps of swapping two variables, `x` and `y`.
```

The following video traces the code that swaps two variables in a function. Unfortunately, as you will see in the video the values of `a` and `b` were not swapped after the function call. This is because we are swapping the variables in the `swap` function, not the main function. 

{{ video_embed | replace("%%VID%%", "tJ2G83fgBF8")}}

The code discussed in the video is available below. 

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="9" output="Before swapping
Value of a: 9
Value of b: 13
After swapping
Value of a: 9
Value of b: 13">
&#35;include &lt;stdio.h&gt;
<br>
void swap(int, int);
<br>
int main(void) {
  int a = 9, b = 13;
  printf("Before swapping\nValue of a: %d\nValue of b: %d\n", a, b);
  swap(a, b);
  printf("After swapping\nValue of a: %d\nValue of b: %d\n", a, b);
<br>
  return 0;
}
<br>
void swap(int x, int y) {
  int temp = x;
  x = y;
  y = temp;
}
</code-runner>
</pre>

**Solution!!** Instead of passing just the values of `a` and `b`, we can pass the addresses of `a` and `b` in the `main` function memory space in the main memory. This way any changes to `a` and `b` in `swap` function happens in `main` function too. This is possible if we use **pointers**. This is what we discuss in the next section.

{{quiz_embed | replace("%%FILENAME%%", "chapter-6/sec-1") }}