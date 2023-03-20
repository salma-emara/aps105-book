# Recursive functions by definition

Recursion is a method of solving a problem that requires first solving smaller instances of the same problem. In programming, recursion is when a function calls itself but **on a smaller problem/input.** 


## Euclidean Algorithm for Fining Greatest Common Divisor

There are problems that have a solution defined recursively. For example, the Euclidean algorithm for finding the greatest common divisor (GCD) of two numbers is defined recursively. The Euclidean algorithm is a method for finding the greatest common divisor of two numbers. The algorithm is based on the following observation: if `a` and `b` are two positive integers, then the greatest common divisor of `a` and `b` is the same as the greatest common divisor of `b` and `b - a`. 

Hence, the algorithm is as follows:

1. If `a > b`, then the greatest common divisor (GCD) of `a` and `b` is the GCD of `b - a` and `a`.
2. If `a` and `b` are equal, then the greatest common divisor of `a` and `b` is `a`.

Mathematically, the Euclidean algorithm is defined as follows:

```{figure} ./images/gcd-math.png
:alt: GCD of two numbers
:width: 600px
:align: center
:name: gcd-math

GCD of two numbers is defined recursively.
```

For example, the greatest common divisor of 20 and 8 is 4. To find the gcd using the formula above, $GCD(20, 8)$ $\rightarrow$ $GCD(8, 20 - 8 = 12)$ $\rightarrow$ $GCD(12, 8)$ $\rightarrow$ $GCD(8, 12 - 8 = 4)$ $\rightarrow$ $GCD(4, 8 - 4 = 4) = 4$. 

The Euclidean algorithm can be easily implemented recursively as follows:

**Code**
```{code-block} c
:linenos:
:emphasize-lines: 12, 13
#include <stdio.h>

int gcd(int a, int b);

int main(void) {
  int gcdAnswer = gcd(20, 8);
  printf("gcd(20, 8) = %d\n", gcdAnswer);
  return 0;
}

int gcd(int a, int b) {
  if (a == b) {
    return a;
  } else if (a > b) {
    return gcd(b, a - b);
  } else {
    return gcd(b, a);
  }
}
```

**What really happens when we call `gcd` function?** 

In-progress!
