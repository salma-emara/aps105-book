# String Functions

As you have seen in the previous sections, there is no string data type in C. Instead, C uses an array of characters to represent a string. The good news is that there is a string library that has several functions designed specifically to work on strings. In this section, we will look at some of the most commonly used string functions. You need to include the library `string.h` to use these functions: `#include <string.h>`. 

## Length of the string

The function `strlen` returns the length of a string. The function prototype is as follows:

```{code-block} c
size_t strlen(char *str);
```

`size_t` is an unsigned integer type. For this course, you can think of `size_t` as `int`. The function returns the length of the string `str` counting number of characters starting at address `str` to the last character before `\0`. 

The following program demonstrates the use of `strlen`:

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" output="String length is 5.">
&#35;include &lt;stdio.h&gt;
&#35;include &lt;string.h&gt;
<br>
int main(void) {
  char s[] = "Hello";
  int size = strlen(s);
  printf("String length is %d.\n", size);
  return 0;
}
</code-runner>
</pre>

### Implementation of `strlen`

Let's implement `strlen`. We will name it `stringLength`. This function should have a loop that loops over all the contents of the string. If the element is not `'\0'`, we should increment a counter. Then we should return the counter indicating the number of non-null characters. The following shows a program that implements and uses `stringLength` function.

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" output="String length is 5.">
&#35;include &lt;stdio.h&gt;
&#35;include &lt;string.h&gt;
<br>
int stringLength(char* s);
<br>
int main(void) {
  char s[] = "Hello";
  int size = stringLength(s);
  printf("String length is %d.\n", size);
  return 0;
}
<br>
int stringLength(char* s) {
  int count = 0;
  while (s[count] != '\0') {
    count++;
  }
  return count;
}
</code-runner>
</pre>

**Guard against changes to the string.** Within the `stringLength` function, you should not change the contents of the string, since we are only required to count the number of characters. Recall that if you mistakenly change the string, you change this contents in the original string since the string is passed as a pointer. To guard against mistakenly changing the string inside a function, we can receive it as a constant string. This requires that you use `const` qualifier to indicate that the string passed should not be changed. If you were to change a `const` string, it will result in a compile-time error. A constant string has a type of `const char*`. The following is the revised implementation of `stringLength`, you may download it from here: {download}`stringLength.c <../../code/chapter10/stringLength/stringLength.c>`.

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="3 12" output="String length is 5.">
&#35;include &lt;stdio.h&gt;
<br>
int stringLength(const char* s);
<br>
int main(void) {
  char s[] = "Hello";
  int size = stringLength(s);
  printf("String length is %d.\n", size);
  return 0;
}
<br>
int stringLength(const char* s) {
  int count = 0;
  while (s[count] != '\0') {
    count++;
  }
  return count;
}
</code-runner>
</pre>

<!-- TODO: Pointer implementation of stringLength-->
<!-- TODO: Difference between const char* and char const*-->

## Copy a string into another string

### `strcpy`

The function `strcpy` copies the contents of one string into another string. The function prototype is as follows:

```{code-block} c
char* strcpy(char *dest, char *src);
```

The function copies characters in `src` till and including the null character `\0` into `dest`. The function returns the address of the destination string `dest`.

The following program demonstrates the use of `strcpy`:

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" output="d after copying has 'Hello'.">
&#35;include &lt;stdio.h&gt;
&#35;include &lt;string.h&gt;
<br>
int main(void) {
  char s[] = "Hello";
  char d[6];
  printf("d after copying has '%s\'.\n", strcpy(d, s));
  return 0;
}
</code-runner>
</pre>

````{admonition} Why do we need strcpy?

Why do we need `strcpy`, when we can assign a string to another string? The following program demonstrates the problem with assigning a string to another string.

**Code with Compile-time Error**
<pre class="code-runner-wrapper">
<code-runner language="c"> 
&#35;include &lt;stdio.h&gt;
<br>
int main(void) {
  char s[] = "Hello";
  char d[6];
  d = s;  // d is not assignable because it is an array
  return 0;
}
</code-runner>
</pre>
Note that the program above will not compile. The reason is that `d` is an array, and arrays are not assignable. 

