(variable-scope)=
# Variable scope

In the previous section, we found that we created a new variable `n` in `factorial` function to take in the value of `number` from the `main` function. This is because we cannot access `number` inside `factorial` function. Likewise, `n` cannot be accessed in the `main` function. We say the scope of `number` is within the main function, and the scope of `n` is `factorial` function.

This is similar to what we discussed in for loops in {ref}`scope-for-loop`. We said that the following would cause a compile-time error, since `count` is declared inside the loop and is undefined outside the loop. The scope of `count` is only in the for loop.

**Code snippet causing compile-time error at line $4$**
```{code-block} c
:linenos:
:emphasize-lines: 4
for (int count = 1; count <= n; count++) {
  printf("*");
}
count = 10;  // undefined variable
```

Similarly, variables inside a function cannot be accessed outside a function, even if they have similar names. For example, in the following code, the `main` function has a variable `n`, and it calls `divideByTwo` function by transferring the **value** of `n`. This is called "call by value", as we call to transfer only the value of `n`. Inside `divideByTwo` function, another variable `n` is created, that is totally different from `n` in the `main` function. Download {download}`divideByTwo.c <../../code/chapter05/divideByTwo/divideByTwo.c>` if you want to run the program yourself.

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c">

&#35;include &lt;stdio.h&gt;
<br>
double divideByTwo(double);
<br>
int main(void) {
  double n = 4.2, result;
  result = divideByTwo(n);
  return 0;
}
<br>
double divideByTwo(double n) {
  n = n / 2;
  return n;
}
</code-runner>
</pre>

To understand how variables from another function cannot be accessed and how "call by value" works under the hood, we look into how the variables of each function is stored in the main memory. The following video will execute the program one line at a time, and explain what happens in the main memory.

{{ video_embed | replace("%%VID%%", "S32rqCAgOsQ")}}

{{quiz_embed | replace("%%FILENAME%%", "chapter-5/sec-3") }}