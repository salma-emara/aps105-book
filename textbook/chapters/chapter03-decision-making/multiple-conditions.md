# Multiple Conditions

On top of our {download}`eligible-age.c <../../code/chapter03/eligible-age/eligible-age.c>` program, we want to check if a user's age is between `14` and `16`. If this is the case, the user is eligible to work only if it is not during school hours.

You may guess that we can write the condition as `(14 <= age <= 16)`. However, it is not permitted to have two relational operators on one operand. This is technically two conditions not one, as `(14 <= age <= 16)` translates to `(age <= 16)` and `(age >= 14)`. 

**How do we check for these multiple conditions?** We can use logical/boolean operators to combine multiple conditions. For example, "and" can be written as `&&`. Hence, `(14 <= age <= 16)` can be correctly written as `(age >= 14 && age <= 16)`. 

Back to extending our program! We can extend the block executed if the age is 14 or higher, which is the `else` block. There, we can check if the age is between 14 and 16. If it is, we need to print an extra warning message stating that it is only permissible to work outside of school hours. To extend our program, we write the highlighted code segment. 

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="10 11 12 13 14" input="15"
output="Enter your age: <b>15</b>
You are eligible to work only outside school hours.">
&#35;include &lt;stdio.h&gt;
int main(void) {
  int age = 0;
  printf("Enter your age: ");
  scanf("%d", &age);
<br>
  if (age < 14) {
    printf("You are not yet eligible to work.");
  } else {
    // Note! age >= 14 is redundant, in the following condition
    // since the else block will be executed only if age >= 14
    if (age >= 14 && age <= 16) {
      printf("You are eligible to work only outside school hours.");
    } else {
      printf("You are eligible to work.");
    }
  }
  return 0;
}
</code-runner>
</pre>

<!-- TODO: still under development? -->
```{warning}
The above code is still under development. In the {ref}`nested-if` section, it will look better.
```

## Logical/Boolean Operators
There are three logical operators: and $\rightarrow$ `&&`, or $\rightarrow$ `||`, and not $\rightarrow$ `!`. 

In the following table, `A` and `B` evaluate to `true` or `false`, *i.e.* are conditions or conditional expressions or boolean variables. The outcome of a logical operation between `A` and `B` is expressed in a truth table. The following table shows the truth table for the AND `&&` and OR `||` operator. 

|`A`     |`B`     | `A && B` | `A \|\| B` |
|:-------|:-------|-------:|-------:|
|`false` |`false` |`false` |`false` |
|`false` |`true`  |`false` |`true`  |
|`true`  |`false` |`false` |`true`  |
|`true`  |`true`  |`true`  |`true`  |

The following table shows the truth table for the NOT `!` operator. 

|`A`     |`!A`    |
|:-------|:-------|
|`false` |`true`  |
|`true`  |`false` |

In summary, AND requires both `A` and `B` to be `true` to be `true`. OR requires either `A` or `B` to be `true` to be `true`. NOT reverses the value of `A`.

**Exercise: OR operator**

For example, let's write a C code that checks if a character entered by the user is an upper case `'A'` or lower case `'a'`. If it is, we will print a prompt to the user saying so. Otherwise, we will print that it is not an `'A'` or `'a'`. Download {download}`upper-lowerA.c <../../code/chapter03/upper-lowerA/upper-lowerA.c>` to get the following code.

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="7" input="a"
output="Enter a letter: <b>a</b>
You entered an upper case or lower case A.">
&#35;include &lt;stdio.h&gt;
int main(void) {
  char letter = ' ';
  printf("Enter a letter: ");
  scanf("%c", &letter);
  <br>
  if (letter == 'A' || letter == 'a') {
    printf("You entered an upper case or lower case A.");
  } else {
    printf("You did not enter an upper case or lower case A.");
  }
  return 0;
}
</code-runner>
</pre>

**Exercise: NOT operator**

The NOT operator is typically used to reverse a condition, or create a more readable code. For example, `if (done == false)` can be written as `if (!done)`, where if `done` is `true`, the conditions are both `false` and vice versa.

Another example, let's write a C code that checks if the characters entered by the user is not an alphabet. **Note:** ASCII code of all *upper* case alphabets is smaller than *lower* case alphabets.

To write this condition, we need to think of the range of ASCII codes of alphabets. Alphabets have their ASCII codes between `'A'` and `'Z'` or between `'a'` and `'z'`. If the character is not between these two ranges, it is not an alphabet. Find the figure below for an illustration. 

```{figure} ./images/range-line.png
:alt: ASCII code range line
:class: with-shadow
:width: 400px
:align: center

ASCII code range of alphabets highlighted in blue.
```

One way is to write the condition for alphabets, as

`((letter >= 'A') && (letter <= 'Z')) || ((letter >= 'a') && (letter <= 'z'))` 

then negate it using `!`. This makes 

`!(((letter >= 'A') && (letter <= 'Z')) || ((letter >= 'a') && (letter <= 'z')))`.

Using the diagram above, you can also develop the condition as `(letter < 'A') || (letter > 'Z' && letter < 'a') || (letter > 'z')`. Both conditions are equivalent. However, the first one is easier to think of if you did not have a figure. Download {download}`not-alphabet.c <../../code/chapter03/not-alphabet/not-alphabet.c>` to get the following code checking if a character entered by the user is an alphabet.

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="7" input="$"
output="Enter an alphabet letter: <b>$</b>
You didn't enter an alphabet.">
&#35;include &lt;stdio.h&gt;
int main(void) {
  char letter = ' ';
  printf("Enter an alphabet letter: ");
  scanf("%c", &letter);
  <br>
  if (!(((letter >= 'A') && (letter <= 'Z')) ||
        ((letter >= 'a') && (letter <= 'z')))) {
    printf("You didn't enter an alphabet.");
  }
  return 0;
}
</code-runner>
</pre>