<!-- TODO: do it with pointers-->
````

#### Implementation of `strcpy`

Let's implement `strcpy`. We will name it `stringCopy`. This function should have a loop that loops over all the contents of the source string. We should copy the all the elements to the destination string including the `'\0'` at the end of the source string. Then, we should return the address of the destination string. To guard against any changes to the source string, we will use the `const` qualifier. The following is the implementation of `strcpy`, and you can download it here: {download}`stringCopy.c <../../code/chapter10/stringCopy/stringCopy.c>`.

**Code using `[]` in `stringCopy`**
<pre class="code-runner-wrapper">
<code-runner language="c" output="d after copying has 'Hello'.">
&#35;include &lt;stdio.h&gt;
&#35;include &lt;string.h&gt;
<br>
char* stringCopy(char* dest, const char* src);
<br>
int main(void) {
  char s[] = "Hello";
  char d[6];
  printf("d after copying has '%s'.\n", stringCopy(d, s));
  return 0;
}
<br>
char* stringCopy(char* dest, const char* src) {
  int ind = 0;
  <br>
  while (src[ind] != '\0') {
    dest[ind] = src[ind];
    ind++;
  }
  dest[ind] = '\0';
  return dest;
}
</code-runner>
</pre>

**Exercise.** Implement `stringCopy` using pointers only, *i.e.* without using `[]`.

**Code without using `[]` in `stringCopy`**
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="14 15 16 17 18 19 20" output="d after copying has 'Hello'.">
&#35;include &lt;stdio.h&gt;
&#35;include &lt;string.h&gt;
<br>
char* stringCopy(char* dest, const char* src);
<br>
int main(void) {
  char s[] = "Hello";
  char d[6];
  printf("d after copying has '%s'.\n", stringCopy(d, s));
  return 0;
}
<br>
char* stringCopy(char* pdest, const char* psrc) {
  char* pdestCopy = pdest;
  while (*psrc != '\0') {
    *pdestCopy = *psrc;
    pdestCopy++;
    psrc++;
  }
  *pdestCopy = '\0';
  return pdest;
}
</code-runner>
</pre>

To help with visualization, we will use the following diagram to show the values of `pdest`, `pdestCopy` and `psrc` after a few iterations of the while loop in `stringCopy`.

```{figure} ./images/strcpy-pointers.png
:alt: Showing the values of `pdestCopy` and `psrc` after a few iterations of the while loop in `stringCopy`.
:width: 400px
:align: center
:name: strcpy-pointers

Showing the values of `pdest`, `pdestCopy` and `psrc` after a few iterations of the while loop in `stringCopy`.
```

In line $15$, we check if the element at `psrc` is not the end of the source string.

In line $16$, we copy the element at `psrc` to the element at `pdestCopy`.

In line $17$, we increment `pdestCopy` to point to the next element in the destination string.

In line $18$, we increment `psrc` to point to the next element in the source string.

The while loop will exit when the element at `psrc` is the end of the source string. This is when the element at `pdestCopy` is the end of the destination string. In line $20$, we then assign the null character to the element at `pdestCopy` to terminate the destination string.

In line $14$, we copied the address of `pdest` to `pdestCopy`. This is because we want to return the address of the destination string. We cannot return the address of `pdestCopy` because it will point to the last element in the destination string after the while loop exits. We want to return the address of the first element in the destination string stored in `pdest`.


### `strncpy`

`strcpy` copies the entire source string into the destination string. This can cause problems if the destination string is not large enough to hold the source string. The function `strncpy` copies the first `n` characters of the source string into the destination string, or until it observes a `'\0'` character in the source string. The function prototype is as follows:

```{code-block} c
char* strncpy(char *dest, const char *src, size_t n);
```

