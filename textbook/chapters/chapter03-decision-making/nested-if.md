(nested-if)=
# Nested-if statements

In the previous section, we developed the following program that printed to the user if they're eligible to work in Ontario, Canada based on their age. We wrote an `if-else` statement inside the `else` of another if-statement. This is referred to as a **nested-if statement**. Nested-if statements are useful when we want to check multiple conditions as we observed in the previous section.

**Not elegant code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" input="4"
output="Enter your age: <b>4</b>
You are not yet eligible to work.">
&#35;include &lt;stdio.h&gt;
int main(void) {
  int age = 0;
  printf("Enter your age: ");
  scanf("%d", &age);

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

In the following code, we wrote a more elegant code. In line 9, we can see `else if (<condition>)`, which is evaluated only if the condition in the preceding `if` statement is `false`. This is also called a **nested-if statement**, but it is more readable and elegant. 

**More elegant code**
<pre class="code-runner-wrapper">
<code-runner language="c" input="4" highlight-lines="9"
output="Enter your age: <b>4</b>
You are not yet eligible to work.">
&#35;include &lt;stdio.h&gt;
int main(void) {
  int age = 0;
  printf("Enter your age: ");
  scanf("%d", &age);
<br>
  if (age < 14) {
    printf("You are not yet eligible to work in Ontario.");
  } else if (age >= 14 &&
             age <= 16) {  // Can omit age >=14, since it is redundant
    printf("You are eligible to work only outside school hours.");
  } else {
    printf("You are eligible to work in Ontario.");
  }
  return 0;
}
</code-runner>
</pre>

## Longer nested-if statements

Let's develop a C program that finds the maximum of three integers `x`, `y` and `z` and stores the maximum int in a variable named `max`.

**Step 1: Toy example.** Let's say we have `x = 3`, `y = 4` and `z = 5`. The maximum is expected to be `z`.

**Step 2: Think of a solution.** We can compare two integers first, and then the maximum of them can be compared with the third int. For example, we compare `x` and `y`, and the larger number gets compared with `z`.

```{figure} ./images/max-of-3.png
:alt: Maximum of three numbers
:class: with-shadow
:width: 200px
:align: center

The steps of comparing three numbers to find the maximum.
``` 

**Step 3: Decompose solution into steps.** First, we compare `x` and `y`. If `x` is larger, we compare `x` and `z`. If `y` is larger, we compare `y` and `z`. Second, we compare the maximum of `x` and `y` with `z`. If the maximum is larger, we print the maximum. If `z` is larger, we print `z`. 

**Step 4: Draw your solution.** The following flow chart shows the steps of the solution.

```{figure} ./images/flow-chart-max-of-3.png
:alt: Flow chart of the steps of comparing three numbers to find the maximum.
:class: with-shadow
:width: 400px
:align: center

Flow chart of the steps of comparing three numbers to find the maximum.
```

**Step 5: Make sure your steps works on other toy examples.** Try a toy example with the maximum number in a different variable. For example, `x = 5`, `y = 3` and `z = 4`. The maximum is expected to be `x`.

**Step 6: Write the code.** The following code implements the steps of the flow chart. Download {download}`max-of-three-method1.c <../../code/chapter03/max-of-three-method1/max-of-three-method1.c>` to get the following code.

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" input="5 3 4"
output="Enter three integers: <b>5 3 4</b>
The maximum is the first number entered: 5">
&#35;include &lt;stdio.h&gt;
int main(void) {
  int x = 0, y = 0, z = 0;
  printf("Enter three integers: ");
  scanf("%d %d %d", &x, &y, &z);
<br>
  // Maximum of x and y
  if (x > y) {
    if (x > z) {
      printf("The maximum is the first number entered: %d", x);
    } else {
      printf("The maximum is the third number entered: %d", z);
    }
  } else {
    if (y > z) {
      printf("The maximum is the second number entered: %d", y);
    } else {
      printf("The maximum is the third number entered: %d", z);
    }
  }
  return 0;
}
</code-runner>
</pre>

More elegant code can be written if we thought backwards. We can think of the condition that is `true` only if `x` is the maximum, *i.e.*, `(x > y && x > z)` and the conditions that is true only if `y` is the maximum, *i.e.*, `(y > x && y > z)` and `else` `z` is the maximum. The following code implements this idea. Download {download}`max-of-three-method2.c <../../code/chapter03/max-of-three-method2/max-of-three-method2.c>` 

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" input="1 3 4"
output="Enter three integers: <b>1 3 4</b>
The maximum is the third number entered: 4">
&#35;include &lt;stdio.h&gt;
int main(void) {
  int x = 0, y = 0, z = 0;
  printf("Enter three integers: ");
  scanf("%d %d %d", &x, &y, &z);
<br>
  if (x > y && x > z) {
    printf("The maximum is the first number entered: %d", x);
  } else if (y > x && y > z) {
    printf("The maximum is the second number entered: %d", y);
  } else {
    printf("The maximum is the third number entered: %d", z);
  }
  return 0;
}
</code-runner>
</pre>


## Dangling else problem


The brackets `{}` in the if-statements are not necessary when the code block is one line. For example, the following code is valid without brackets {}.

**Code without brackets {}**
```{code-block} c
if (<condition>)
  <statement>;
else
  <statement>;
```

However, it is a good practice to use brackets `{}` to avoid an issue referred to as the **dangling else problem**. For example, in the following code, the `else` belongs to which `if` statement? By default, the `else` belongs to the `if` statement that is closest to it, if there were no brackets.

**Code with dangling else problem**
```{code-block} c
if (<condition>)
  if (<condition>)
    <statement>;
  else  // this else belongs to the if statement above
    <statement>;
```

{{quiz_embed | replace("%%FILENAME%%", "chapter-3/sec-3") }}