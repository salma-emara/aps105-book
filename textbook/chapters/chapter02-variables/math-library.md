# Math library

In the previous section, we study simple arithmetic operations. Operations can in real life will indeed require more complicated operations, such as finding the  logarithm of a number. In this section, we will learn about a math library that provides us access to complicated operations, such as $\log$, $\tan$, $\sin$, $\cos$ and many more.

# Complicated math operations

For example, we want to get the hypotenuse of a right-angled triangle with sides $a$ and $b$. The hypotenuse is the longest side of the right-angled triangle. The hypotenuse is given by the formula: $c = \sqrt{a^2 + b^2}$. Since, a square root is a complicated operation, we use the math library to get the square root of a number. 

We use `sqrt` function to get the square root of a number. A function has inputs and outputs. `sqrt` has input or receives a `double` and has output or returns the square root of the input in `double` type, as shown in the following figure. We can also say `double sqrt(double x)` to represent the input as `double` (between brackets), and output as `double`, written before `sqrt`.

```{figure} ./images/sqrt.png
:alt: sqrt function
:class: with-shadow
:width: 400px
:align: center

`sqrt` function in math library with prototype `double sqrt(double x)`
```

Line 1 includes the math library, without which we can not use math library functions. Line 10 in the following code uses `sqrt` function to get the square root of $a^2 + b^2$. Download {download}`hypotenuse.c <../../code/chapter2/hypotenuse/hypotenuse.c>` to get the following code.

**Code**
```{code-block} c
:caption: Getting the hypotenuse of a right-angled triangle
:emphasize-lines: 1, 10
:linenos:
#include <math.h>
#include <stdio.h>

int main(void) {
  double a = 0, b = 0, c = 0;
  printf("Enter the length of the first side: ");
  scanf("%lf", &a);
  printf("Enter the length of the second side: ");
  scanf("%lf", &b);

  c = sqrt(a * a + b * b);
  printf("The length of the hypotenuse is %.2lf\n", c);
  return 0;
}
```

**Output[^1]**
<pre>
Enter the length of the first side: <b>2.5</b>
Enter the length of the second side: <b>4.1</b>
The length of the hypotenuse is 4.80
</pre>
    
````{admonition} Want fewer lines? You can also write the above code in fewer lines as shown below.
**Code**
```{code-block} c
:emphasize-lines: 7
:linenos:
#include <math.h>
#include <stdio.h>

int main(void) {
    double a = 0, b = 0, c = 0;
    printf("Enter the lengths of the sides: ");
    scanf("%lf %lf", &a, &b);

    c = sqrt(a * a + b * b);
    printf("The length of the hypotenuse is %.2lf\n", c);
    return 0;
}
```

**Output**
<pre>
Enter the lengths of the sides: <b>2.5 4.1</b>
The length of the hypotenuse is 4.80
</pre>

Line 7 shows us how can `scanf` allow entry of more than one variable at a time. This is given that the inputs are separated using a space, return or tab. For example, 2.5 ad 4.1 were separated using a space. The space, return or tab are called **delimiters** when they specify boundaries between separate values.
````

## You can still use integer values

You can use `sqrt` in the following use cases:

1. It can accept an `int` too. In line 4 in the following code, implicit type conversion from `int` `2` to `double` `2.0` will occur. The output will be `Square root of 2 is 1.41`.

**Code** 
```{code-block} c
:linenos:
:emphasize-lines: 4
#include <math.h>
#include <stdio.h>
int main(void){
    printf("Square root of 2 is %.2lf\n", sqrt(2));
    return 0;
}
```

1. The output can be stored in an `int` too. In line 4 in the following example, the value returned from `sqrt(3.0)` -- 1.73205... -- will be truncated and stored in `val` as `1`.

**Code** 
```{code-block} c
:linenos:
:emphasize-lines: 4
#include <math.h>
#include <stdio.h>
int main(void){
    int val = sqrt(3.0);
    return 0;
}
```

## Other math library functions

Some of the relevant math library functions are listed below.

| Mathematical notation | Function Prototype | Example |
| :-------: | :------------------: | :-----------------: |
|$\sqrt{x}$| `double sqrt(double x);`|`sqrt(4)` returns `2.0`|
|$x^y$     | `double pow(double x, double y);`|`pow(2, 3)` returns `8.0`|
|$e^x$     |`double exp(double x);`|`exp(1)` returns `2.718281828459045`|
|$\log_{10}x$| `double log10(double x);`|`log10(100)` returns `2.0`|
|$\ln(x)$  | `double log(double x);`|`log(M_E)`[^2] returns `1`|
|$\mid x \mid$|`double fabs(double x);`|`fabs(-2)` returns `2`|
|$\sin(x)$|`double sin(double x);`|`sin(M_PI * 2)`[^3] returns `0`|
|$\cos(x)$|`double cos(double x);`|`cos(M_PI * 2)`[^3] returns `-1`|
|$\tan(x)$|`double tan(double x);`|`tan(M_PI)`[^3] returns `0`|

```{admonition} Important!
In `sin(x)`, `cos(x)`, `tan(x)` and other math library functions that take angle as input, it assumes the angle `x` is in radians not degree.  
```


[^1]: Inputs to programs are in **bold**.
[^2]: `M_E` is a constant defined in math library, denoting the value of $\exp$. It is approximately equal to 2.718281828... 
[^3]: `M_PI` is a constant defined in math library, denoting the value of $\pi$. It is approximately equal to 3.14159...