The function copies `n` characters in `src` into `dest`. If `n` is larger than the size of `src`, the function will copy characters in `src` till and including the null character `\0` in the `src` string, then it will put `'\0'` for the remaining characters that should be copied into `dest`. The function returns the address of the destination string `dest`.

The following program demonstrates the use of `strncpy`:

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" output="Copied exactly 6 characters: Hello">
&#35;include &lt;stdio.h&gt;
&#35;include &lt;string.h&gt;
<br>
int main(void) {
  char d[] = "Hello world!";
  strncpy(d, "Hello", 6);
  printf("Copied exactly 6 characters: %s\n", d);
  return 0;
}
</code-runner>
</pre>

In the above code, the function `strncpy` copies 6 characters into `d`, which is the 5 characters in `"Hello"` and the null character `\0`. Hence, when printing `d`, we only see the first 5 characters in `"Hello"` till the first null character. As the figure below shows, the other characters in `"Hello world!"` are not overwritten.
  
```{figure} ./images/strncpy-6-characters.png
:alt: Copy 6 characters including the null character.
:width: 500px
:align: center
:name: special string copy 6 characters

Copy 6 characters including the null character.
```

````{admonition} Important!
:class: warning
The function `strncpy` does not add any null character to the end of the destination string by default. For example, in the following code, the destination string `d` will not be null-terminated, because we only copy 5 characters from `"Hello"` into `d`.

<pre class="code-runner-wrapper">
<code-runner language="c" output="Copied exactly 5 characters: Hello world!">
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
<br>
int main(void) {
  char d[] = "Hello world!";
  strncpy(d, "Hello", 5);
  printf("Copied exactly 5 characters: %s\n", d);
  <br>
  return 0;
}
</code-runner>
</pre>

The figure below shows that the null character `\0` in `"Hello"` is not copied to `d`, hence, when printing `d`, all characters before the null-character were printed.

```{figure} ./images/strncpy-5-characters.png
:alt: Copy 5 characters including the null character.
:width: 500px
:align: center
:name: strncpy-5-characters

Copy 5 characters without the null character.
```
````

````{admonition} If n is larger than the size of src

In the above example, if we were to copy more characters than the size of `src` into `dest`, the function will copy characters in `src` till and including the null character `\0` in the `src` string, then it will put `'\0'` for the remaining characters that should be copied into `dest`. For example, in the following code, the 7th element of `d` will have a null character `\0` as shown in the figure below. This would cause a problem if `d` did not have enough space to hold the extra null characters `\0`.

```{code-block} c
char d[] = "Hello world!";
strncpy(d, "Hello", 7);
```

```{figure} ./images/strncpy-7-characters.png
:alt: Copy 7 characters including the null character.
:width: 500px
:align: center
:name: strncpy-7-characters

Copy 7 characters with extra padding of `\0`.
```

````

## Concatenating Strings

### `strcat`

The function `strcat` concatenates the source string to the end of the destination string. The function prototype is as follows:

```{code-block} c
char* strcat(char *dest, const char *src);
```

The function concatenates the source string `src` to the end of the destination string `dest`. This means the null character of the `dest` string is overwritten by the first character of `src`. The function returns the address of the destination string `dest`. The function assumes that the destination string `dest` has enough space to hold the concatenated string.

The following program demonstrates the use of `strcat`:



```{figure} ./images/strcat-demo.png
:alt: Concatenates the source string to the end of the destination string.
:width: 1000px
:align: center
:name: string concatenate demo

Concatenates the source string to the end of the destination string.
```

**Output**
<pre>
Concatenated string: Helloworld!
</pre>

### `strncat`

The problem with `strcat` is that it concatenates the entire source string to the end of the destination string. This can cause problems if the destination string is not large enough to hold the concatenated string. For example, in the following figure, we concatenate an array with 3 elements `"No"` to an array with 2 elements starting from the null-character. The function `strcat` will concatenate the `'N'` and `'o'`, but there is no space for the `'\0`', which will cause a buffer overflow.

