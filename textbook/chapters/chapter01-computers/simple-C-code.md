# Write Simple C Programs

## Hello, world!

In this section, we will write our first C program. We will write a program that prints the message "Hello World!" on the screen. This is a tradition in programming. The program is very simple, but it will give you a taste of what programming is like. Download {download}`hello-world.c <../../code/chapter1/hello-world/hello-world.c>` if you want to play with the code. 

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" output="Hello World!">
// This program prints the message "Hello World!" on the screen.
&#35;include &lt;stdio.h&gt;
<br>
int main(void){
   printf("Hello World!\n");
   return 0;
}
</code-runner>
</pre>

Let's examine each line:

`#include <stdio.h>` gives access to functions that interface with input (like keyboard) and output (like monitor) devices. These functions include `printf` and `scanf`.

`//` double forward slash is used when the programmer want to write a comment line. For example, `// This program prints the message "Hello World!" on the screen.` is a comment line. The compiler ignores the comment lines. Hence, comment lines are not executed.

`main` is the entry point of the C program. All C programs require a main function. `main` is called when the program is executed. It returns an integer value. The value `0` indicates that the program executed successfully. Any other value indicates that the program failed.

`printf` is a function that prints a string to the screen. The string is enclosed in double quotes. The `\n` is a special character that indicates a new line. The `\` is called an escape character. It is used to indicate special characters. The `printf` function is defined in the `stdio.h` header file.


`return 0` if the main function is executed, and it reached the end, this means all previous statements were executed successfully. `return 0` makes the main function report that it returned a zero and hence won't show error messages related to issues with previous statements. `return 0` will end the execution of the program.

`;` every statement in C ends with a semicolon. 

### Bad coding style

If we remove spaces, indentation and formatting of the above program, it will look like this:

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" output="Hello World!">
&#35;include &lt;stdio.h&gt;
// This program prints the message "Hello World!" on the screen.
int main (void){printf("Hello World!\n");return 0;}
</code-runner>
</pre>

However, it does not look easy to read and understand. For tips on better coding style, see [Coding Style](../appendix/coding-style.md).

## Prompt user for input 

Write a C code that prompts the user to enter the number of pizzas they have. The program outputs the total number of slices they have. We are assuming each pizza has 8 slices. Download code in {download}`pizza.c <../../code/chapter1/pizza/pizza.c>` if you want to play with the code further.

<!-- [pizza.c](../../code/chapter1/pizza/pizza.c) -->

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" input="6" output="How many pizzas do you have?
<b>6</b> 
You have 48 slices in 6 pizza.">
&#35;include &lt;stdio.h&gt;
<br>
int main(void){
  int numPizzas, numSlices;
  printf("How many pizzas do you have?\n");
  scanf("%d", &numPizzas);
  numSlices = numPizzas * 8;
  printf("You have %d slices in %d pizza.\n", numSlices, numPizzas);
  return 0;
}
</code-runner>
</pre>

Let's examine each line:

`#include <stdio.h>` again allows to access function interfaces with keyboard and monitor, specifically `printf` and `scanf`.

`int main(void){` is the entry point of any C program. Ideally, the function should return `0` if there were no problems encountered in executing the statements in the `main` function.

`int numPizzas, numSlices;` declares two variables of type `int`. `int` is a data type that represents integers. The variables are named `numPizzas` and `numSlices`. This line indicates that the memory created a space for these two variables.

`printf("How many pizzas do you have?\n");` prints the string "How many pizzas do you have?" to the screen. The `\n` indicates a new line.

`scanf("%d", &numPizzas);` will take the user input and assign it to `numPizzas` variable. `scanf` is a function that scans the keyboard for user input. `%d` is a format specifier that indicates that user input will be an integer. `&` is the address-of operator. It is used to get the address of a variable. `&numPizzas` is the address of the variable `numPizzas`. `scanf` will store the user input in the address of the variable `numPizzas`. `scanf` requires the address of the variable (not just the variable). In the chapter of pointers, we will discuss why `scanf` requires the address of `numPizzas`.

`numSlices = numPizzas * 8;` will multiply the value in `numPizzas` (which was entered by the user in `scanf`) by 8 and store the result value in `numSlices`.

`printf("You have %d slices in %d pizza.\n", numSlices, numPizzas);` will print what is between quotes. In place of the first `%d`, it will print the first value after the comma `,` that is `numSlices`. In place of the second `%d`, it will print the second value after the second comma `,` that is `numPizzas`.

`return 0;` will end the execution of the program.

`}` indicates the end of the `main` function. It is the closing bracket of the opening bracket `{` of the `main` function.

## Escape Sequences

Previously, we studied how to use the `printf` function to print text and values in variables. If you still did not get this question, how do we print `\n` when we do not want it to print a new line? 

This is an issue with escape sequences. An escape sequence is a sequence of characters that may not represent itself. Instead, to be represented correctly, it needs to be preceded by another character. For example, `\n` is an escape sequence that represents a new line. To print `\n`, we need to add another `\` before it. Hence, `printf("\\n");` prints `\n`.  

In general, for escapes sequences that start with `\` escape character, we add another `\`. For example, `printf("\\n");` will print `\n`. 

`"` is also an escape character. If we want to print `"`, we add `\` before it. For example, `printf("\"");` will print `"`.

The following table lists how to print some of the escape sequences that are commonly used in C.

| Escape Sequence | Prints |
| --------------- | ------ |
| `\\n`           | `\n`   |
| `\\`            | `\`    |
| `\\t`           | `\t`   |
| `\'`            | `'`    |
| `\"`            | `"`    |

If you still did not get this question, how do we print `%` itself? `%` is an escape character too used to specify the format of the variable to be printed. To print `%`, we require another `%`. Hence, `printf("%%")` prints `%`.

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" output="Grade: 91%">
&#35;include &lt;stdio.h&gt;
<br>
int main(void){
  int grade = 91;
  printf("Grade: %d%%\n", grade);
  return 0;
}
</code-runner>
</pre>

{{quiz_embed | replace("%%FILENAME%%", "chapter-1/sec-4") }}