# Input/Output Strings

## Output strings

### Using `printf`

To be able to print a string to the user, we use `printf`. However, there are some considerations, we have to keep in mind. For example, in the following figure, we are printing a null-terminated array of characters --- a string. `printf` uses `%s` format specifier, and it requires a pointer to the first character in the array. It will print from `str[0]` till (and not including) the first null character `'\0'`.

```{figure} ./images/string-printing.png
:alt: Printing a string
:width: 600px
:align: center
:name: string-printing
```

Printing happens from the first character pointed to by the pointer. This means that if we pass a pointer to the middle of the string, it will print the rest of the string. For example, if we pass `str + 2` to `printf`, it will print `llo`.

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" output="llo">
&#35;include &lt;stdio.h&gt;
<br>
int main(void) {
  char s[] = "Hello";
  printf("%s\n", s + 2);
  return 0;
}
</code-runner>
</pre>

If we want to print a particular number of characters, we can use the `%.*s` format specifier and replace `*` by the number of characters to print. For example, if we want to print the first two characters of the string, we can use the following code.

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" output="He">
&#35;include &lt;stdio.h&gt;
<br>
int main(void) {
  char s[] = "Hello";
  printf("%.2s\n", s);
  return 0;
}
</code-runner>
</pre>

If the number of characters set to be printed is greater than the length of the string, it will print till `'\0'`.

````{admonition} Printing a character vs. a string
:class: note
If we want to print a string, we should use `%s` format specifier. If we use `%c` format specifier, we need to pass the character, not a pointer to the character. This is because `%c` expects a character, not a string. For example, the following code prints the second character of the string.

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" output="e">
&#35;include &lt;stdio.h&gt;
<br>
int main(void) {
  char s[] = "Hello";
  printf("%c\n", *(s + 1));
  return 0;
}
</code-runner>
</pre>

### Using `puts`

**Another function.** There is another function named `puts` that prints a string to the user. It is similar to `printf`, but it does not take a format string. It takes a pointer to the first character in the string. It prints the string and a newline character at the end. For example, the following code prints the string `Hello` to the user.

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" output="Hello">
&#35;include &lt;stdio.h&gt;
<br>
int main(void) {
  char s[] = "Hello";
  puts(s);
  return 0;
}
</code-runner>
</pre>

## Input strings

### Using `scanf`

To take a string as input from the user using `scanf`, we also use `%s` format specifier, and pass the pointer pointing towards the beginning of the string. In the following figure, we show an example of taking a string as input from the user.

```{figure} ./images/scanf-why-st.png
:alt: Scanning a string
:width: 300px
:align: center
:name: scanf-why-st
```

For example, the following code takes a string as input from the user and prints it back to the user.

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" input="ABCD" output="Enter a string: 
<b>ABCD</b>
s is saved as: ABCD">
&#35;include &lt;stdio.h&gt;
<br>
int main(void) {
  char st[10];
  printf("Enter a string: \n");
  scanf("%s", st);
  printf("s is saved as: %s\n", st);
  return 0;
}
</code-runner>
</pre>

**How does `scanf` work?** 

1. `scanf` will ignore any leading white space. 
2. `scanf` will then read characters till a white space or endline is encountered.
3. **Good news:** `scanf` will terminate the string with a null character `'\0'`.

For example, in the following code, white spaces before `ABCD` are ignored, and `scanf` reads the string `ABCD` and terminates it with a null character `'\0'`. The remaining `ff` characters will be read by the next `scanf` call.

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" input="    ABCD  ff" output="Enter a string: 
<b>    ABCD  ff</b>
s is saved as: ABCD
s is now saved as: ff">
&#35;include &lt;stdio.h&gt;
<br>
int main(void) {
  char st[10];
  printf("Enter a string: \n");
  scanf("%s", st);
  printf("s is saved as: %s\n", st);
  scanf("%s", st);
  printf("s is now saved as: %s\n", st);
  return 0;
}
</code-runner>
</pre>