```{figure} ./images/strcat-issue.png
:alt: Concatenates the source string to the end of the destination string, while the destination string does not have enough space.
:width: 600px
:align: center
:name: string concatenate issue

***Error!*** Concatenates the source string to the end of the destination string, while the destination string does not have enough space
```

A safer option for concatenation is the function `strncat` that concatenates the first `n` characters, or until a `'\0'` is observed, in the source string to the end of the destination string. The function prototype is as follows:

```{code-block} c
char* strncat(char *dest, const char *src, size_t n);
```

The function concatenates the first `n` characters of the source string `src` to the end of the destination string `dest`. The null character of the `dest` string is overwritten by the first character of `src`. The function returns the address of the destination string `dest`. The function assumes that the destination string `dest` has enough space to hold the `n` characters. Opposite to `strncpy`, the function `strncat` adds a null character to the end of the destination string if it was not terminated by null.

The following program demonstrates the use of `strncat`:

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" output="strncpy null terminates the destination if it wasn't!
Concatenated string: OhN">
&#35;include &lt;stdio.h&gt;
&#35;include &lt;string.h&gt;
<br>
int main(void) {
  char s[4] = "Oh";
  s[3] = 'x'; 
  char t[] = "No";
  strncat(s, t, 1);
  if(s[3] == '\0'){
    printf("strncpy null terminates the destination if it wasn't!\n");
  }
  printf("Concatenated string: %s\n", s);
  return 0;
}
</code-runner>
</pre>

If `n` is larger than the size of `src`, and `dest` has enough space, the function will copy characters in `src` till and including the null character `\0` in the `src` string, but **opposite to `strncpy`**, it will not put `'\0'` for the remaining characters that should be copied into `dest`. 


## Comparing Strings

### `strcmp`

The function `strcmp` compares two strings. The function prototype is as follows:

```{code-block} c
int strcmp(const char *s1, const char *s2);
```

The function compares the two strings `s1` and `s2`, looking at their lexicographic order, which is the order of their appearance in the dictionary. The function returns an integer:

1. less than zero, if `s1` is found before `s2` in the dictionary,
2. equal to, if `s1` is identical to `s2`,
3. or greater than zero if `s1` is found after `s2` in the dictionary.

The function compares the strings character by character, and stops comparing when characters are not matching or when a null character `\0` is encountered in either string. The function assumes that the strings are null-terminated. 

The following program demonstrates the use of `strcmp`:

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" input="rice rice" output='Enter two strings separated by new line or white space: <b>rice rice</b>
"rice" is identical to "rice"!'>
&#35;include &lt;stdio.h&gt;
&#35;include &lt;string.h&gt;
<br>
int main(void) {
  char s1[40];
  char s2[40];
  printf("Enter two strings separated by new line or white space: ");
  scanf("%s", s1);
  scanf("%s", s2);
  if (strcmp(s1, s2) < 0) {
    printf("'%s' is before '%s' in dictionary!\n", s1, s2);
  } else if (strcmp(s1, s2) > 0) {
    printf("'%s' is after '%s' in dictionary!\n", s1, s2);
  } else if (strcmp(s1, s2) == 0) {
    printf("'%s' is identical to '%s'!\n", s1, s2);
  }
<br>
  return 0;
}
</code-runner>
</pre>

**More examples**
<pre>
Enter two strings separated by new line or white space: <b>apple book</b>
"apple" is before "book" in dictionary!
</pre>

<pre>
Enter two strings separated by new line or white space: <b>dog dig</b>
"dog" is after "dig" in dictionary!
</pre>

### `strncmp`

The function `strncmp` compares at most the first `n` characters of two strings. The function prototype is as follows:

```{code-block} c
int strncmp(const char *s1, const char *s2, size_t n);
```

The function compares at most the first `n` characters of the two strings `s1` and `s2`, looking at their lexicographic order, which is the order of their appearance in the dictionary. The comparison stops when characters are not matching or when a null character `\0` is encountered or after comparing `n` characters. Similar to `strcmp`, the function returns an integer that is less than zero, equal to zero, or greater than zero if `s1` is found before, identical to, or after `s2` in the dictionary, respectively. 