```{admonition} NOT *!* vs. NOT EQUAL *!=*
`!` is a logical operator. It is not to be confused with a relational operator `!=`.

`!` is to be placed before a condition that is either `true` or `false`. For example, `!(x > 5)` is valid and it is `true` is `x` is not greater than `5`. 

While `!=` compares two values and returns `true` if they are not equal. For example, `(x != 5)` is valid and it is `true` is `x` is not equal to `5`. 
```

(lazy-evaluation)=
### Lazy Evaluation

For example, you may have a condition that checks if `x % y < 10`. As you know from {ref}`zero-division` and {ref}`modulo-operator`, if `y` is `0`, the program's behavior is undefined. Hence, your program needs to check if `y` is `0` before checking `x % y < 10`.

*One way to do this* is to check if `y` is `0` first, and then check `x % y < 10` if `y` is not `0`. This is called **nested-if**. The code snippet below shows how to do this.

```
if (y != 0) {
  if (x % y < 10) {
    // do something
  }
}
```

Another way is to make use of **lazy evaluation**. For example, the following code snippet is equivalent to the previous nested-if above.

```
if (y != 0 && x % y < 10) {
  // do something
}
```

Lazy evaluation is a technique that allows you to combine multiple conditions into one. The condition is evaluated from left to right. In this case, `y != 0` would be evaluated **first**, if it is `false`, the whole condition is `false` since the logical operator is `&&`. The program will not evaluate the second condition `x % y < 10`. If `y != 0` is `true`, the program will evaluate the second condition `x % y < 10`.

Lazy evaluation is useful when you have multiple conditions that are related to each other. The rule in lazy evalution is:

1. **\<LHS\>** `||` **\<RHS\>**: the *\<LHS\>* will be evluated first, if `true`, the whole condition is `true` and the program will not evaluate the *\<RHS\>*. If *\<LHS\>* is `false`, the program will evaluate the *\<RHS\>*.
2. **\<LHS\>** `&&` **\<RHS\>**: the *\<LHS\>* will be evaluated first, if `false`, the whole condition is `false` and the program will not evaluate the *\<RHS\>*. If *\<LHS\>* is `true`, the program will evaluate the *\<RHS\>*.

### De Morgan's Law

De Morgan's Law is a rule that can be used to simplify a condition with logical operators. It is named after Augustus De Morgan, a British mathematician. 

For example, we have a C program with two variables `x` and `y`. Both `x` and `y` are used in a condition that is very difficult to read and understand in the following code snippet.

```
if (!((x > 10) && (y < 5))) {
  // do something
}
```

De-Morgan's Law can be used to simplify the condition. If `A` and `B` are conditional expressions that evaluate to either `true` or `false`, the rule is as follows:

1. `!(A && B)` is equivalent to `!A || !B`
2. `!(A || B)` is equivalent to `!A && !B`

That is if there is a NOT operator outside, you can negate the two conditions inside and combine them with the logical operator that is AND, if it were an OR originally, or OR, if it were an AND originally.

In this case, the condition `!((x > 10) && (y < 5))` can be simplified by removing the `!` outside the brackets, having `x > 10` negated and `y < 5` negated, and combining the two negated conditions with `||` instead of `&&`. That is,

`!(x > 10) || !(y < 5)`

Then, we can get rid of the `!` outside the brackets by getting the opposite of the condition of the two expressions inside the parentheses. The opposite of the relational expressions are shown in the table below.

|Relational operator|Negation|
|:---:|:---:|
|`>`|`<=`|
|`>=`|`<`|
|`==`|`!=`|

This makes `!(x > 10)` $\rightarrow$ `(x <= 10)` and `!(y < 5)` $\rightarrow$ `(y >= 5)`. The final expression then would be `(x <= 10 || (y >= 5))`. Steps to simplify the condition are shown in the following diagram.

```{figure} ./images/de-morgans-law-example.png
:alt: De Morgan's Law example
:class: with-shadow
:width: 800px
:align: center

Steps to simplify a condition using De Morgan's Law.
```

## Summary of Precedence with relational and logical operators

1. `()`
2. `!` `(<type>)` `sizeof()` `++` or `--` (but we will avoid using `++` or `--` with other operators)
3. `*` `/` `%`
4. `+` `-`
5. `<` `<=` `>` `>=`
6. `==` `!=`
7. `&&`
8. `||`
   
   (2--8) if two operands with same precedence occur, they are evaluated from left to right (left-associative).
9. `=` `+=` `-=` `*=` `/=` `%=`
   
   (9) if two operands with same precedence occur, they are evaluated from right to left (right-associative).

````{admonition} Common mistake in precedence!
:class: important
Since `!` has higher precedence than relational operators, `!(x > 10)` is not equivalent to `!x > 10`. In `!x > 10`, `!x` is to be evaluated first, then `(!x) > 10`. If `x` was 5, `!x` would be `false` as 5 is a non-zero number which is `true` as a condition. `!x` would be `false`, which is equivalent to 0. `0 > 10` would evaluate to `false` as well. Hence, the condition `!x > 10` is always `false` if `x` has non-zero number. The logic is illustrated in the following figure.

```{figure} ./images/not-precedence-example.png
:alt: Not precedence example
:class: with-shadow
:width: 800px
:align: center

NOT `!` precedence example.
```

While in `!(x > 10)`, if `x` is 5, `!(x > 10)` would be `!(false)` which is `true`. 

Clearly, `!(x > 10)` is not equivalent to `!x > 10`. A programmer needs to make sure enough parentheses are used to avoid such mistakes.

````

{{quiz_embed | replace("%%FILENAME%%", "chapter-3/sec-2") }}