To illustrate what happens to the array `st` with every `scanf`, we draw the contents of `st` after each `scanf` call in the following figure.

```{figure} ./images/what-happens-to-st.png
:alt: Scanning a string
:width: 800px
:align: center
:name: what-happens-to-st
```

**Big Problem: What if the input string is longer than the array?** 

For example, if the user input was `ABCDEFGHIJ` to the following program, what would happen?

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="6" input="ABCDEFJI" output="Enter a string: 
<b>ABCDEFJI</b>
s is saved as: ABCDEFJI">
&#35;include &lt;stdio.h&gt;
<br>
int main(void) {
  char st[7 + 1];
  printf("Enter a string: \n");
  scanf("%s", st);
  printf("s is saved as: %s\n", st);
  return 0;
}
</code-runner>
</pre>

**<span style="color:red">Undefined Behaviour Output</span>**
<pre>
Enter a string: 
<b>ABCDEFJI</b>
s is saved as: ABCDEFJI
</pre>

At line $6$, the behavior of the program is undefined. The reason is that the input string is longer than the array. The input string is `ABCDEFGHIJ`, and the array is `st[7 + 1]`. The array can only hold 7 characters and a null character, but the input string is 10 characters long. This means that the last two characters of the input string will be written to the memory locations after the array. This may result in an undefined behaviour. The program may crash, print some random characters after `ABCDEFGHIJ` or behave normally if the computer allows writing `IJ` and a null character in elements beyond the size of the array. This phenomenon is called **buffer overflow**, where we mistakenly write to memory locations beyond the size of the array.

### Using `fgets` to avoid buffer overflow in `scanf` 

**How to fix the buffer overflow problem?** There is a safer function for taking strings from the user, it is called `fgets`. You can now specify the maximum number of characters to be read from the user. For example, the following code takes a string of 2 characters as input from the user and prints it back to the user.

**Code**
```{figure} ./images/fgets-3.png
:alt: Scanning a string
:width: 600px
:align: center
:name: f gets 3
```

**Output**
<pre>
Enter a string: 
<b>ABCDEFGHI</b>
st is saved as: AB
</pre>

`fgets` takes in three input parameters. In the above example, we have used the following values for the parameters.

1. `st`: The pointer to the first element of the array of characters. 
2. `3`: The maximum number of characters to be read + 1. The additional character is for storing a null character after the characters read from the user.
3. `stdin`: The input stream. In this case, we are taking input from the user, which is stored in `stdin` --- a file defined in `stdio.h` library. 

```{admonition} If user enters fewer characters than the maximum number of characters to be read, what happens?
If user enters fewer characters than the maximum number of characters to be read, for example, in the above example, if the user only enters 1 character and pressed <enter>, what happens?

In the above example, `fgets` will read the characters till either the number of characters read is 2 or till the user enters a new line character. In the above example, if the user enters `A` and presses <enter>, `fgets` will read the character `A` and a new line character. The first element of the array `st` will be `A`. The second element of the array `st` will be a null character `'\0'`. The remaining elements of the array `st` will be garbage values. The following is the output if the user enters `A` and presses <enter>.

**Output**
<pre>
Enter a string: 
<b>A</b>
st is saved as: A
</pre>

```

### Implement a `getStringSafely` function

We want to write a function that takes a string as input from the user and stores it in an array. The function should take in the array as a parameter, the number of characters to read from the user + 1, and return a pointer to the first element in the array of characters. Like `fgets`, if the user enters fewer characters than the maximum number of characters to be read, the function should terminate the string with a null character. If the user enters more characters than the maximum number of characters to be read, the function should read the first `n - 1` characters and terminate the string with a null character.

**Step 1: Toy example.** A toy example is shown in the figure below. The user input is `ABCD`, the maximum number of characters to read + 1 is `3`. The function should read `'A'` and `'B'` into the string `st` then put `'\0'` after `'A'` and `'B'`. 

