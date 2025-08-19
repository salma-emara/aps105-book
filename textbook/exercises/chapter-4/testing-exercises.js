let parsedObject; 
  parsedObject = {
  "exercises": [
    {
      "title": "Question 1 in Winter 2022 Final Exam",
      "difficulty": "Easy",
      "type": "programming",
      "table": false,
      "multipart": false,
      "question": "Re-write the following code snippet replacing the for loop with a while loop. The changes you make should not change the functionality of the code snippet. Your code snippet should have exactly the same number of variables and the same variable names. \n\n```{code-block} c\nint result = 2;\nfor (int i = 2; i <= 989; i = i * 2) {\n  result *= i;\n}\n```\n\n",
      "starter-code": "#include <stdio.h>\n\nint main(void) {\n\n}\n",
      "answer": "#include <stdio.h>\n\nint main(void) {\n  int result = 2, i = 2;\n  while (i <= 989) {\n    result *= i;\n    i = i * 2;\n  }\n  return 0;\n}\n"
    },
    {
      "title": "Question 8 in Winter 2022 Final Exam",
      "difficulty": "Easy",
      "type": "programming",
      "table": false,
      "multipart": false,
      "question": "Write a complete C program that calculates and prints the sum of all numbers between $1$ and $999$ (inclusive) that satisfy **all** the following conditions:\n\n* The number is divisible by $9$.\n* The number is even.\n* The ten's digit of the number is *not* $7$. For example, the ten's digit in $753$ is $5$, the ten's digit of $671$ is $7$, and the ten's digit of $9$ is $0$.\n\n",
      "starter-code": "#include <stdio.h>\n\nint main(void) {\n\n}\n",
      "answer": "#include <stdio.h>\nint main(void) {\n  int sum = 0;\n  for (int number = 1; number <= 999; number++) {\n    // divisible by 9 and is even\n    if (number % 9 == 0 && number % 2 == 0) {\n      // Computes the ten's digit\n      int tenDigit = number / 10 - (number / 100) * 10;\n      if (tenDigit != 7) {\n        sum += number;\n      }\n    }\n  }\n  printf(\"%d\\n\", sum);\n  return 0;\n}\n"
    },
    {
      "title": "Modified version of Question 4 in Winter 2018 Midterm Exam",
      "difficulty": "Intermediate",
      "type": "programming",
      "table": false,
      "multipart": false,
      "question": "Write a C program that prints the most significant digit of a positive int-type integer that is taken from the user. The program should prompt the user \"Enter a number:\" and prints \"The leading digit is: \" followed by the most significant digit. \n\nFor example, if the user input is `987654321`, the program will print `9`. You can assume that the user always enters a positive integer.\n\n\n",
      "starter-code": "#include <stdio.h>\n\nint main(void) {\n\n}\n",
      "answer": "#include <stdio.h>\n\nint main(void) {\n  int number = 0;\n\n  printf(\"Enter a number: \");\n  scanf(\"%d\", &number);\n\n  int leadingDigit = 0;\n  while (number > 0) {\n    leadingDigit = number % 10;\n    number /= 10;\n  }\n\n  printf(\"The leading digit is %d\\n\", leadingDigit);\n  return 0;\n}\n"
    },
    {
      "title": "Question 11 in Winter 2018 Midterm Exam",
      "difficulty": "Challenging",
      "type": "programming",
      "table": false,
      "multipart": false,
      "question": "Write a C program that returns a randomly generated prime number between $1$ and a maximum `int`-type integer, `maxRange` (inclusive), which is provided as\nby the user as input, and is assumed to be greater than $1$. A prime number is a natural number greater than 1 that cannot be formed by multiplying two smaller natural numbers. For example, $2$, $3$, $5$, $11$, and $13$ are all prime numbers.\n\nThe program prompts the user \"Enter the maximum range: \" to enter the `maxRange` value and prints \"Random prime number generated is \" followed by the randomly generated prime number. You can assume that the user always enters a positive integer greater than $1$. You are not allowed to use arrays or pointer variables in your implementation. For convenience, you do not need to seed the random number generator.\n\n",
      "starter-code": "#include <stdbool.h>\n#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n\n}\n",
      "answer": "#include <stdbool.h>\n#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n  int maxRange = 1;\n  printf(\"Enter the maximum range: \");\n  scanf(\"%d\", &maxRange);\n\n  int primeNum = 0;\n  bool foundNotPrime = false;\n  do {\n    foundNotPrime = false;\n    primeNum =\n        rand() % maxRange + 1;  // to generated a number between 1 and maxRange\n    // check if primeNum is prime\n    // We will further discuss how to check if a number is prime in the next\n    // chapter\n    for (int i = 2; !foundNotPrime && i <= primeNum / 2; i++) {\n      if (primeNum % i == 0) {  // make sure remainder of all divisions is not 0\n                                // to confirm if a number is prime\n        foundNotPrime = true;\n      }\n    }\n    // Check special cases: to prevent 1 of becoming prime\n    if (primeNum == 1) foundNotPrime = true;\n  } while (foundNotPrime);\n\n  printf(\"Random prime number generated is %d\", primeNum);\n\n  return 0;\n}\n"
    },
    {
      "title": "Question 8 in Winter 2018 Midterm Exam",
      "difficulty": "Intermediate",
      "type": "explaination",
      "table": false,
      "multipart": false,
      "question": "Identify and correct all compile-time errors you find in the C program below. Compile-time errors are errors — not warnings — that the compiler will report when compiling the program. Each line may or may not contain compile-time errors, and there may be more than one error per line.\n\n**Code with compile-time errors**\n```{code-block} c\n:linenos:\n#include <stdio.h>\nint main(void) {\n  double a, b = 3.14;\n  do {\n    int i = 0;\n    printf(\"Enter a positive integer for offset: \n\");\n    scanf(\"%d\", &a);\n } while (i < 5 && (a < 100 || a > 1);\n int j;\n for (j = 0, j < 3, j++) {\n    y = b * j % a;\n    printf(\"%d\n\", y);\n}\n return 0;\n}\n```\n",
      "answer": " \nLine 5: the scope of `i` is only within the `{}` of the do-while loop, so it cannot be used outside the loop in the conditional statement. Hence, `i` should be declared before the do-while loop. More on scope in the next chapter.\n\nLine 8: Missing closing `)`\n\nLine 10: Commas should be semi-colon\n\nLine 11: Cannot use modulo operator with double values, should be corrected to\n`y = (int) b * j % (int) a;` (or declare variable `a` and `b` as int)\n\nLine 11: variable `y` is not declared but used here. Can be declared with `j` as `int j, y;`\n"
    }
  ]
};