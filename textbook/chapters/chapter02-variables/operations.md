# Operations

Given that we have four main data types -- `int`, `double`, `char`, `bool`, we will discuss what can we do with the variables of these data types. 

(operations)=
## Basic arithmetic operations

We can perform arithmetic operations on variables. These operations include addition `+`, subtraction `-`, multiplication `*`, division `/`, and modulus `%`.

**Precedence rule.** In math, the precedence rule was summarized in BEDMAS (Brackets `()`, Exponents $a^2$, Division `/`, Multiplication `*`, Addition `+`, Subtraction `-`). The precedence rule in C is:

1. `()`
2. `*` `/` `%`
3. `+` `-` 
4. left to right if operators have same precedence, referred to as *left-associative*

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

The evaluation order is from left to right (left-associative), since `/` and `*` have the same precedence. The value stored in `x` is `4` because `10 / 5` is evaluated first, followed by `2 * 2`.

(contagious)=
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

(zero-division)=
## What happens when we divide by 0?

In math, the result of dividing a number by 0 is undefined. What would undefined mean if a program divides a number by 0? If we were to divide an **int 3 by int 0**, e.g. `3/0`, the compiler may or may not successfully compile your code.

The trickiest part is that if your program compiles and you run it, the result of the division is undefined. Some computers may yield a *weird* number resulting from this *illegal* division. Hence, it is important to check if the denominator is 0 before you divide.

On the other hand, dividing by 0 in a float division, e.g. `3.0/0`, may yield `inf`. Download 
{download}`zeroDivision.c <../../code/chapter2/divideByzero/zeroDivision.c>` to try the following code on your computer.

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" output="">
&#35;include &lt;stdio.h&gt;
<br>
int main(void) {
  printf("Integer 0 division %d\n", 3 / 0);
  printf("Floating point zero division %lf\n", 3.0 / 0);
  return 0;
}
</code-runner>
</pre>
<!-- **Output**
<pre>
Integer 0 division -1180252136
Floating point zero division inf
</pre> -->

(modulo-operator)=
## Modulo operator

Remember whenever we divide two numbers, we have a quotient and a remainder. For example, $10/3$ has a quotient of $3$ with a remainder $1$. Hence, $\frac{10}{3}$ can be written as a mixed fraction: $3 \frac{1}{3}$. 

The modulo operator `%` gives us the remainder of a division between two integers. 

**Examples**

1. `10 % 3` $\rightarrow$ `1`
2. `10 % 4` $\rightarrow$ `2`
3. `50 % 10` $\rightarrow$ `0`
4. `55 % 10` $\rightarrow$ `5`

Some people find it mentally challenging to find the `%` quickly. For example, in `10 % 3`, find the largest number divisible by `3` that is less than `10`. In this case, it is `9`. Hence, `10 - 9 = 1`. `1` is the answer.



````{admonition} Remember!
:class: tip
The remainder can only be between `0` and `denominator - 1`.

**Try it!**

0 % 4 = ?

1 % 4 = ?

2 % 4 = ?

3 % 4 = ?

4 % 4 = ?

5 % 4 = ?

6 % 4 = ?

⋮
```{admonition} Answer
:class: dropdown

0 % 4 = 0

1 % 4 = 1

2 % 4 = 2

3 % 4 = 3

4 % 4 = 0

5 % 4 = 1

6 % 4 = 2

⋮
```
````

````{admonition} Important
:class: important
What would `3 % 0` be? 

It would have a similar behavior to `3 / 0`. There will be a compile-time warning, and a run-time undefined behavior.
````

(assignment-operator)=
## Assignment operators

The assignment operator (`=`, `+=`, `-=`, `*=`, `/=`, `%=`) assigns an evaluation/value to a variable. For example, in `int x = 7 + 3;` the `=` assigns the value of `7 + 3` to `x`. **The precedence of assignment operators is *after* the other BEDMAS operators.**

Other assignment operators such as `+=`, `-=`, `*=`, `/=`, `%=` mean that the variable is assigned to the variable plus/minus/multiplied/divided/modulo the value on the right. For example, `x += 3` is equivalent to `x = x + 3` and `x %= 10` is equivalent to `x = x % 10`. 

**Tricky!** If we have `x *= 3 + 2`, it is equivalent to `x = x * 5`. This implies that the BEDMAS operators are evaluated before the assignment operators.