```{figure} ./images/toy-example-getStrSafe.png
:alt: Scanning a string
:width: 600px
:align: center
:name: toy-example-getStrSafe
```

**Step 2: Think of a solution!** We need to read the string character by character and store it in the array. We need to stop reading the string when we have read `n - 1` characters. We need to terminate the string with a null character. If the character entered is a new line character, we need to terminate the string with a null character.

```{admonition} getchar() function

`getchar()` function is a very handy function that reads a character from the user and returns it. It is defined in `stdio.h` library. It takes in no input parameters and returns the read character. 

For example, in the following code, we take a string from the user one character at a time and print each character on a new line till the user enters a new line character.

<pre class="code-runner-wrapper">
<code-runner language="c" input="APS105
" output="Enter characters: 
<b>APS105</b>
A
P
S
1
0
5">
&#35;include &lt;stdio.h&gt;
<br>
int main(void) {
  printf("Enter characters: \n");
  char c = getchar();
  while (c != '\n') {
    printf("%c\n", c);
    c = getchar();
  }
  return 0;
}
</code-runner>
</pre>

```

**Step 3: Decompose into steps.** The function receives string `s` and maximum number of characters to read + 1 `n`. 

1. Set a `charCount` to `0`.
2. Read a character from the user.
3. If `charCount < n - 1` and the character is not a new line character, store the character in the array `s` and increment `charCount`.
4. Else, terminate the string with a null character and return the pointer to the first element in the array `s`.
5. Repeat steps 2 to 4 till the user enters a new line character or `charCount` is greater than or equal to `n - 1`.

**Step 4: Write a draft code.** The following is a **draft** of the code for the function `getStringSafely`.

```{code-block} c
:linenos:
:emphasize-lines: 10
char* getStringSafely(char* s, int n) {
  int charCount = 0;
  char c = getchar();

  while (charCount < n - 1 && c != '\n') {
    s[charCount] = c;
    charCount++;
    c = getchar();
  }
  s[n] = '\0';
  return s;
}
```

**Step 5: Test and debug your code.** Let's test the function with the following main function.

**Test with few characters.** The following is the output if the user enters `AB` and presses <enter>.

**Partially Correct Code**
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="21" input="AB" output="Enter string: 
<b>AB</b>
User entered: AB��">
&#35;include &lt;stdio.h&gt;
<br>
char* getStringSafely(char* s, int n);
<br>
int main(void) {
  char st[10];
  printf("Enter string: \n");
  printf("User entered: %s\n", getStringSafely(st, 7));
  return 0;
}
<br>
char* getStringSafely(char* s, int n) {
  int charCount = 0;
  char c = getchar();

  while (charCount < n - 1 && c != '\n') {
    s[charCount] = c;
    charCount++;
    c = getchar();
  }
  s[n] = '\0';
  return s;
}
</code-runner>
</pre>

There were garbage values in the array `st`. This is because we probably had our null character in the wrong place. In line $21$, we set the last element in the array `s` to a null character, while we only entered 2 characters. Hence, our null character should be after the two characters.

Instead of `s[n] = '\0';`, it is correct to have `s[charCount] = '\0';` in line $21$. This is because `charCount` is the number of characters we have read from the user.

**Test with many characters.** In lines $9$ and $10$ of the following code, we try to see what is left in the input buffer after we read the string from the user.

**Partially Correct Code**
<pre class="code-runner-wrapper">
<code-runner language="c" input="Helloworld!" highlight-lines="9 10 21" output="Enter string: 
<b>Helloworld!</b>
User entered: Hellow
This is what's left: rld!">
&#35;include &lt;stdio.h&gt;
<br>
char* getStringSafely(char* s, int n);
<br>
int main(void) {
  char st[10];
  printf("Enter string: \n");
  printf("User entered: %s\n", getStringSafely(st, 7));
  scanf("%s", st);
  printf("This is what's left: %s\n", st);
  return 0;
}
<br>
char* getStringSafely(char* s, int n) {
  int charCount = 0;
  char c = getchar();
  <br>
  while (charCount < n - 1 && c != '\n') {
    s[charCount] = c;
    charCount++;
    c = getchar();
  }
  s[charCount] = '\0';
  return s;
}
</code-runner>
</pre>

