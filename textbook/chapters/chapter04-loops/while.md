# While Loop

The while loop is a control flow statement that allows instructions/statements/code to be executed repeatedly based on a given condition.

The syntax of the while loop is as follows:

```{code-block} c
while(<condition>){
    <statements>;
}
<other statements>;
```

```{figure} ./images/while-loop-flow-chart.png
:alt: The flow chart of a while loop
:class: with-shadow
:width: 200px
:align: center

The flow chart of a while loop.
```

As the flow chart shows, the while loop will execute the statements inside the curly braces as long as the condition is true. Once the condition becomes false, the while loop will exit and the program will continue executing the statements after the while loop.

For example, the following program will print out the numbers $1$ through $10$:

**Code**
```{code-block} c
#include <stdio.h>

int main(void){
    int i = 1;
    while(i <= 10){
        printf("%d ", i);
        i++;
    }
    return 0;
}
```

**Output**
```{code-block} console
1 2 3 4 5 6 7 8 9 10
```

````{admonition} Exercise
:class: note

Write a C program that takes in from the user numbers and calculates the sum of the numbers. The program should stop when the user enters a negative number.

**Step 1: Toy example** For example, if the user enters 18, 5, 3, 2, 1, -1, the program should print out the sum of the numbers $18 + 5 + 2 + 1$, which is 29.

**Step 2: Think of a solution!** The program should repeatedly take in numbers from the user and add them to the sum. The program should stop when the user enters a negative number.

**Step 4: Decompose into steps** First, the program should take in a number from the user. Then, the program should check if the number is negative. Then, the program should add the number to the sum if it was positive. Otherwise, the program should print the sum calculated so far. It is wise to initialize the sum variable with zero, in case the user enters a negative number in the beginning. 

This process should repeat. If the number is negative, the program should stop and print sum. If the number is not negative, the program should continue taking numbers and calculating the sum.

**Step 5: Draw your solution** The following flow chart shows the steps that the program should take.

```{figure} ./images/while-loop-exercise.png
:alt: The flow chart of the while loop exercise
:class: with-shadow
:width: 200px
:align: center  

The flow chart of the while loop exercise      
```

**Step 6: Write the code.** Download {download}`sum-numbers-while.c <../../code/chapter04/sum-numbers-while/sum-numbers-while.c>` to get the following code.

```{code-block} c
#include <stdio.h>

int main(void){
    int sum = 0;
    int num;
    printf("Enter a number: ");
    scanf("%d", &num);
    while(num >= 0){
        sum += num;
        printf("Enter another number: ");
        scanf("%d", &num);
    }
    printf("The sum is %d\n", sum);
    return 0;
}
```

**Output**
<pre>
Enter a number: <b>18</b>
Enter another number: <b>5</b>
Enter another number: <b>2</b>
Enter another number: <b>1</b>
Enter another number: <b>-1</b>
The sum is 26
</pre>

**Step 7: Test your code** Test your code with other numbers. For example, try entering a negative number first. What happens? The sum should be 0. Try entering a zero number. What happens? The while loop should not stop and you should be still able to enter numbers. 
````

## Infinite Loops

What happens when the condition in the while loop is always true? The while loop will never stop and the program will never exit. This is called an infinite loop. For example, the following program will never stop:

**Code**
```{code-block} c
#include <stdio.h>

int main(void){
    int i = 1;
    while(i > 0){ //will always be true
        printf("%d ", i);
        i++;
    }
    return 0;
}
```

**Potential Output**
<pre>
1 2 3 4 5 6 7 8 9 10 11 12 13 ... <(continues until the program crashes)>
</pre>