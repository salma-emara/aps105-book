# Operations

Given that we have four main data types -- `int`, `double`, `char`, `bool`, we will discuss what can we do with the variables of these data types. 

## Basic arithmetic operations

We can perform arithmetic operations on variables. These operations include addition `+`, subtraction `-`, multiplication `*`, division `/`, and modulus `%`.

**Precedence rule.** In math, the precedence rule was summarized in BEDMAS (Brackets `()`, Exponents $a^2$, Division `/`, Multiplication `*`, Addition `+`, Subtraction `-`). The precedence rule in C is:

1. `()`
2. `*` `/` `%`
3. `+` `-` 
4. left to right if operators have same precedence

**Example I**

```c {.line-numbers}
int x = 10 * 2 + 3;
```

The value stored in `x` is `23` because `10 * 2` is evaluated first, followed by `20 + 3`.

**Example II**

```c {.line-numbers}
int x = 10 * (2 + 3);
```

The value stored in `x` is `50` because `(2 + 3)` is evaluated first, followed by `10 * 5`.

**Example III**

```c {.line-numbers}
int x = 10 / 5 * 2;
```

The evaluation order is from left to right, since `/` and `*` ave the same precedence. The value stored in `x` is `4` because `10 / 5` is evaluated first, followed by `2 * 2`.

## The more accurate data type is contagious

**Example IV**

```c {.line-numbers}
int x = 10 * 5 / 3;
```

Evaluating from left to right, we have `50 / 3`, which is mathematically `16.6666667`. However, `50` is `int`, and `3` is `int`. Is it consistent that `50 / 3` evaluation yields a double? NO! In C, the result of an arithmetic operation is always the data type of the operand that is more accurate. In the case of `50 / 3`, both data types are `int`. Hence, the resulting data type is `int`, with truncated decimal places, i.e. `16`. The value **stored** in `x` is `16`.

**Example V**

```c {.line-numbers}
double x = 50 / 3.0;
```

If we have one (or both) of the operands as `double`, the result will be `double`. For example, `50 / 3.0` is now `16.6666667` as `3.0` is `double`. The value stored in `x` is `16.6666667`.

```{admonition} Important
:class: important

We learned before in {ref}`Think! <float-in-int>`, if a floating point number is stored in `int`, the decimal part will be truncated. This means that in `int x = 50 / 3.0;`, even if `50 / 3.0` is evaluated to 16.6666667, `x` will have to truncate 16.6666667 to 16. This is because `x` is `int`. Hence, `x` stores `16`. 

```

**More examples**

1. `int x = 1 / 5;`
   * `1 / 5` is mathematically $0.2$. Since `1` and `5` are `int`s, $0.2$ would be truncated to `0`. This makes the result of `1 / 5` $\rightarrow$ `0`. `x` stores `0`. 
2. `double x = 10 / 4;` 
   * `10 / 4` $\rightarrow$ `2`. `x` stores `2.0000`.
3. `int x = 3 / -2` 
   * `3 / -2` $\rightarrow$ `-1`. `x` stores `-1`.
4. `double x = 4.2 / 2;`
   * `4.2 / 2` $\rightarrow$ `2.1`. `x` stores `2.1000`.
5. `int x = 10.6 / 3;`
   * `10.6 / 3` $\rightarrow$ `3.5333...`. `x` stores `3`.
6. `double x = 9 + 6.3;`
   * `9 + 6.3` $\rightarrow$ `15.3`. `x` stores `15.30000`.

## What happens when we divide by 0?

`3/0`


`3.0/0`
This result is inf, which is infinity.

## Modulo operator

## Assignment operator

## Increment and decrement operators

## Type casting