In the above output, we observe `'o'` character is not printed in what's left in the input buffer. There is probably a place in our function where we read the `'o'` and later find that we have already read `6` characters.

In `getStringSafely` function, in line $21$, we read the `'o'`, regardless if our character count was `n - 1` or not. We need to read the character only if `charCount < n - 1`. 

In the following code, we fixed the code in line $21$.

**Correct Code**
<pre class="code-runner-wrapper">
<code-runner language="c" input="Helloworld!" highlight-lines="21" output="Enter string: 
<b>Helloworld!</b>
User entered: Hellow
This is what's left: orld!">
&#35;include &lt;stdio.h&gt;
<br>
char* getStringSafely(char* s, int n);
<br>
int main(void) {
  char st[10];
  printf("Enter string: \n");
  printf("User entered: %s\n", getStringSafely(st, 7));
  scanf("%s", st);
  printf("This is what's left: %s\n", st);
  return 0;
}
<br>
char* getStringSafely(char* s, int n) {
  int charCount = 0;
  char c = getchar();
<br>
  while (charCount < n - 1 && c != '\n') {
    s[charCount] = c;
    charCount++;
    if (charCount < n - 1) c = getchar();
  }
  s[charCount] = '\0';
  return s;
}
</code-runner>
</pre>

**Step 6: Improve style.** The following is the final code for the function `getStringSafely`.

We can improve the style of the code by reducing repetition of `charCount < n - 1)` condition, and `getchar()` function call. Since all what we need is to check if the character count is less than `n - 1`, and only then read the next character, we can make use of lazy evaluation in the condition of the while loop. Basically, if we have `(<LHS> && <RHS>)`, if `LHS` is `false`, there is no need to evaluate the `RHS`. You may refer to the [Chapter 3: Section 3.2.1.1. Lazy Evaluation](lazy-evaluation) section for more details. 

You may download {download}`getStringSafely.c <../../code/chapter10/getStringSafely/getStringSafely.c>` the following code and try to run it to see the output. 

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" input="Helloworld!" highlight-lines="18" output="Enter string: 
<b>Helloworld!</b>
User entered: Hellow
This is what's left: orld!">
&#35;include &lt;stdio.h&gt;
<br>
char* getStringSafely(char* s, int n);
<br>
int main(void) {
  char st[10];
  printf("Enter string: \n");
  printf("User entered: %s\n", getStringSafely(st, 7));
  scanf("%s", st);
  printf("This is what's left: %s\n", st);
  return 0;
}
<br>
char* getStringSafely(char* s, int n) {
  int charCount = 0;
  char c;
<br>
  while ((charCount < n - 1) && ((c = getchar()) != '\n')) {
    s[charCount] = c;
    charCount++;
  }
  s[charCount] = '\0';
  return s;
}
</code-runner>
</pre>

In line $18$, if `(charCount < n - 1)` was `false` we will never evaluate the right hand size condition after `&&`, because the entire condition will be `false`. However, if `(charCount < n - 1)` was `true`, the right hand side condition should be evaluated. 

In the right hand side condition, `((c = getchar()) != '\n')`, we get the character in `c = getchar()`. Recall that in C, assignment operator `=` returns the value assigned to the variable. Hence, `c = getchar()` is evaluated to the character read from the user. We then check if the character is not a new line character. If it is not a new line character, we execute the while loop body. If it is a new line character, we exit the while loop.

We now do not need the `getchar` outside of the while loop at line $16$ previously, and we can remove the `if` statement and the `getchar` call previously in line $21$.

{{quiz_embed | replace("%%FILENAME%%", "chapter-10/sec-2") }}