The following program demonstrates the use of `strncmp`:

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" input="grandma grandpa" output='Enter two strings separated by new line or white space: <b>grandma grandpa</b>
The first 5 character in "grandma" is identical to "grandpa"!'>
&#35;include &lt;stdio.h&gt;
&#35;include &lt;string.h&gt;
<br>
int main(void) {
  char s1[40];
  char s2[40];
  int n = 5;
  printf("Enter two strings separated by new line or white space: ");
  scanf("%s", s1);
  scanf("%s", s2);
  if (strncmp(s1, s2, n) < 0) {
    printf("'%s' is before '%s' in dictionary!\n", s1, s2);
  } else if (strncmp(s1, s2, n) > 0) {
    printf("'%s' is after '%s' in dictionary!\n", s1, s2);
  } else if (strncmp(s1, s2, n) == 0) {
    printf("The first %d character in '%s' is identical to '%s'!\n", n, s1,
           s2);
  }
<br>
  return 0;
}
</code-runner>
</pre>

## Looking for something in a string

### `strchr`

The function `strchr` searches for a character in a string. The function prototype is as follows:

```{code-block} c
char* strchr(const char *s, int c);
```

The function searches for the first occurrence of the character `c` in the string `s`. The function returns a pointer to the first occurrence of `c` in `s`. If `c` is not found in `s`, the function returns `NULL`. The function assumes that the string `s` is null-terminated.

The following program demonstrates the use of `strchr`:

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" output='The first m is found at index 6 in "Programming"'>
&#35;include &lt;stdio.h&gt;
&#35;include &lt;string.h&gt;
<br>
int main(void) {
  char s[] = "Programming";
  char c = 'm';
  int dist = strchr(s, c) - s;
  printf("The first %c is found at index %d in '%s'\n", c, dist, s);
  return 0;
}
</coder-runner>
</pre>

### `strstr`

The function `strstr` searches for a substring in a string. The function prototype is as follows:

```{code-block} c
char* strstr(const char *s1, const char *s2);
```

The function searches for the first occurrence of the string `s2` in the string `s1`. The function returns a pointer to the first occurrence of `s2` in `s1`. If `s2` is not found in `s1`, the function returns `NULL`. The function assumes that the strings `s1` and `s2` are null-terminated.

The following program demonstrates the use of `strstr`:

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" output='Printing characters after "Enjoy": Enjoy APS105!'>
&#35;include &lt;stdio.h&gt;
&#35;include &lt;string.h&gt;
<br>
int main(void) {
  char str[] = "Note: Enjoy APS105!";
  char search[] = "Enjoy";
  printf("Printing characters after '%s': %s\n", search, strstr(str, search));
  return 0;
}
</code-runner>
</pre>

## Exercise using string functions

Let's implement `strstr` function using string functions we mentioned in this section.

**Step 1: Toy example.** Say we want to look for string `"Enjoy"` in string `"Note: Enjoy APS105!"`. 

**Step 2: Think of a solution!** We can do it in several ways. One way is to look for `"Enjoy"` in the first 5 characters of `"Note: Enjoy APS105!"`, then in the next 5 characters in `"Note: Enjoy APS105!"`, and so on. We can use `strncmp` to specify the number of characters to compare. The number of characters to compare can be found using `strlen` on `"Enjoy"`. We need a pointer to save the location of the next staring character in `"Note: Enjoy APS105!"` we want to compare with `"Enjoy"`.

**Step 3: Decompose into steps.**

1. Set `char* temp` to the first character of `"Note: Enjoy APS105!"`.
2. Compare the first 5 characters of `temp` with `"Enjoy"`. 
3. If they are identical, return `temp`. 
4. If they are not identical, increment `temp` by 1.
5. If character at `temp` is not `\0`, go to step 2. Otherwise, return `NULL`.

