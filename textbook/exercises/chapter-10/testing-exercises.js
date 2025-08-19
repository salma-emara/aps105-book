let parsedObject; 
  parsedObject = {
  "exercises": [
    {
      "title": "Question 9 in Winter 2019 Final Exam",
      "difficulty": "Intermediate",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "Write a function, `countLetters`, that counts the number occurrences of each alphabetical letter found in a string. The function has two parameters: a string (i.e. char *) and an array of integers.\n\nThe string should not be modified and can be any length. You may assume that the string is null-terminated and all letters are lower case. The string may contain characters that are not part of the alphabet (e.g., `'0'`, `'1'`, `'!'`, `'&'`, etc). The integer array has a size of 26, one for each letter in the alphabet.\n\nThe first index corresponds to the letter `'a'`, the second index to the letter `'b'`, and so on. You may assume that, initially, all 26 elements in the array have a value of zero.\n\nYou must abide by the following constraints. Failure to meet a constraint will result in a grade of zero for this question.\n\n1. You cannot modify the characters inside the string.\n2. You cannot create any other data structures (e.g., array, linked list, etc),\n3. Your function must only access valid indices of the array.\n4. You **cannot call** any functions in your implementation. \n\nAn example of one run of the program is below. You only need to implement the `countLetters` function. Assume a `main` function (that reads in a string, calls your function, and outputs the integer array) already exists. \n\n<pre>\nEnter a sentence: hello, world\nThe frequency that each lower case letter appears is:\nd: 1\ne: 1\nh: 1\n1: 3\n0: 2\nr: 1\nW: 1 \n</pre>\n",
      "starter-code": "#include <stdio.h>\n#include <string.h>\n\nint countLetters(char *s, int count[]) {\n\n  // Write your function here\n\n}\n",
      "answer": "#include <stdio.h>\n#include <string.h>\n\nint countLetters(char *s, int count[]) {\n    int i = 0;\n    int whichLetter;\n    while (s[i] != '\\0') {\n        if (s[i] >= 'a' && s[i] <= 'z') {\n            whichLetter = s[i] - 'a';\n            count[whichLetter]++;\n        }\n        i++;\n    }\n}\n",
      "main-function": "int main(void) {\n}\n"
    },
    {
      "title": "Question 10 in Winter 2022 Final Exam",
      "difficulty": "Intermediate",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "Write a function called `lastStringInString`, the prototype of which is provided below, that returns the pointer to the **last** occurrence of the string `s1` in the string `s2`. If the string `s1` cannot be found in the string `s2`, the function returns `NULL`. For example, if we are looking for the string `\"is\"` as `s1` in the string `\"This is a sample string\"` as `s2`, the pointer to the second `\"is\"` in the string `\"s2\"` will be returned by the function. Another example, if we are looking for the string `\"the\"` as `s1` in the string `s2` `\"The apple\"`, the function should return `NULL`. This is because `'t'` is lower case in `\"the\"`. \n\n**Note:** You can use any function from the library `string.h`, **except** for `strstr()` --- you are not allowed to use it.  \n",
      "starter-code": "#include <stdio.h>\n#include <string.h>\n\nchar* lastStringInString(char* s1, char* s2) {\n\n  // Write your function here\n\n}\n",
      "answer": "// Solution 1\nchar* lastStringInString(char* s1, char* s2) {\n  char* p = s2;\n  char* lastFound = NULL;\n  // Alternatively, we can write the while loop as:\n  // while (endOfString - p >= strlen(s2))\n  // while (strlen(p) - str(s1)  >= 0)\n  while (*p != '\\0') {\n    if (strncmp(s1, p, strlen(s1)) == 0) {\n      lastFound = p;\n    }\n    p++;\n  }\n  return lastFound;\n}\n\n// Solution 2\nchar* lastStringInStringAlt(char* s1, char* s2) {\n  char* lastFound = NULL;\n  for (int i = 0; i < strlen(s2); i++) {\n    if (s2[i] == s1[0]) {\n      int count = 0;\n      for (int j = 0; j < strlen(s1) && i + j < strlen(s2); j++) {\n        if (s1[j] == s2[i + j]) {\n          count++;\n        }\n      }\n      if (count == strlen(s1)) {\n        lastFound = s2 + i;\n      }\n    }\n  }\n  return lastFound;\n}\n",
      "main-function": "int main(void) {\n}\n"
    },
    {
      "title": "Question 11 in Winter 2018 Final Exam",
      "difficulty": "Intermediate",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "Write a C function called `preamble` that takes two parameters: a string `str` and an int-type integer `n`. The function will then return a new string that is dynamically allocated, and that contains at most the first `n` characters in the string `str`. For example, if `str` is `\"Toronto\"`, and `n` is `3`, then the function will return `\"Tor\"` (the first three characters in `\"Toronto\"`). If `str` is `\"Toronto\"` and `n` is `8`,\nthen the function will return `\"Toronto\"`. If `str` is NULL, the function will also return `NULL`.\n",
      "starter-code": "#include <stdio.h>\n#include <string.h>\n\nchar *preamble(char *str, int n) {\n\n  // Write your function here\n\n}\n",
      "answer": "// Solution 1\nchar* preamble(char* str, int n) {\n  if (str == NULL) \n    return NULL;\n  char* newString = (char*)malloc((n + 1) * sizeof(char));\n  int i;\n  for (i = 0; str[i] != '\\0' && i < n; i++) {\n    newString[i] = str[i];\n  }\n  newString[i] = '\\0';\n  return newString;\n}\n\n// Solution 2\nchar* preamble(char* str, int n) {\n  if (str == NULL) \n    return NULL;\n  char* newString = (char*)malloc((n + 1) * sizeof(char));\n  strncpy(newString, str, n);\n  newString[n] = '\\0';\n  return newString;\n}\n",
      "main-function": "int main(void) {\n}\n"
    },
    {
      "title": "Question 11 in Winter 2017 Final Exam",
      "difficulty": "Challenging",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "Write a function `char *deleteSubString(char *source, char *substring)` that takes\ntwo strings called `source` and `substring` as its parameters. It should return a new dynamically allocated string that is constructed from the strings `source` and `substring`. \nThe newly created and returned string should be the same as the `source` string, but with the first occurrence of the string `substring` removed. For example, if the string `source` \nhas the value `\"my toronto\"`, and the string `substring` has the value `\"to\"`, the function will return the string `\"my ronto\"`. You may use any of the string-related functions in the\nC standard library, and may assume that `string.h` has been included.\n",
      "starter-code": "#include <stdio.h>\n#include <string.h>\n\nchar* deleteSubString(char* source, char* substring) {\n\n  // Write your function here\n\n}\n",
      "answer": "char* deleteSubString(char* source, char* substring) {\n  char* result = (char*)malloc(sizeof(strlen(source)) + 1);\n  char *s, *r = result;\n  bool deleted = false;\n  for (s = source; *s != '\\0'; s++) {\n    if (strstr(s, substring) != s) {\n      *r = *s;\n      r++;\n    } else {\n      if (!deleted) {\n        s = s + strlen(substring) - 1;\n        deleted = true;\n      } else {\n        *r = *s;\n        r++;\n      }\n    }\n  }\n  *r = '\\0';\n  return result;\n}\n",
      "main-function": "int main(void) {\n}\n"
    },
    {
      "title": "Question 13 in Fall 2015 Final Exam",
      "difficulty": "Challenging",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "Two strings are said to be anagrams of each other if they are of the same length, and contain the same characters in a (possibly) different order. For example, \n`\"elvis\"` is an anagram of `\"lives\"`, and `\"the morse code\"` is an anagram of `\"here come dots\"`. \n\nYou are to write a C function `isAnagram`, with the prototype given below, that returns `true` if the two strings `s1` and `s2` are anagrams of each other; otherwise, \nit returns `false`. In your code, you may modify any of the characters in `s1` and `s2`, and may use any function in the `string.h` library. You can also assume that \nboth strings will only contain characters from the alphabet (upper case and lower case) and\nthe space character. Also, note that the upper case `'A'` is NOT considered as the same character as lower case `'a'`.\n\n",
      "starter-code": "#include <stdio.h>\n#include <string.h>\n\nbool isAnagram(char* s1, char* s2) {\n\n  // Write your function here\n\n}\n",
      "answer": "bool isAnagram(char* s1, char* s2) {\n  if (strlen(s1) != strlen(s2)) \n    return false;\n  for (int i = 0; i < strlen(s1); i++) {\n    char* p = strchr(s2, s1[i]);\n    if (p != NULL){\n      // replace the character found from s2\n      *p = '?';\n    } else {\n      return false;\n      }\n  }\n  return true;\n}\n",
      "main-function": "int main(void) {\n}\n"
    },
    {
      "title": "Question 12 in Fall 2012 Final Exam",
      "difficulty": "Challenging",
      "table": false,
      "multipart": false,
      "type": "programming",
      "question": "Write a C function called `checkPlagiarism`, the prototype of which is given below, that returns `true` if the two suspected codes `code1` and `code2` \nhave high similarity. *High similarity* is defined as matching exactly, but ignoring any spaces or newline character`\n`. For example, the \nfunction `checkPlagiarism` returns `true` when comparing the example strings  `c1` and `c2` below. You may assume that `c1` and `c2` are \nnull-terminated strings. \n\n**Hint:** your code should return `false` as soon as it finds evidence of mis-match.\n",
      "starter-code": "#include <stdbool.h>\n#include <stdio.h>\n\nbool checkPlagiarism(char *code1, char *code2);\n\nint main(void) {\n  char c1[] =\n      \"int main(void) {\\n int x = 10; \\n int z = x + 5; \\n return 0; \\n}\\n\";\n  char c2[] =\n      \"int main(void) {\\n int x=10; \\n\\n int z=x +5; \\n\\n\\n return 0; \\n}\\n\";\n  printf(\"%d\\n\", checkPlagiarism(c1, c2));\n  return 0;\n}\n\n",
      "answer": "bool checkPlagiarism(char *code1, char *code2) {\n  while (*code1 != '\\0' && *code2 != '\\0') {\n    while (*code1 == ' ' || *code1 == '\\n') {\n      code1++;\n    }\n    while (*code2 == ' ' || *code2 == '\\n') {\n      code2++;\n    }\n    if (*code1 != *code2) {\n      return false;\n    } else if (*code1 != '\\0' &&\n               *code2 != '\\0') {  // we don't want to add if any is '\\0'\n      code1++;\n      code2++;\n    }\n  }\n  // exit when *code1 is '\\0' and/or *code2 is '\\0'\n  if (*code1 == *code2) {  // if both are '\\0'\n    return true;\n  } else {  // both are not '\\0', make sure rest of what is not '\\0' is spaces\n            // or endlines\n    char *checker;\n    if (*code1 != '\\0') {\n      checker = code1;\n    } else {\n      checker = code2;\n    }\n    while (*checker != '\\0' && (*checker == ' ' || *checker == '\\n')) {\n      checker++;\n    }\n    if (*checker == '\\0') {\n      return true;\n    } else {\n      return false;\n    }\n  }\n}\n"
    }
  ]
};