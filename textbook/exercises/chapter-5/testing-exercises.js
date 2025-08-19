let parsedObject; 
  parsedObject = {
  "exercises": [
    {
      "title": "Question 5 in Winter 2020 Midterm Exam",
      "difficulty": "Easy",
      "table": false,
      "multipart": false,
      "type": "tracing",
      "question": "Write the output of the following program.\n",
      "question-code": "#include <stdio.h>\n\nvoid skipSpace(int n) {\n  for (int i = 1; i <= n; i++) printf(\" \");\n}\n\nvoid printLeft(int n) {\n  for (int i = 1; i <= n; i++) printf(\"/\");\n}\n\nvoid printRight(int n) {\n  for (int i = 1; i <= n; i++) printf(\"\\\\\");\n}\n\nint main(void) {\n  const int TSize = 5;\n  int i;\n  skipSpace(TSize);\n  printf(\"*\\n\");\n  for (i = 0; i < TSize - 2; i++) {\n    skipSpace(TSize - 1 - i);\n    printLeft(i + 1);\n    printf(\"|\");\n    printRight(i + 1);\n    printf(\"\\n\");\n  }\n  skipSpace(TSize);\n  printf(\"|\");\n  return 0;\n}\n",
      "answer": "     *\n    /|\\\n   //|\\\\\n  ///|\\\\\\\n     |\n"
    },
    {
      "title": "Question 4 in Winter 2022 Midterm Exam",
      "difficulty": "Easy",
      "type": "function programming",
      "table": false,
      "multipart": false,
      "question": "The following function is called with three distinct characters and returns the middle character, e.g., if 'a', 'b', and 'c' is passed as arguments to the function, it returns 'b'. Rewrite this function such that it only uses one return and one if statement.\n",
      "question-code": "char median(char a, char b, char c) {\n  if (a < b) {\n    if (b < c) {\n      return b;\n    } else if (a < c) {\n      return c;\n    } else {\n      return a;\n    }\n  }\n  if (c < b) {\n    return b;\n  }\n  if (a < c) {\n    return a;\n  }\n  return c;\n}\n",
      "starter-code": "#include <stdio.h>\n\nchar median(char a, char b, char c) {\n\n}\n",
      "answer": "#include <stdio.h>\n\nchar median(char a, char b, char c) {\n  char result = a;\n  if ((a < b && b < c) || (c < b && b < a)) {\n    result = b;\n  } else if ((a < c && c < b) || (b < c && c < a)) {\n    result = c;\n  }\n  return result;\n}\n",
      "main-function": "int main(void) {\n}\n"
    },
    {
      "title": "Question 11 in Fall 2015 Midterm Exam",
      "difficulty": "Intermediate",
      "type": "function programming",
      "table": false,
      "multipart": false,
      "question": "Write a C function `reverseDigits`, the prototype of which is given below, that takes an integer argument value, and returns an integer with its digits reversed. For example, if the argument is `1234`, the function will return `4321`.\n",
      "starter-code": "#include <stdio.h>\n\nint reverseDigits(int value) {\n\n}\n",
      "answer": "#include <stdio.h>\n\nint reverseDigits(int value) {\n  int sum = 0, lastDigit;\n  while (value != 0) {\n    lastDigit = value % 10;\n    sum = sum * 10 + lastDigit;\n    value = value / 10;\n  }\n  return sum;\n}\n",
      "main-function": "int main(void) {\n}\n"
    },
    {
      "title": "Question 12 in Fall 2015 Midterm Exam",
      "difficulty": "Challenging",
      "type": "programming",
      "table": false,
      "multipart": false,
      "question": "In 1706, John Machin, then a professor in London UK, devised a formula for calculating $\\pi$:\n\n$\\frac{\\pi}{4} = 4 \\cdot \\arctan(\\frac{1}{5}) − \\arctan(\\frac{1}{239})$\n\nwhere the `arctan` values can be calculated using the following formula:\n\n$\\arctan(x) = x − \\frac{x^3}{3} + \\frac{x^5}{5} - \\frac{x^7}{7} + \\frac{x^9}{9} \\dots - \\frac{x^{299}}{299} + \\frac{x^{301}}{301}$\n\nWrite a C program that calculates and prints $\\\\pi$ using this method, printing $10$ digits after the decimal point. You must define your own function called `arctan` to compute the `arctan` values, and you are not allowed to use the `atan` function from the `math` library. When your program is run, its output should be (up to 10 decimal places):\n\n<pre>\nPi = 3.1415926536\n</pre>\n",
      "starter-code": "#include <stdio.h>\n\nint main(void) {\n\n}\n",
      "answer": "#include <stdio.h>\n\ndouble arctan(double x) {\n  int sign = 1;\n  double sum = 0;\n  for (int i = 1; i <= 301; i += 2) {\n    sum += sign * pow(x, i) / i;\n    if (sign == 1)\n      sign = -1;\n    else\n      sign = 1;\n    // or sign = -sign;\n  }\n  return sum;\n}\nint main(void) {\n  printf(\"Pi = %.10lf\\n\", (4 * arctan(1 / 5.0) - arctan(1 / 239.0)) * 4);\n  return 0;\n}\n"
    },
    {
      "title": "Question 9 in Winter 2020 Midterm Exam",
      "difficulty": "Challenging",
      "type": "function programming",
      "table": false,
      "multipart": false,
      "question": "A pythagorean triple is a triple of integers $(x, y, z)$ such that $x^2 + y^2 = z^2$. \n\nComplete this function that takes a single positive integer `x` as an argument and prints three positive integer values `x`, `y` and `z` such that:\n1. $x^2 + y^2 = z^2$\n2. $y > 0$ and $y < 100$\n3. $y < z$.\n\nIf there is no triple that satisfies these conditions print “no solution exists.”\n\n",
      "starter-code": "#include <stdio.h>\n\nvoid pythagoreanTriples (int x) {\n}\n",
      "answer": "#include <stdio.h>\n\nvoid pythagoreanTriples(int x) {\n  for (int y = 1; y < 100; y++) {\n    int zz = x * x + y * y;\n    int z = sqrt(x * x + y * y);\n    if ((z > y) && (sqrt(zz) == z)) {\n      printf(\"x = %d, y = %d, z = %d\\n\", x, y, z);\n      return;\n    }\n  }\n  printf(\"no solution exists.\\n\");\n}\n",
      "main-function": "int main(void) {\n}\n"
    }
  ]
};