# Exercises

Many of these exercises are taken from past exams of APS105 Computer Fundamentals courses at University of Toronto. The solutions are provided in the answer boxes.

Headings in this page classify the exercises into different categories: **[Easy]**, **[Intermediate]**, and **[Challenging]**. I suggest you start by easy exercises and work your way up to the challenging ones.

**Question 9 in Winter 2019 Final Exam**

Write a function, `countLetters`, that counts the number occurrences of each alphabetical letter found in a string. The function has two parameters: a string (i.e. char *) and an array of integers.

The string should not be modified and can be any length. You may assume that the string is null-terminated and all letters are lower case. The string may contain characters that are not part of the alphabet (e.g., `'0'`, `'1'`, `'!'`, `'&'`, etc). The integer array has a size of 26, one for each letter in the alphabet.

The first index corresponds to the letter `'a'`, the second index to the letter `'b'`, and so on. You may assume that, initially, all 26 elements in the array have a value of zero.

You must abide by the following constraints. Failure to meet a constraint will result in a grade of zero for this question.

1. You cannot modify the characters inside the string.
2. You cannot create any other data structures (e.g., array, linked list, etc),
3. Your function must only access valid indices of the array.
4. You **cannot call** any functions in your implementation. 

An example of one run of the program is below. You only need to implement the `countLetters` function. Assume a `main` function (that reads in a string, calls your function, and outputs the integer array) already exists. 

<pre>
Enter a sentence: hello, world
The frequency that each lower case letter appears is:
d: 1
e: 1
h: 1
1: 3
0: 2
r: 1
W: 1 
</pre>

```{code-block} c
int countLetters(char *s, int count[]) {
```

````{admonition} Answer
:class: dropdown

```{code-block} c
int countLetters(char *s, int count[]) {
    int i = 0;
    int whichLetter;
    while (s[i] != '\0') {
        if (s[i] >= 'a' && s[i] <= 'z') {
            whichLetter = s[i] - 'a';
            count[whichLetter]++;
        }
        i++;
    }
}
```
````

**Question 10 in Winter 2022 Final Exam [Intermediate]**

Write a function called `lastStringInString`, the prototype of which is provided below, that returns the pointer to the **last** occurrence of the string `s1` in the string `s2`. If the string `s1` cannot be found in the string `s2`, the function returns `NULL`. For example, if we are looking for the string `"is"` as `s1` in the string `"This is a sample string"` as `s2`, the pointer to the second `"is"` in the string `"s2"` will be returned by the function. Another example, if we are looking for the string `"the"` as `s1` in the string `s2` `"The apple"`, the function should return `NULL`. This is because `'t'` is lower case in `"the"`. 

**Note:** You can use any function from the library `string.h`, **except** for `strstr()` --- you are not allowed to use it.  

```{code-block} c
char *lastStringInString(char *s1, char *s2) {
```

````{admonition} Answer
:class: dropdown

**Solution 1**

```{code-block} c
char* lastStringInString(char* s1, char* s2) {
  char* p = s2;
  char* lastFound = NULL;
  // Alternatively, we can write the while loop as:
  // while (endOfString - p >= strlen(s2))
  // while (strlen(p) - str(s1)  >= 0)
  while (*p != '\0') {
    if (strncmp(s1, p, strlen(s1)) == 0) {
      lastFound = p;
    }
    p++;
  }
  return lastFound;
}
```

**Solution 2**
```{code-block} c
char* lastStringInStringAlt(char* s1, char* s2) {
  char* lastFound = NULL;
  for (int i = 0; i < strlen(s2); i++) {
    if (s2[i] == s1[0]) {
      int count = 0;
      for (int j = 0; j < strlen(s1) && i + j < strlen(s2); j++) {
        if (s1[j] == s2[i + j]) {
          count++;
        }
      }
      if (count == strlen(s1)) {
        lastFound = s2 + i;
      }
    }
  }
  return lastFound;
}
```

````

**Question 11 in Winter 2018 Final Exam [Intermediate]**

Write a C function called `preamble` that takes two parameters: a string `str` and an int-type integer `n`. The function will then return a new string that is dynamically allocated, and that contains at most the first `n` characters in the string `str`. For example, if `str` is `"Toronto"`, and `n` is `3`, then the function will return `"Tor"` (the first three characters in `"Toronto"`). If `str` is `"Toronto"` and `n` is `8`,
then the function will return `"Toronto"`. If `str` is NULL, the function will also return `NULL`.

```{code-block} c
char *preamble(char *str, int n) {
```

````{admonition} Answer
:class: dropdown
**Solution 1**

```{code-block} c
char* preamble(char* str, int n) {
  if (str == NULL) 
    return NULL;
  char* newString = (char*)malloc((n + 1) * sizeof(char));
  int i;
  for (i = 0; str[i] != '\0' && i < n; i++) {
    newString[i] = str[i];
  }
  newString[i] = '\0';
  return newString;
}
```

