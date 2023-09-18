# If-statements

Let's develop a decision-making program! We want to develop a program that prompts the user to enter their age. If it was below the legal age to work in Ontario, Canada, the program prints "You are not yet eligible to work in Ontario.", else it prints "You are eligible to work in Ontario."

In C, we use the `if` statement to make decisions. The `if` statement is a conditional statement that executes a block of code if a condition is `true`. The syntax of the `if` statement is as follows:

```{code-block} c
if (condition) {
  // code to execute if condition is true
}
```

If we want to execute **another** block of code if the condition is `false`. We can have an `else` to the `if`-statement. The syntax of the `if-else` statement is as follows:

```{code-block} c
if (condition) {
  // code to execute if condition is true
} else {
  // code to execute if condition is false
}
```

## What can this `condition` be?

1. The `condition` can be a `bool` variable. Recall `bool` variable takes either a `true` or `false` value. **Note:** if the `bool` variable is `false`, the `true` block of code will never be executed. If the `bool` variable is `true`, the `false` block of code will never be executed.
    
    **Code**
    {{code_runner_header}}
    <pre class="code-runner-wrapper">
    <code-runner language="c" 
    output="The flag is true.">
    &#35;include &lt;stdbool.h&gt;
   &#35;include &lt;stdio.h&gt;
    <br>
   int main(void) {
     bool flag = true;
     if (flag) {
       printf("The flag is true.");
     } else {
       printf("The flag is false.");
     }
     return 0;
   }
    </code-runner>
    </pre>
    
2. The `condition` can be a numerical value. Recall that `true` is stored as `1`, and `false` is stored as `0` as we discussed in {ref}`bool-variable` section. To be more accurate, C is only strict in the representing `false` as 0. While `true` can be any non-zero number. *In other words, any *non-zero* value in the condition makes the condition `true`. While a *zero* value in the condition makes the condition `false`.*

    **Code**
    <pre class="code-runner-wrapper">
    <code-runner language="c" 
    output="The condition is true.">
    &#35;include &lt;stdio.h&gt;
    <br>
   int main(void) {
     if (3) {
       printf("The condition is true.");
     } else {
       printf("The condition is false.");
     }
     return 0;
   }
    </code-runner>
    </pre>

3. The `condition` can be a "relational expression" that evaluates to `true` or `false`. Relational expressions have relational operators summarized in the table below.
    | Relational Operator | Meaning |
    |----------|---------|
    | `==`     | Equal to |
    | `!=`     | Not equal to |
    | `<`      | Less than |
    | `>`      | Greater than |
    | `<=`     | Less than or equal to |
    | `>=`     | Greater than or equal to |

    For example, the code below is a program that prompts the user if they are eligible to work in Ontario, based on their age. Download {download}`eligible-age.c <../../code/chapter03/eligible-age/eligible-age.c>` to get the following code.

    **Code**
    <pre class="code-runner-wrapper">
    <code-runner language="c" input="13"
    highlight-lines="7" output="Enter your age: <b>13</b>
    You are not yet eligible to work in Ontario.">
    &#35;include &lt;stdio.h&gt;
   int main(void) {
     int age = 0;
     printf("Enter your age: ");
     scanf("%d", &age);
     <br>
     if (age < 14) {  // Condition checking if age is less than 14
       printf("You are not yet eligible to work in Ontario.");
     } else {
       printf("You are eligible to work in Ontario.");
     }
     return 0;
   }
    </code-runner>
    </pre>

    Another example, let's write a program in C that identifies if a shape is rectangle or square based on the two sides given by the user. Download {download}`square-rectangle.c <../../code/chapter03/square-rectangle/square-rectangle.c>` to get the following code.

    **Code**
    <pre class="code-runner-wrapper">
    <code-runner language="c" input="5 5"
    highlight-lines="7" output="Please enter the height and width of your shape: <b>5 5</b>
    The shape is a square.">
    &#35;include &lt;stdio.h&gt;
   int main(void) {
     int height = 0, width = 0;
     printf("Please enter the height and width of your shape: ");
     scanf("%d %d", &height, &width);
    <br>
     if (height == width) {
       printf("The shape is a square.");
     } else {
       printf("The shape is a rectangle.");
     }
     return 0;
   }
    </code-runner>
    </pre>

    ````{admonition} Equal to $==$ Vs. Assignment $=$
    One of the most common mistakes is that people confuse the relational operator `==` with the assignment operator `=`. The **relational operator** `==` compares the right hand side with the left hand side and returns `true` if they are equal and `false` otherwise. The **assignment operator** `=` assigns the value on the right hand side to the variable on the left hand side.

    
    *What would happen if you got confused and wrote `if (x = 5)` instead of `if(x == 5)`, for example?*

    In `if (x = 5)`, `5` is assigned to `x`, which returns `5` (recall {ref}`assignment-operator`). The condition here will always be `true`, since the numerical value in place of the condition is `5`. This is not your intention indeed. Your intention is to check if `x` is equal to `5`. To do this, you should write `if (x == 5)`. 
    
    ````


## What can we do with relational operators?

Using relational operators, we can:

1. Compare the values of `int` and `double` variables, e.g. `(3 >= 2)` or `(7.2 > 5.1)` or `(-3.2 <= 1)`,

2. Mix arithmetic and relational operators, where arithmetic operations have higher precedence, e.g., in `(x + 2 == 5)`, `x + 2` is evaluated first and compared with `5` to see if they are equal, and

3. Compare the values of two `char` variables, where the ASCII codes of the characters are compared, e.g., `'a' < 'b'` $\rightarrow$ `true` since the ASCII code of `'a'` is lower than `'b'`. 

4. Compare the values of `char` and `int` values, e.g., `('0' == 0)` $\rightarrow$ `false` since `'0'` has an ASCII code of 48, which is not equal to `0`.



{{quiz_embed | replace("%%FILENAME%%", "chapter-3/sec-1") }}