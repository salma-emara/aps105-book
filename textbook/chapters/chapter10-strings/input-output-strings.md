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
```{code-block} c
#include <stdio.h>

int main(void) {
  char s[] = "Hello";
  printf("%s\n", s + 2);
  return 0;
}
```

**Ouput**
<pre>
llo
</pre>

If we want to print a particular number of characters, we can use the `%.*s` format specifier and replace `*` by the number of characters to print. For example, if we want to print the first two characters of the string, we can use the following code.

**Code**
```{code-block} c
#include <stdio.h>

int main(void) {
  char s[] = "Hello";
  printf("%.2s\n", s);
  return 0;
}
```

**Ouput**
<pre>
He
</pre>

If the number of characters set to be printed is greater than the length of the string, it will print till `'\0'`.

````{admonition} Printing a character vs. a string
:class: note
If we want to print a string, we should use `%s` format specifier. If we use `%c` format specifier, we need to pass the character, not a pointer to the character. This is because `%c` expects a character, not a string. For example, the following code prints the second character of the string.

**Code**
```{code-block} c
#include <stdio.h>

int main(void) {
  char s[] = "Hello";
  printf("%c\n", *(s + 1));
  return 0;
}
```

**Output**
<pre>
e
</pre>
````

### Using `puts`

**Another function.** There is another function named `puts` that prints a string to the user. It is similar to `printf`, but it does not take a format string. It takes a pointer to the first character in the string. It prints the string and a newline character at the end. For example, the following code prints the string `Hello` to the user.

**Code**
```{code-block} c
#include <stdio.h>

int main(void) {
  char s[] = "Hello";
  puts(s);
  return 0;
}
```

**Output**
<pre>
Hello
</pre>

## Input strings

To take a string as input from the user using `scanf`, we also use `%s` format specifier, and pass the pointer pointing towards the beginning of the string. In the following figure, we show an example of taking a string as input from the user.

```{figure} ./images/scanf-why-st.png
:alt: Scanning a string
:width: 300px
:align: center
:name: scanf-why-st
```

For example, the following code takes a string as input from the user and prints it back to the user.

**Code**
```{code-block} c
#include <stdio.h>

int main(void) {
  char st[10];
  printf("Enter a string: \n");
  scanf("%s", st);
  printf("s is saved as: %s\n", st);
  return 0;
}
```

**Output[^1]**
<pre>
Enter a string: 
<b>ABCD</b>
s is saved as: ABCD
</pre>

**How does `scanf` work?** 

1. `scanf` will ignore any leading white space. 
2. `scanf` will then read characters till a white space or endline is encountered.
3. **Good news:** `scanf` will terminate the string with a null character `'\0'`.

For example, in the following code, white spaces before `ABCD` are ignored, and `scanf` reads the string `ABCD` and terminates it with a null character `'\0'`. The remaining `ff` characters will be read by the next `scanf` call.

```{code-block} c
#include <stdio.h>

int main(void) {
  char st[10];
  printf("Enter a string: \n");
  scanf("%s", st);
  printf("s is saved as: %s\n", st);
  scanf("%s", st);
  printf("s is now saved as: %s\n", st);
  return 0;
}
```

**Output[^1]**
<pre>
Enter a string: 
<b>    ABCD  ff</b>
s is saved as: ABCD
s is now saved as: ff
</pre>

To illustrate what happens to the array `st` with every `scanf`, we draw the contents of `st` after each `scanf` call in the following figure.

```{figure} ./images/what-happens-to-st.png
:alt: Scanning a string
:width: 800px
:align: center
:name: what-happens-to-st
```

**Big Problem: What if the input string is longer than the array?** 

In-progress!

[^1]: Inputs to programs are in **bold**.