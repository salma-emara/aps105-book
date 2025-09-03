let parsedObject; 
  parsedObject = {
  "exercises": [
    {
      "title": "Question 5 in Fall 2013 Final Exam",
      "difficulty": "Easy",
      "table": false,
      "multipart": false,
      "type": "tracing",
      "question": "Consider the recursive C function `factorial` below. Give the printed output of the function that is\nproduced if the function is called with an argument of 4.\n\n```{code-block} c\nint factorial(int n) {\n  printf(\"ENTER: %d\\n\", n);\n  int ret;\n  if (n == 0 || n == 1)\n    ret = 1;\n  else\n    ret = n * factorial(n - 1);\n  printf(\"EXIT: %d\\n\", n);\n  return ret;\n}\n```\n",
      "answer": "ENTER: 4\nENTER: 3\nENTER: 2\nENTER: 1\nEXIT: 1\nEXIT: 2\nEXIT: 3\nEXIT: 4\n"
    },
    {
      "title": "Question 10 in Fall 2013 Final Exam",
      "difficulty": "Intermediate",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "Write a function called `revStr` that makes use of recursion to reverse the characters of a string. The reversal should happen two elements at \na time, from the ends to the centre of the string. The function prototype is given below. Parameter `str` is the string to be reversed and \nparameter `len` is the length of the string. For example, if the function is called with the string `\"Hello\"`, it must reverse the characters \nso that the string contains `\"olleH\"`.\n",
      "starter-code": "#include <stdio.h>\n#include <string.h>\n\nvoid revStr(char *str, int len) {\n\n  // Write your function here\n\n}\n",
      "answer": "#include <stdio.h>\n#include <string.h>\n\nvoid revStr(char *str, int len) {\n  char tmp;\n  if (len < 2) return;\n  len = len - 1;\n  tmp = *str;\n  *str = str[len];\n  str[len] = tmp;\n  revStr(str + 1, len - 1);\n}\n",
      "main-function": "int main(void) {\n  char str[30];\n  scanf(\"%[^\\n]\", str);  // read entire line including spaces\n  revStr(str, strlen(str));\n  printf(\"%s\\n\", str);\n  return 0;\n}\n",
      "testcases": [
        {
          "input": [
            "Hello"
          ],
          "output": [
            "olleH"
          ]
        },
        {
          "input": [
            "Hello, World!\n"
          ],
          "output": [
            "!dlroW ,olleH\n"
          ]
        },
        {
          "input": [
            "A"
          ],
          "output": [
            "A"
          ]
        },
        {
          "input": [
            "!@#$%^&*()\n"
          ],
          "output": [
            ")(*&^%$#@!\n"
          ]
        },
        {
          "input": [
            "Hello, World! 12345\n"
          ],
          "output": [
            "54321 !dlroW ,olleH\n"
          ]
        },
        {
          "input": [
            ""
          ],
          "output": [
            ""
          ]
        },
        {
          "input": [
            "abcdefghijklmnopqrstuvwxyz\n"
          ],
          "output": [
            "zyxwvutsrqponmlkjihgfedcba\n"
          ]
        }
      ]
    },
    {
      "title": "Question 14 in Winter 2018 Final Exam",
      "difficulty": "Easy",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "Consider the following function that returns the index of a `char c` in a string `string` (*i.e.,* the position of the first `c` in the string), or returns $-1$ if `c` does not occur in `string`.\n\n```{code-block} c\nint findIndex(char *string, char c) {\n    int n = 0;\n    while (*string != c && *string != '\\0') {\n        string = string + 1;\n        ++n;\n    }\n    if (*string == '\\0')\n        return -1;\n    return n;\n}\n```\n\nWrite a C function`recursiveFindIndex(chatr *string, char c)` that does not use any loops, yet behaves like the `findIndex` function above. Your function may have additional parameters, but at the minimum must include the parameters `string` and `c`.\n",
      "starter-code": "#include <stdio.h>\n\nint recursiveFindIndex(char *string, char c) {\n\n  // Write your function here\n\n}\n",
      "answer": "#include <stdio.h>\n\nint recursiveFindIndexHelper(char *string, char c, int ind) {\n  if (string[ind] == '\\0') {\n    return -1;\n  }\n  if (string[ind] == c) {\n    return ind;\n  }\n  return recursiveFindIndexHelper(string, c, ind + 1);\n}\n\nint recursiveFindIndex(char *string, char c) {\n  return recursiveFindIndexHelper(string, c, 0);\n}\n",
      "main-function": "int main(void) {\n  char str[30];\n  char ch;\n  int index;\n\n  // Read string and character\n  while (scanf(\"%s %c\", str, &ch) == 2) {\n      index = recursiveFindIndex(str, ch);\n      printf(\"%d\\n\", index);\n  }\n\n  return 0;\n}\n",
      "testcases": [
        {
          "input": [
            "hello l\n"
          ],
          "output": [
            "2\n"
          ]
        },
        {
          "input": [
            "abcdef z\n"
          ],
          "output": [
            "-1"
          ]
        },
        {
          "input": [
            "xyz x\n"
          ],
          "output": [
            "0"
          ]
        }
      ]
    },
    {
      "title": "Question 11 in Winter 2022 Final Exam",
      "difficulty": "Challenging",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "Write a recursive function called `compareLines` that compares two strings, `lineOne` and `lineTwo` and returns `true` if the strings are the same and `false` otherwise. When comparing the two strings, space characters (`' '`) and period characters (`'.'`) are not considered as valid characters and should be ignored. If the strings do not have the same number of valid characters, the function should return `false`.\n\n\n**Example 1:**\n\nIf `lineOne = \"Hello.everyone.\"` and `lineTwo = \"Hello ..every.one.\"`, `compareLines` will return true as the valid characters are the same and existing in **both** `lineOne` and `lineTwo`.\n\n\n**Example 2:**\n\nIf `lineOne = \"Hello everyone\"` and `lineTwo = \"Hello! everyone\"`, `compareLines` will return false as the valid characters are not the same. `lineOne` does not have a `!` and `lineTwo` has a `!`.\n\n\n**Note:** Solutions that do not use recursion will receive 0 marks.\n",
      "starter-code": "#include <stdio.h>\n#include <stdbool.h>\n\nbool compareLines(const char* lineOne, const char* lineTwo) {\n\n  // Write your function here\n\n}\n",
      "answer": "bool compareLines(const char* lineOne, const char* lineTwo) {\n  if (*lineOne == ' ' || *lineOne == '.') {\n    lineOne++;\n    return compareLines(lineOne, lineTwo);\n  }\n  if (*lineTwo == ' ' || *lineTwo == '.') {\n    lineTwo++;\n    return compareLines(lineOne, lineTwo);\n  }\n\n  if (!*lineOne && !*lineTwo) {\n    return true;\n  }\n\n  if (*lineOne && *lineTwo) {\n    if (*lineOne == *lineTwo) {\n      lineOne++;\n      lineTwo++;\n    } else {\n      return false;\n    }\n    return compareLines(lineOne, lineTwo);\n  }\n\n  return false;\n}\n",
      "main-function": "int main(void) {\n  char lineOne[30], lineTwo[30];\n\n  // Read two lines from input\n  fgets(lineOne, sizeof(lineOne), stdin);\n  fgets(lineTwo, sizeof(lineTwo), stdin);\n\n  // Remove trailing newline characters\n  int i = 0;\n  while (lineOne[i] != '\\0') { if (lineOne[i] == '\\n') lineOne[i] = '\\0'; i++; }\n  i = 0;\n  while (lineTwo[i] != '\\0') { if (lineTwo[i] == '\\n') lineTwo[i] = '\\0'; i++; }\n\n  printf(\"%s\\n\", compareLines(lineOne, lineTwo) ? \"true\" : \"false\");\n\n  return 0;\n}\n",
      "testcases": [
        {
          "input": [
            "Hello.everyone.\nHello ..every.one.\n"
          ],
          "output": [
            "true"
          ]
        },
        {
          "input": [
            "APS105\nAPS 105"
          ],
          "output": [
            "true"
          ]
        },
        {
          "input": [
            "H3110, W0r1d\nH3ll0, W0r!d"
          ],
          "output": [
            "false"
          ]
        },
        {
          "input": [
            "Mismatch123!\nMismatch123?"
          ],
          "output": [
            "false"
          ]
        }
      ]
    }
  ]
};