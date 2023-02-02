# Rules defining scope of variables

Given that now we understand the basics of the C programming language, especially loops, functions and pointers, we can discuss the topic of **"scope"** in details. The scope of a variable is the set of C statements where the variable is defined/visible/usable. In this section, we cover (revise) the cases where variables have limited scope.

**Variables can only be used after they are declared.** For example, 
```{figure} ./images/use-before-declare.png
:alt: Use i before declaring it.
:width: 300px
:name: use-before-declare
Using `i` variable before declaring it is not allowed, and will cause compile time error as `i` is undefined at `i = 1;` line.
```

**Variables inside a function are only scoped within the function.** Variables declared in a function, can only be used in that function. These variables are referred to as **local variables**. 

For example, in {numref}`func-scope` and {numref}`main-scope`, we observe the scope of the variables start from the moment they get declared till only the end of the function, even the `main` function.

```{figure} ./images/scope-in-func.png
:alt: Scope of x and y in function func.
:width: 300px
:name: func-scope
The scope of `x` and `y` in `func` function starts from where they get declared till the end of the function.
```

```{figure} ./images/scope-in-main.png
:alt: Scope of x and y in function func.
:width: 300px
:name: main-scope
 The scope of `x` in `main` function starts from where it gets declared till the end of the function.
```

