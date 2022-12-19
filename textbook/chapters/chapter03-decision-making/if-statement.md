# If-statements

Let's develop a decision-making program! We want to develop a program that prompts the user to enter their age. If it was below the legal age to work in Ontario, Canada, we want to print "You are not yet eligible to work in Ontario.", else it prints "You are eligible to work in Ontario."

In C, we use the `if` statement to make decisions. The `if` statement is a conditional statement that executes a block of code if a condition is `true`. The syntax of the `if` statement is as follows:

```{code-block} c
if (condition) {
  // code to execute if condition is true
}
```

We want to execute another block of code if the condition is `false`. We can have an else to the if-statement. The syntax of the `if-else` statement is as follows:

```{code-block} c
if (condition) {
  // code to execute if condition is true
} else {
  // code to execute if condition is false
}
```

## What can this `condition` be?

1. The `condition` can be a `bool` variable. Recall `bool` variable takes either a `true` or `false` value. 
    
    **Code**
    ```{code-block} c
    #include <bool.h>
    #include <stdio.h>
    
    int main(void){
      bool flag = true;
      if(flag){
        printf("The flag is true.");
      }else{
        printf("The flag is false.");
      }
      return 0;
    }
    ```
    
    **Output**
    <pre>
    The flag is true.</pre>
    
2. The `condition` can be a numerical value. Recall that `true` is stored as `1` and `false` is stored as `0`. To be more accurate, C is only strict in the representing `false` as 0. While `true` can be any non-zero number. In other words, any *non-zero* value in the condition makes the condition `true`. While a *zero* value in the condition makes the condition `false`.

    **Code**
    ```{code-block} c
    #include <stdio.h>
    
    int main(void){
      if (3){
        printf("The condition is true.");
      }else{
        printf("The condition is false.");
      }
      return 0;
    }
    ```
    **Output**
    <pre>
    The condition is true.</pre>

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
    ```{code-block} c
    :linenos:
    :emphasize-lines: 7
    #include <stdio.h>
    int main(void){
      int age = 0;
      printf("Enter your age: ");
      scanf("%d", &age);

      if (age < 14){
        printf("You are not yet eligible to work in Ontario.");
      }else{
        printf("You are eligible to work in Ontario.");
      }
      return 0;
    }
    ```

    **Output[^1]**
    <pre>
    Enter your age: <b>13</b>
    You are not yet eligible to work in Ontario.</pre>

    Another example, let's write a program in C that identifies if a shape is rectangle or square based on the two sides given by the user. Download {download}`square-rectangle.c <../../code/chapter03/square-rectangle/square-rectangle.c>` to get the following code.

    **Code**
    ```{code-block} c
    :linenos:
    :emphasize-lines: 7
    #include <stdio.h>
    int main(void){
      int height, width = 0;
      printf("Please enter the height and width of your shape: ");
      scanf("%d %d", &height, &width);
      
      if (height == width){
        printf("The shape is a square.");
      }else{
        printf("The shape is a rectangle.");
      }
      return 0;
    }
    ```
    **Output[^1]**
    <pre>
    Please enter the height and width of your shape: <b>5 5</b>
    The shape is a square.</pre>


## What can we do with relational operators?

Using relational operators, we can:

1. Compare the values of `int` and `double` variables, e.g. `(3 >= 2)` or `(7.2 > 5.1)` or `(-3.2 <= 1)`,

2. Mix arithmetic and relational operators, where arithmetic operations have higher precedence, e.g., in `(x + 2 == 5)`, `x + 2` is evaluated first and compared with `5` to see if they are equal, and

3. Compare the values of two `char` variables, where the ASCII codes of the characters are compared, e.g., `'a' < 'b'` $\rightarrow$ `true` since the ASCII code of `'a'` is lower than `'b'`. 

4. Compare the values of `char` and `int` values, e.g., `('0' == 0)` $\rightarrow$ `false` since `'0'` has an ASCII code of 48, which is not equal to `0`.



[^1]: Inputs to programs are in **bold**.