**Step 4: Write a code.**

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="16 18 19 25" output='Printing characters after "Enjoy": Enjoy APS105!'>
&#35;include &lt;stdbool.h&gt;
&#35;include &lt;stdio.h&gt;
&#35;include &lt;string.h&gt;
<br>
char* findString(char* s1, char* s2);
<br>
int main(void) {
  char str[] = "Note: Enjoy APS105!";
  char search[] = "Enjoy";
  printf("Printing characters after '%s': %s\n", search,
         findString(str, search));
  return 0;
}
<br>
char* findString(char* s1, char* s2) {
  char* temp = s1;
  bool found = false;
  while (*temp != '\0' && !found) {
    if (strncmp(temp, s2, strlen(s2)) == 0) {
      found = true;
    } else {
      temp++;
    }
  }
  // Exit the loop if found is true or *temp is '\0'
  if (found) {
    return temp;
  } else {
    return NULL;
  }
}
</code-runner>
</pre>

In line $16$, we set `temp` to point to the first character in `s1`.

In line $19$, we compare the first 5 characters of `temp` with `"Enjoy"`. If they are identical, we set `found` to `true`. If they are not identical, we increment `temp` by 1. 

In line $18$, as long as `*temp` is pointing at the last character in `s1`, which is `\0`, and the string is not hence `found` is `false`, we continue to compare the first 5 characters of `temp` with `"Enjoy"`.

In line $25$, when we exit the loop. `found` can be `true` or `false`. If `found` is `true`, `temp` will hold the position of the first character in `s1` that is identical to substring `s2` . If `found` is `false`, then we did not find `s2` in `s1`, hence we should return `NULL`.

**Alternative solution.**

We can also look for `E` in `"Note: Enjoy APS105!"`, then starting at `'E'` compare the next substring of 5 characters in `s1` with `"Enjoy"`. If they are identical, we can return the pointer to that `'E'`. If they are not identical, we can look for the next `E` in `"Note: Enjoy APS105!"` and repeat the process. We can do so using `strchr` to find the next `E` in `"Note: Enjoy APS105!"`.

**Code**
```{code-block} c
:linenos:
:emphasize-lines: 3, 4, 5, 8, 11
char* findStringAlt(char* s1, char* s2) {
  bool found = false;
  char* foundChar = strchr(s1, s2[0]);
  while (foundChar != NULL && !found) {
    if (strncmp(foundChar, s2, strlen(s2)) == 0) {
      found = true;
    } else {
      foundChar = strchr(foundChar + 1, s2[0]);
    }
  }
  return foundChar;  // will be NULL if not found and will point to the first
                     // character of the substring found
}
```

In line $3$, we set `foundChar` to point to the first character in `s1` that is identical to the first character in `s2`.

In line $5$, we compare the first 5 characters of `foundChar` with `"Enjoy"`. If they are identical, we set `found` to `true`. 

In line $8$, if they are not identical, we start from the next character in after the character in `foundChar` by incrementing `foundChar`, and look for the next `E` in `"Note: Enjoy APS105!"`. `strchr` will return `NULL` is the character `E` is not found, and `foundChar` will be set to `NULL`.

In line $4$, if `foundChar` is not `NULL`, and `found` is still `false`, we continue to compare the first 5 characters of `foundChar` with `"Enjoy"`.

In line $11$, we exit the loop when either `found` is `true`, hence `foundChar` will point to the first character of the substring found, or `foundChar` is `NULL`, hence we did not find `s2` in `s1`. Either ways, we should return `foundChar`.

The following table lists the most commonly used string functions.

| Function | Description |
|----------|-------------|
| `strlen` | Returns the length of a string. |
| `strcpy` | Copies a string. |
| `strncpy` | Copies the first `n` characters of a string. |
| `strcat` | Concatenates two strings. |
| `strncat` | Concatenates the first `n` characters of two strings. |
| `strcmp` | Compares two strings. |
| `strncmp` | Compares the first `n` characters of two strings. |
| `strchr` | Searches for a character in a string. |
| `strstr` | Searches for a substring in a string. |


{{quiz_embed | replace("%%FILENAME%%", "chapter-10/sec-3") }}