# If-statements

For example, I want to develop a program that prompts the user to enter their age. If it was below the legal age to work in Canada, we want to print "You are not yet eligible to work in Canada.", else it prints "You are eligible to work in Canada."

In C, we use the `if` statement to make decisions. The `if` statement is a conditional statement that executes a block of code if a condition is true. The syntax of the `if` statement is as follows:

```{code-block} c
if (condition) {
  // code to execute if condition is true
}
```

If we want to execute another block of code if the condition is false, we can have an else to the if-statement. The syntax of the `if-else` statement is as follows:

```{code-block} c
if (condition) {
  // code to execute if condition is true
} else {
  // code to execute if condition is false
}
```