**Solution 2**
```{code-block} c
char* preamble(char* str, int n) {
  if (str == NULL) 
    return NULL;
  char* newString = (char*)malloc((n + 1) * sizeof(char));
  strncpy(newString, str, n);
  return newString;
}
```
````

**Question 11 in Winter 2017 Final Exam [Challenging]**

Write a function `char *deleteSubString(char *source, char *substring)` that takes
two strings called `source` and `substring` as its parameters. It should return a new dynamically allocated string that is constructed from the strings `source` and `substring`. The newly created and returned string should be the same as the `source` string, but with the first occurrence of the string `substring` removed. For example, if the string `source` has the value `"my toronto"`, and the string `substring` has the value `"to"`, the function will return the string `"my ronto"`. You may use any of the string-related functions in the C standard library, and may assume that `string.h` has been included.

```{code-block} c
char* deleteSubString(char* source, char* substring) {
```

````{admonition} Answer
:class: dropdown

```{code-block} c
char* deleteSubString(char* source, char* substring) {
  char* result = (char*)malloc(sizeof(strlen(source)) + 1);
  char *s, *r = result;
  bool deleted = false;
  for (s = source; *s != '\0'; s++) {
    if (strstr(s, substring) != s) {
      *r = *s;
      r++;
    } else {
      if (!deleted) {
        s = s + strlen(substring) - 1;
        deleted = true;
      } else {
        *r = *s;
        r++;
      }
    }
  }
  *r = '\0';
  return result;
}
```

````

**Question 13 in Fall 2015 Final Exam [Challenging]**

Two strings are said to be anagrams of each other if they are of the same length, and contain the same characters in a (possibly) different order. For example, `"elvis"` is an anagram of `"lives"`, and `"the morse code"` is an anagram of `"here come dots"`. 

You are to write a C function `isAnagram`, with the prototype given below, that returns `true` if the two strings `s1` and `s2` are anagrams of each other; otherwise, it returns `false`. In your code, you may modify any of the characters in `s1` and `s2`, and may use any function in the `string.h` library. You can also assume that both strings will only contain characters from the alphabet (upper case and lower case) and
the space character. Also, note that the upper case `'A'` is NOT considered as the same character as lower case `'a'`.

```{code-block} c
bool isAnagram(char *s1, char *s2) {
```

````{admonition} Answer
:class: dropdown
```{code-block} c
bool isAnagram(char* s1, char* s2) {
  if (strlen(s1) != strlen(s2)) 
    return false;
  for (int i = 0; i < strlen(s1); i++) {
    char* p = strchr(s2, s1[i]);
    if (p != NULL){
      // replace the character found from s2
      *p = '?';
    } else {
      return false;
      }
  }
  return true;
}
```

````

**Question 12 in Fall 2012 Final Exam [Challenging]**

Write a C function called `checkPlagiarism`, the prototype of which is given below, that returns `true` if the two suspected codes `code1` and `code2` have high similarity. *High similarity* is defined as matching exactly, but ignoring any spaces or newline character`\n`. For example, the function `checkPlagiarism` returns `true` when comparing the example strings  `c1` and `c2` below. You may assume that `c1` and `c2` are null-terminated strings. **Hint:** your code should return `false` as soon as it finds evidence of mis-match.

```{code-block} c
#include <stdbool.h>
#include <stdio.h>

bool checkPlagiarism(char *code1, char *code2);

int main(void) {
  char c1[] =
      "int main(void) {\n int x = 10; \n int z = x + 5; \n return 0; \n}\n";
  char c2[] =
      "int main(void) {\n int x=10; \n\n int z=x +5; \n\n\n return 0; \n}\n";
  printf("%d\n", checkPlagiarism(c1, c2));
  return 0;
}
```

````{admonition} Answer
:class: dropdown
```{code-block} c
bool checkPlagiarism(char *code1, char *code2) {
  while (*code1 != '\0' && *code2 != '\0') {
    while (*code1 == ' ' || *code1 == '\n') {
      code1++;
    }
    while (*code2 == ' ' || *code2 == '\n') {
      code2++;
    }
    if (*code1 != *code2) {
      return false;
    } else if (*code1 != '\0' &&
               *code2 != '\0') {  // we don't want to add if any is '\0'
      code1++;
      code2++;
    }
  }
  // exit when *code1 is '\0' and/or *code2 is '\0'
  if (*code1 == *code2) {  // if both are '\0'
    return true;
  } else {  // both are not '\0', make sure rest of what is not '\0' is spaces
            // or endlines
    char *checker;
    if (*code1 != '\0') {
      checker = code1;
    } else {
      checker = code2;
    }
    while (*checker != '\0' && (*checker == ' ' || *checker == '\n')) {
      checker++;
    }
    if (*checker == '\0') {
      return true;
    } else {
      return false;
    }
  }
}
```
````