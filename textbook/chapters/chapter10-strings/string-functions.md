# String Functions

As you have seen in the previous sections, there is no string data type in C. Instead, C uses an array of characters to represent a string. The good news is that there is a string library that has several functions designed specifically designed to work on strings. In this section, we will look at some of the most commonly used string functions. You need to include the library `string.h` to use these functions: `#include <string.h>`. 

## Length of the string

The function `strlen` returns the length of a string. The function prototype is as follows:

```{code-block}
size_t strlen(char *str);
```

`size_t` is an unsigned integer type. For this course, you can think of `size_t` as `int`. The function returns the length of the string `str` counting number of characters starting at address `str` to the last character before `\0`. 

The following program demonstrates the use of `strlen`:

**Code**
```{code-block} c
#include <stdio.h>
#include <string.h>

int main(void) {
  char s[] = "Hello";
  int size = strlen(s);
  printf("String length is %d.\n", size);
  return 0;
}
```

**Output**
<pre>
String length is 5.
</pre>

### Implementation of strlen

To implement `strlen`, we will name it `stringLength`. This function should have a loop that loops over all the contents of the string. If the element is not `'\0'`, we should increment a counter, else we should return the counter indicating the number of non-null characters. The following is the implementation of `strlen`:

**Code**
```{code-block} c
#include <stdio.h>
#include <string.h>

int stringLength(char* s);

int main(void) {
  char s[] = "Hello";
  int size = stringLength(s);
  printf("String length is %d.\n", size);
  return 0;
}

int stringLength(char* s) {
  int count = 0;
  while (s[count] != '\0') {
    count++;
  }
  return count;
}
```

**Output**
<pre>
String length is 5.
</pre>

**Guard against changes to the string.** Withing the `stringLength` function, you should not change the contents of the string. If you do, you change this contents in the original string. Hence, you should use a `const` qualifier to indicate that the string passed should not be changed. If you were to change a `const` string, it will result in a compile-time error. A const string has a type of `const char*`. The following is the revised implementation of `stringLength`, you may download it from here: {download}`stringLength.c <../../code/chapter10/stringLength/stringLength.c>`.

**Code**
```{code-block} c
:linenos:
:emphasize-lines: 3, 12
#include <stdio.h>

int stringLength(const char* s);

int main(void) {
  char s[] = "Hello";
  int size = stringLength(s);
  printf("String length is %d.\n", size);
  return 0;
}

int stringLength(const char* s) {
  int count = 0;
  while (s[count] != '\0') {
    count++;
  }
  return count;
}
```

## Copy a string into another string

The function `strcpy` copies the contents of one string into another string. The function prototype is as follows:

```{code-block}
char* strcpy(char *dest, char *src);
```

The function copies characters in `src` till and including the null character `\0` into `dest`. The function returns the address of the destination string `dest`.

The following program demonstrates the use of `strcpy`:

**Code**
```{code-block} c
#include <stdio.h>
#include <string.h>

int main(void) {
  char s[] = "Hello";
  char d[6];
  printf("d after copying has \"%s\".\n", strcpy(d, s));
  return 0;
}
```

**Output**
<pre>
d after copying has "Hello".
</pre>

````{admonition} Why need strcpy?
Why do I need strcpy, when I can do this:

**Code with Compile-time Error**
```{code-block} c
#include <stdio.h>

int main(void) {
  char s[] = "Hello";
  char d[6];
  d = s;  // d is not assignable because it is an array
  return 0;
}
```
````

### Implementation of strcpy

To implement `strcpy`, we will name it `stringCopy`. This function should have a loop that loops over all the contents of the source string. We should copy the all the elements to the destination string including the `'\0'`, else we should return the address of the destination string. The following is the implementation of `strcpy`, and you can download it here: {download}`stringCopy.c <../../code/chapter10/stringCopy/stringCopy.c>`.

**Code**
```{code-block} c
#include <stdio.h>
#include <string.h>

char* stringCopy(char* dest, const char* src);

int main(void) {
  char s[] = "Hello";
  char d[6];
  printf("d after copying has \"%s\".\n", stringCopy(d, s));
  return 0;
}

char* stringCopy(char* dest, const char* src) {
  int ind = 0;

  while (src[ind] != '\0') {
    dest[ind] = src[ind];
    ind++;
  }
  dest[ind] = '\0';
  return dest;
}
```

**Output**
<pre>
d after copying has "Hello".
</pre>

In-progress!

The following table lists the most commonly used string functions.
