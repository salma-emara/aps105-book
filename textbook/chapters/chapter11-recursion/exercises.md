# Exercises

Many of these exercises are taken from past exams of APS105 Computer Fundamentals courses at University of Toronto. The solutions are provided in the answer boxes.

Headings in this page classify the exercises into different categories: **[Easy]**, **[Intermediate]**, and **[Challenging]**. I suggest you start by easy exercises and work your way up to the challenging ones.

**Question 5 in Fall 2013 Final Exam [Easy]**

Consider the recursive C function `factorial` below. Give the printed output of the function that is
produced if the function is called with an argument of 4.

```{code-block} c
int factorial(int n) {
  printf("ENTER: %d\n", n);
  int ret;
  if (n == 0 || n == 1)
    ret = 1;
  else
    ret = n * factorial(n - 1);
  printf("EXIT: %d\n", n);
  return ret;
}
```

````{admonition} Answer
:class: dropdown
<pre>
ENTER: 4
ENTER: 3
ENTER: 2
ENTER: 1
EXIT: 1
EXIT: 2
EXIT: 3
EXIT: 4
</pre>
````

**Question 10 in Fall 2013 Final Exam [Intermediate]**

Write a function called `revStr` that makes use of recursion to reverse the characters of a string. The reversal should happen two elements at a time, from the ends to the centre of the string. The function prototype is given below. Parameter `str` is the string to be reversed and parameter `len` is the length of the string. For example, if the function is called with the string `"Hello"`, it must reverse the characters so that the string contains `"olleH"`.

```{code-block} c
void revStr(char *str, int len);
```

````{admonition} Answer
:class: dropdown
```{code-block} c
void revStr(char *str, int len) {
  char tmp;
  if (len < 2) return;
  len = len - 1;
  tmp = *str;
  *str = str[len];
  str[len] = tmp;
  revStr(str + 1, len - 1);
}
```
````



**Question 14 in Winter 2018 Final Exam [Easy]**

Consider the following function that returns the index of a `char c` in a string `string` (*i.e.,* the position of the first `c` in the string), or returns $-1$ if `c` does not occur in `string`.

```{code-block} c
int findIndex(char *string, char c) {
    int n = 0;
    while (*string != c && *string != '\0') {
        string = string + 1;
        ++n;
    }
    if (*string == '\0')
        return -1;
    return n;
}
```

Write a C function`recursiveFindIndex(chatr *string, char c)` that does not use any loops, yet behaves like the `findIndex` function above. Your function may have additional parameters, but at the minimum must include the parameters `string` and `c`.

````{admonition} Answer
:class: dropdown
```{code-block} c 
int recursiveFindIndexHelper(char *string, char c, int ind) {
  if (string[ind] == '\0') {
    return -1;
  }
  if (string[ind] == c) {
    return ind;
  }
  return recursiveFindIndexHelper(string, c, ind + 1);
}

int recursiveFindIndex(char *string, char c) {
  return recursiveFindIndexHelper(string, c, 0);
}
```
````

**Question 11 in Winter 2022 Final Exam [Challenging]**

Write a recursive function called `compareLines` that compares two strings, `lineOne` and `lineTwo` and returns `true` if the strings are the same and `false` otherwise. When comparing the two strings, space characters (`' '`) and period characters (`'.'`) are not considered as valid characters and should be ignored. If the strings do not have the same number of valid characters, the function should return `false`.


**Example 1:**

If `lineOne = "Hello.everyone."` and `lineTwo = "Hello ..every.one."`, `compareLines` will return true as the valid characters are the same and existing in **both** `lineOne` and `lineTwo`.


**Example 2:**

If `lineOne = "Hello everyone"` and `lineTwo = "Hello! everyone"`, `compareLines` will return false as the valid characters are not the same. `lineOne` does not have a `!` and `lineTwo` has a `!`.


**Note:** Solutions that do not use recursion will receive 0 marks.

```{code-block} c
bool compareLines(const char *lineOne, const char *lineTwo);
```

````{admonition} Answer
:class: dropdown
```{code-block} c
bool compareLines(const char* lineOne, const char* lineTwo) {
  if (*lineOne == ' ' || *lineOne == '.') {
    lineOne++;
    return compareLines(lineOne, lineTwo);
  }
  if (*lineTwo == ' ' || *lineTwo == '.') {
    lineTwo++;
    return compareLines(lineOne, lineTwo);
  }

  if (!*lineOne && !*lineTwo) {
    return true;
  }

  if (*lineOne && *lineTwo) {
    if (*lineOne == *lineTwo) {
      lineOne++;
      lineTwo++;
    } else {
      return false;
    }
    return compareLines(lineOne, lineTwo);
  }

  return false;
}
```
````

In-progress!