As discussed earlier in {ref}`operations`, BEDMAS operators if they have the same precedence, they are evaluated from left to right (left-associative). Assignment operators are the **opposite**, from right to left (right-associative). This means that `x = y = z` is equivalent to `x = (y = z)`. Here, `y = z` is evaluated first, it returns the value of `y`, then the value of `y` is assigned to `x`. An example code is shown below. 

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" output="i = 10, j = 10, k = 10">
&#35;include &lt;stdio.h&gt;
<br>
int main(void) {
  int i = 1, j = 3, k = 10;
  i = j = k;  // first the value of k is assigned to j, 
              // then the value of j is assigned to i
  printf("i = %d, j = %d, k = %d\n", i, j, k);
  return 0;
}
</code-runner>
</pre>

<!-- **Output**
<pre>
i = 10, j = 10, k = 10
</pre> -->

However, for readability and to be able to easily spot bugs, we suggest having fewer operations in one line.

## Increment and decrement operators

If we have `i = i + 1;`, this can be written as `i += 1;`, `i++;` and `++i;`. Similarly, `i -= 1;`, `i--;` and `--i;` are equivalent to `i = i - 1;`. `++` and `--` are increment and decrement operators. They increment/decrement the value of the variable by 1.

***AVOID USING `++` AND `--` IN A COMPLEX EXPRESSION!***

`++` AND `--` can be before or after the variable. For example, `++i` and `i++` are pre-increment and post-increment respectively. `++i` and `i++` are equivalent to `i = i + 1;` if they are the only operators in the same statement. However, if there are other operators in the same statement, they are not equivalent. 

For example, in the following example `++i` is pre-fix, i.e. incrementing happens in the statement. Hence, `j = ++i;` is equivalent to `j = i = i + 1;`. Evaluation is from right to left because of the assignment operator. While, `i++` is post-fix, i.e. incrementing to `i` happens after the statement. This means that `j = i++;` is equivalent to `j = i; i = i + 1;`. You can download the code {download}`prefix-postfix.c <../../code/chapter2/prefix-postfix/prefix-postfix.c>` to try the following code.


**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" output="With prefix: i = 2, j = 2
With postfix: i = 2, j = 1">
&#35;include &lt;stdio.h&gt;
int main(void) {
  int i = 1, j = 31;
  j = ++i;  // Equivalent to j = i = i + 1;
  printf("With prefix: i = %d, j = %d\n", i, j);
<br>
  i = 1, j = 31;
  j = i++; //Equivalent to j = i; i = i + 1;
  printf("With postfix: i = %d, j = %d\n", i, j);
  return 0;
}
</code-runner>
</pre>

<!-- **Output**
<pre>
With prefix: i = 2, j = 2
With postfix: i = 2, j = 1
</pre> -->

It is confusing when the increment/decrement operator is used with other operators. Consequently, it is best to avoid using `++` and `--` in a complex expression -- with other operators.

(type-cast)=
## Type casting

We mentioned earlier, the most accurate data type is contagious. In some cases, you may want to force a data type on an operand. For example, in `double x = 3/ 2;`, to have `x` store `1.5`, you can change 3 to double by changing it to 3.0 as in `double x = 3.0/ 2;`. The other way is to type cast 3 like `double x = (double) 3 / 2;`. This is called type casting. This changes the data type of 3 to double.

Another example, in `double x = 3/ 2.9;`, you may want to force `2.9` to be `int`. You can do this by `double x = 3/ (int) 2.9;`. This will store `1.0` in `x`.

The type casting operator is `(` and `)`. The data type is placed in between the brackets. For example, `(int) 3.9` will evaluate as `3`. `(double) 3` will evaluate as `3.0`.

## `sizeof()` operator

`sizeof(<data type>)` is an operator that evaluates the number of bytes required to store a data type on the operating computer. For example, `sizeof(int)` will evaluate as `4`, `sizeof(double)` will evaluate as `8`, and `sizeof(char)` will evaluate as `1` on my personal computer.

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" output="Number of bytes to store 5 int and 2 double is 36">
&#35;include &lt;stdio.h&gt;
<br>
int main(void){
  printf("Number of bytes to store 5 int and 2 double is %d\n", 
   5 * sizeof(int) + 2 * sizeof(double)); // 5 * 4 + 2 * 8 = 36
  return 0;
}
</code-runner>
</pre>

## Summary of Precedence

1. `()`
2. `(<type>)` `sizeof()` `++` or `--` (but we will avoid using `++` or `--` with other operators)
3. `*` `/` `%`
4. `+` `-`
   
   (2--4) if two operands with same precedence occur, they are evaluated from left to right (left-associative).
5. `=` `+=` `-=` `*=` `/=` `%=`
   
   (5) if two operands with same precedence occur, they are evaluated from right to left (right-associative).

{{quiz_embed | replace("%%FILENAME%%", "chapter-2/sec-3") }}