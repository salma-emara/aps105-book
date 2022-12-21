(nested-if)=
# Nested-if statements

In the previous section, we developed the following program that printed to the user if they're eligible to work in Ontario, Canada based on their age. We wrote an `if` statement inside the `else` of another if-statement. This is referred to as a **nested-if statement**.

**Not elegant code**
```{code-block} c
#include <stdio.h>
  int main(void){
    int age = 0;
    printf("Enter your age: ");
    scanf("%d", &age);

    if (age < 14){
      printf("You are not yet eligible to work in Ontario.");
    }else{
      // Obviously, this code segment would be only executed if age >= 14
      printf("You are eligible to work in Ontario.");
      if (age >= 14 && age <= 16){ // age >= 14 is redundant. We can omit it.
        printf(" However, you are not allowed to work during school hours.");
      }
    }
    return 0;
  }
```

In the following code, we wrote a more elegant code. In line 9, we can see `else if(<condition>)`, which is evaluated only if the condition in the `if` statement is `false`. This is called a **nested-if statement**. Nested-if statements are useful when we want to check multiple conditions. In the above example, we can see that the condition `age >= 14` is redundant. We can omit it.`

**More elegant code**
```{code-block} c
:emphasize-lines: 9
:linenos:
#include <stdio.h>
  int main(void){
    int age = 0;
    printf("Enter your age: ");
    scanf("%d", &age);

    if (age < 14){
      printf("You are not yet eligible to work in Ontario.");
    }else if(age >= 14 && age <= 16){ //Can omit age >=14, since it is redundant
      printf("You are eligible to work in Ontario only outside school hours.");
    }else{
        printf("You are eligible to work in Ontario without conditions.");
      }
    return 0;
  }
```


## Exercise on more complicated nested-if statements

Let's develop a C program that finds the maximum of three ints `x`, `y` and `z` and stores the maximum int in a variable named `max`.

**Step 1: Toy example.** Let's say we have `x = 3`, `y = 4` and `z = 5`. The maximum is expected to be `z`.

**Step 2: Think of a solution.** We can use an if-statement to find if `x`, `y` or `z` is maximum. *What would be our condition?* We can use `>` to compare `x` and `y`, another `>` to compare `x` and `z`, another `>` to compare `y` and `z`. Three is the maximum number of comparisons we can do with three variables. 

**Step 3: Decompose solution into steps.** We can compare two ints first, and then the maximum of them can be compared with the third int. How do we compare

**Step 4: Draw your solution.** We can draw a flowchart to represent our solution.

**Step 5: Make sure your steps works on other toy examples.**

**Step 6: Write the code.**

## Dangling else problem