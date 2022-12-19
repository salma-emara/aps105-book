# Multiple Conditions

On top of our {download}`eligible-age.c <../../code/chapter03/eligible-age/eligible-age.c>` program, we want to check if a user's age is between `14` and `16`. If this is the case, the user is eligible to work only if it is not during school hours.

You may guess that we can write the condition as `(14 <= age <= 16)`. However, it is not permitted to have two relational operators on one operand. This is technically two conditions not one, as `(14 <= age <= 16)` translates to `(age <= 16)` and `(age >= 14)`. 

**How do we check for these multiple conditions?** We can use logical/boolean operators to combine multiple conditions. For example, "and" can be written as `&&`. Hence, `(14 <= age <= 16)` can be correctly written as `(age >= 14 && age <= 16)`. 

One way to extend our program is extending the block executed if the age is 14 or higher. There, we can check if the age is between 14 and 16. If it is, we need to print an extra warning message that it is only permissible to work outside of school hours. To extend our program, we can write the following code.

**Code**
```{code-block} c
:linenos:
:emphasize-lines: 11-13
#include <stdio.h>
  int main(void){
    int age = 0;
    printf("Enter your age: ");
    scanf("%d", &age);

    if (age < 14){
      printf("You are not yet eligible to work in Ontario.");
    }else{
      printf("You are eligible to work in Ontario.");
      if (age >= 14 && age <= 16){ // age >= 14 is redundant
        printf(" However, you are not allowed to work during school hours.");
      }
    }
    return 0;
  }
```
**Output[^1]**
<pre>
Enter your age: <b>15</b>
You are eligible to work in Ontario. However, you are not allowed to work during school hours.</pre>

## Logical/Boolean Operators
There are three logical operators: and $\rightarrow$ `&&`, or $\rightarrow$ `||`, and not $\rightarrow$ `!`. 

Truth table for the logical operators are shown below. 

|`A`|`B`|`A && B` | `A || B` |
|:--:|:--:|:--:|:--:|
|`false`|`false`|`false`|`false`|
|`false`|`true`|`false`|`true`|
|`true`|`false`|`false`|`true`|
|`true`|`true`|`true`|`true`|

## Lazy Evaluation

In progress ...
%Elegant programming is not just about writing less code, but also writing code that is easy to read and understand. In the previous example, we can see that the condition is not very readable. We can use the lazy evaluation to make the condition more readable.

**Exercise: OR operator**

For example, let's write a C code that checks if a character entered by the user is an upper case `'A'` or lower case `'a'`. If it is, we will print a prompt to the user saying so. Otherwise, we will print that it is not an `'A'` or `'a'`. Download {download}`upper-lowerA.c <../../code/chapter03/upper-lowerA/upper-lowerA.c>` to get the following code.

**Code**
```{code-block} c
:emphasize-lines: 7
#include <stdio.h>
int main(void){
  char letter = ' ';
  printf("Enter a letter: ");
  scanf("%c", &letter);

  if (letter == 'A' || letter == 'a'){
    printf("You entered an upper case or lower case A.");
  }else{
    printf("You did not enter an upper case or lower case A.");
  }
  return 0;
}
```
**Output[^1]**
<pre>
Enter a letter: <b>a</b>
You entered an upper case or lower case A.</pre>


**Exercise: NOT operator**

The NOT operator is typically used to reverse a condition, or create a more readable code. For example, let's write a C code that checks if the characters entered by the user is not an alphabet. **Note:** ASCII code of all upper case alphabets is larger than lower case alphabets.

One way to find the condition is to think of where the alphabets are. Alphabets are between `'A'` and `'Z'` or between `'a'` and `'z'`. If the character is not between these two ranges, it is not an alphabet. We can write the condition of alphabets as 

`((letter >= 'A') && (letter <= 'Z')) || ((letter >= 'a') && (letter <= 'z'))` 

then negate it using `!`. This makes 

`!(((letter >= 'A') && (letter <= 'Z')) || ((letter >= 'a') && (letter <= 'z')))`.

We drew the ASCII code range below. We highlight the range we are interested in using a dotted line, and what we are not interested in using a blue thick line. Using the diagram below, you can also develop the condition as `(letter < 'A') || (letter > 'Z' && letter < 'a') || (letter > 'z')`. Both conditions are equivalent.


```{figure} ./images/range-line.png
:alt: ASCII code range line
:class: with-shadow
:width: 400px
:align: center

ASCII code range line.
```

Download {download}`not-alphabet.c <../../code/chapter03/not-alphabet/not-alphabet.c>` to get the following code.

**Code**
```{code-block} c
:emphasize-lines: 7
#include <stdio.h>
int main(void){
  char letter = ' ';
  printf("Enter a letter: ");
  scanf("%c", &letter);

  if (!(((letter >= 'A') && (letter <= 'Z')) || ((letter >= 'a') && (letter <= 'z')))){
    printf("You didn't enter an alphabet.");
  }
  return 0;
}
```

**Output[^1]**
<pre>
Enter a letter: <b>$</b>
You didn't enter an alphabet.</pre>

```{admonition} NOT vs. NOT EQUAL
`!` is a logical operator. It is not to be confused with a relational operator `!=`.

`!` is to be placed before one condition that is either `true` or `false`. For example, `!(x > 5)` is valid and it translates to `(x <= 5)`. 

While `!=` compares two values and returns `true` if they are not equal. For example, `(x != 5)` is valid. 
```

## De Morgan's Law

De Morgan's Law is a rule that can be used to simplify a condition. It is named after Augustus De Morgan, a British mathematician.


