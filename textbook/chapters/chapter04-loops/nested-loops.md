# Nested loops

Just like how if-statements can be nested, loops can be nested too.

An example where nested loops would be helpful is when we print multiple lines where each line has different pattern. 

**Exercise**

Write a C program that prints the following pattern:

``` 
*
**
***
```

**Step 1: Toy example.** The expected output is shown above.

**Step 2: Think of a solution!** There are **two** sources of repetition. The first source of repetition is the number of lines, *i.e.* we are printing three lines. The second source of repetition is the number of stars in each line, *i.e.* in some lines we are printing 1, 2 or 3 `*`s.

We can use a for loop to loop over the number of lines. For each line, we can use another for loop to loop over the number of stars. In other words, for each line we can print out the number of stars that is equal to the line number.

**Step 3: Decompose into steps.** We can decompose the problem into two parts. The first part is to print out the number of stars that is equal to the line number. The second part is to print out the number of lines.

1. Initialize a variable `line` to $1$.
2. Print out the number of stars that is equal to the line number.
3. Increment the variable `line` by $1$.
4. Repeat 2 and 3 until the variable `line` is greater than $3$.

To do 2. Print out the number of stars that is equal to the line number, we can do the following:

1. Initialize a variable `star` to $1$.
2. Print out a `*`.
3. Increment the variable `star` by $1$.
4. Repeat 2 and 3 until the variable `star` is greater than the variable `line`.




