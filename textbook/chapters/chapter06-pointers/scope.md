# Rules defining scope of variables

Given that now we understand the basics of the C programming language, especially loops, functions and pointers, we can discuss the topic of **"scope"** in details. The scope of a variable is the set of C statements where the variable is defined/visible/usable. In this section, we cover (revise) the cases where variables have limited scope.

## Variables can only be used after they are declared.

For example, the error you will get if you run the following code is "error: use of undeclared identifier 'i'".

```{figure} ./images/use-before-declare.png
:alt: Use i before declaring it.
:width: 200px
:name: use-before-declare
Using `i` variable before declaring it is not allowed, and will cause compile time error as `i` is undefined at `i = 1;` line.
```

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" output="(compile-time error)">
int main() {
  i = 0;
  int i;
<br>
  return 0;
}
</code-runner>
</pre>

Variables declared in a function, can only be used in that function. These variables are referred to as **local variables** or **internal identifiers**. 

For example, in {numref}`func-scope` and {numref}`main-scope`, we observe the scope of the variables start from the moment they get declared till only the end of the function, even the `main` function.

```{figure} ./images/scope-in-func.png
:alt: Scope of x and y in function func.
:width: 300px
:name: func-scope
The scope of `x` and `y` in `func` function starts from where they get declared till the end of the function.
```

```{figure} ./images/scope-in-main.png
:alt: Scope of x and y in function func.
:width: 250px
:name: main-scope
 The scope of `x` in `main` function starts from where it gets declared till the end of the function.
```


## Use a variable declared in a compound statement

If you declare a variable within `{}`, also referred as within a **compound statement**, and use the variable after the `}` closing bracket, it is undefined. In other words, the scope of a variable is defined only within the closest `{}`. For example, the following figure shows a code that uses a variable outside its scope, which is within `{}`.

```{figure} ./images/outside-compound-statement.png
:alt: Use x outside compound statement
:width: 600px
:name: outside-compound-statement
Using `x` variable outside the compound statement where it was declared. This causes a compile time error as `x` is undefined at line 10.
```

**Code causing compile-time error**
<pre class="code-runner-wrapper">
<code-runner language="c" output="(compile-time error)">
&#35;include &lt;stdio.h&gt;
int main() {
  int i = 0;
<br>
  {
    int x = 5;
    printf("Inside compound statement: x = %d.\n", x);
  }
  //  Causes compile-time error as x is undefined
  printf("Outside compound statement: x = %d.\n", x);
<br>
  return 0;
}
</code-runner>
</pre>

## External identifiers/global variables

The external identifiers or global variables are defined at the top of the `.c` file outside the main function, and all other functions. Its scope is the entire program. However, it is not good practice to use them, as it can be error-prone. If several functions in your program are using the global variable, and each function is changing it can be difficult to manage/track the value of this global variable. Hence, it is not advisable to use global variables.

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" output="In main: Global variable i = 0.
In func: Global variable i = 0.
In main after calling func: Global variable i = 5.">
&#35;include &lt;stdio.h&gt;
<br>
int i = 0;
<br>
void func();
<br>
int main(void) {
  printf("In main: Global variable i = %d.\n", i);
  func();
  printf("In main after calling func: Global variable i = %d.\n", i);
  return 0;
}
<br>
void func() {
  printf("In func: Global variable i = %d.\n", i);
  i = 5;
}
</code-runner>
</pre>

## Overlapping scope

You can have a variable with the same name that has an overlapping scope. For example, the following code has two `i` variables. Their scope is illustrated in the following figure.


```{figure} ./images/overlapping-scope.png
:alt: Scope of two variables named `i`.
:width: 600px
:name: overlapping-scope
The overlapping scope of two variables named `i`.
```

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" output="Outer i = 1.
Inner i = 2.
Outer i = 1.">
&#35;include &lt;stdio.h&gt;
<br>
int main(void) {
  int i = 1;
  printf("Outer i = %d.\n", i);
  {
    int i = 2;
    printf("Inner i = %d.\n", i);
  }
  printf("Outer i = %d.\n", i);
<br>
  return 0;
}
</code-runner>
</pre>


## Practice problem

In the following figure, we show the scope of different variables in a function. Check your knowledge looking at this figure.

```{figure} ./images/scope-variables-review.png
:alt: Scope of different variables in a function.
:width: 600px
:name: scope-variables-review
Scope of different variables in a function.
```

{{quiz_embed | replace("%%FILENAME%%", "chapter-6/sec-4") }}