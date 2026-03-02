let parsedObject; 
  parsedObject = {
  "exercises": [
    {
      "question-id": "chapter-6-Q1",
      "title": "Question 9 in Fall 2013 Midterm Exam",
      "difficulty": "Easy",
      "type": "explaination",
      "table": true,
      "multipart": false,
      "question": "Determine the values of the variables `W`, `X`, `Y` and `Z` after the function `SumEm` executes in the main program of the following C program:\n\n```{code-block} c\n#include <stdio.h>\nvoid SumEm(int *A, int B, int C, int *D) {\n  if (B > C) {\n    *A = B + *D;\n    *D = C;\n  } else {\n    *A = C + *D;\n    *D = B;\n  }\n  return;\n}\nint main(void) {\n  int W, X, Y, Z;\n  W = 0;\n  X = 5;\n  Y = 8;\n  Z = 10;\n  SumEm(&W, X, Y, &Z);\n  return 0;\n}\n```\n\n",
      "headers": [
        "Variable",
        "Value"
      ],
      "rows": [
        [
          "W",
          ""
        ],
        [
          "X",
          ""
        ],
        [
          "Y",
          ""
        ],
        [
          "Z",
          ""
        ]
      ],
      "answer": [
        [
          "W",
          "18"
        ],
        [
          "X",
          "5"
        ],
        [
          "Y",
          "8"
        ],
        [
          "Z",
          "5"
        ]
      ]
    },
    {
      "question-id": "chapter-6-Q2",
      "title": "Question 1 in Winter 2017 Final Exam",
      "difficulty": "Easy",
      "type": "explaination",
      "table": false,
      "multipart": false,
      "question": "Find and correct all compile-time errors (mistakes that would cause compilation or that would cause the ‘build’ to fail) in the following C program. Your answer should both identify what the error is, and what the correction should be. Marks will be deducted if you identify correct items as compile-time errors. \n\n```{code-block} c\n#include <stdio.h>\nint main(void) {\n  int j, k;\n  int *i = &j;\n  for (*i = 0; *i < 10, *i = *i + 1) {\n    scanf(\"%d\", &k);\n    printf(\"%d\", (*i) * (*i) * (*i));\n  }\n}\n```\n\n",
      "answer": "Corrected condition and increment fields: \n`*i < 10, *i = *i + 1` to `*i < 10; *i = *i + 1`\n\n\n**Full Code:**\n<pre>\n#include <stdio.h>\n\nint main(void) {\n  int j, k;\n  int *i = &j;\n  for (*i = 0; *i < 10; *i = *i + 1) {\n    scanf(\"%d\", &k);\n    printf(\"%d\", (*i) * (*i) * (*i));\n  }\n}\n</pre>\n\n"
    },
    {
      "question-id": "chapter-6-Q3",
      "title": "Question 1 in Fall 2014 Midterm Exam",
      "difficulty": "Intermediate",
      "table": false,
      "multipart": false,
      "type": "tracing",
      "question": "What will be printed when the following C program is executed?\n\n```{code-block} c\nint main(void) {\n  int first = 1, second = 10;\n  int *pointerToFirst, *pointerToSecond;\n\n  pointerToFirst = &first;\n  pointerToSecond = &second;\n  *pointerToFirst = *pointerToSecond - *pointerToFirst;\n  *pointerToSecond = *pointerToSecond - *pointerToFirst;\n  *pointerToFirst = *pointerToSecond + *pointerToFirst;\n  printf(\"%d, %d\\n\", first, second);\n}\n```\n",
      "answer": "10, 1\n"
    },
    {
      "question-id": "chapter-6-Q4",
      "title": "Question 6 in Winter 2017 Midterm Exam",
      "difficulty": "Easy",
      "type": "explaination",
      "table": true,
      "multipart": false,
      "question": "Consider the following code, which uses pointers. What are the values of the variables `a` and `b` after this code is executed?\n\n```{code-block} c\nint a, b, c, d;\nint *e, *f;\na = 5;\nb = 6;\ne = &c;\nf = &d;\n*e = a + b;\n*f = *e + b;\ne = &a;\nf = &b;\n*e = c + d;\n*f = a + b;\n```\n\n",
      "headers": [
        "Variable",
        "Value"
      ],
      "rows": [
        [
          "a",
          ""
        ],
        [
          "b",
          ""
        ]
      ],
      "answer": [
        [
          "a",
          "28"
        ],
        [
          "b",
          "34"
        ]
      ]
    },
    {
      "question-id": "chapter-6-Q5",
      "title": "Question 5 in Winter 2018 Midterm Exam",
      "difficulty": "Intermediate",
      "table": false,
      "multipart": false,
      "type": "tracing",
      "question": "Write the output of the following program.\n```{code-block} c\n#include <stdio.h>\nint main(void) {\n  int *p, x;\n  int fiveInt[5] = {1, 2, 3, 4, 5};\n  int *q;\n  p = NULL;\n  q = fiveInt;\n  x = 6;\n  p = &x;\n  printf(\"A: %d %d\\n\", x, *p);\n  *(q + 3) = *p;\n  *p = *q + *(q + 3);\n  printf(\"B: %d %d %d\\n\", x, *p, *q);\n  return 0;\n}\n```\n",
      "answer": "A: 6 6\nB: 7 7 1\n"
    },
    {
      "question-id": "chapter-6-Q6",
      "title": "Modified version of Question 6 in Winter 2018 Midterm Exam",
      "difficulty": "Intermediate",
      "type": "explaination",
      "multipart": false,
      "table": false,
      "question": "Identify the potential runtime error in the following code and briefly explain how you would fix it.\n\n```{code-block} c\n#include <stdio.h>\nint higher(int *m, int *n) {\n  int isHigher;\n  if (m >= n)\n    isHigher = m;\n  else\n    isHigher = n;\n  return &isHigher;\n}\nint main(void) {\n  int c = 9, d = 8;\n  int isHigher;\n  isHigher = higher(&c, &d);\n  printf(\"%d\\n\", isHigher);\n  return 0;\n}\n```\n",
      "answer": " **Problem:** In the function, pointer is assigned to a standard variable. \n\n\n**Correction:**\n\n<pre>\nint higherCorrect(int *m, int *n) {\n  int isHigher;\n  if (*m >= *n)\n    isHigher = *m;\n  else\n    isHigher = *n;\n  return isHigher;\n}\n</pre>\n\n"
    },
    {
      "question-id": "chapter-6-Q7",
      "title": "Question 9 in Winter 2019 Midterm Exam",
      "difficulty": "Intermediate",
      "type": "programming",
      "table": false,
      "multipart": false,
      "question": "There are $0.3048$ metres in a foot, $100$ centimetres in a metre, and $12$ inches in a foot. Write a program that will accept, as input, a length in feet and inches. **You do not have to check for valid input** -- assume the user enters positive, non-fractional values for the feet and inches. The program\nwill output the equivalent length in metres and centimetres **(rounded to the nearest centimetre)**.\n\nYour code should include four functions: one for input, one for output, one to perform the calculation, and main. The function prototypes are below. For full marks, your code should not use\nany global variables.\n\n```{code-block} c\nvoid getInput(int *outFeet, int *outInches);\nvoid printOutput(int feet, int inches, int metres, int centimetres);\nvoid convert(int feet, int inches, int *outMetres, int *outCentimetres);\n```\n\nAn example of one run of the program is below:\n<pre>\nPlease enter the feet and inches to convert: <b>5 10</b>\n5 feet 10 inches is 1 metres and 78 centimetres\n</pre>\n\n",
      "starter-code": "#include <math.h>\n#include <stdio.h>\n\nint main(void) {\n\n  // Your Code Here\n\n}\n",
      "answer": "#include <math.h>\n#include <stdio.h>\n\nvoid getInput(int *outFeet, int *outInches) {\n  printf(\"Please enter the feet and inches to convert: \");\n  scanf(\"%d %d\", outFeet, outInches);\n}\n\nvoid printOutput(int feet, int inches, int metres, int centimetres) {\n  printf(\"%d feet %d inches is %d metres and %d centimetres.\\n\", feet, inches,\n         metres, centimetres);\n}\n\nvoid convert(int feet, int inches, int *outMetres, int *outCentimetres) {\n  double length = feet + (inches / 12.0);\n  double metres = length * 0.3048;\n  *outMetres = metres;  // truncate to integer\n  *outCentimetres = rint((metres - *outMetres) * 100);\n}\n\nint main(void) {\n  int feet, inches;\n  getInput(&feet, &inches);\n  int metres, centimetres;\n  convert(feet, inches, &metres, &centimetres);\n  printOutput(feet, inches, metres, centimetres);\n  return 0;\n}\n",
      "testcases": [
        {
          "input": [
            "5 10\n"
          ],
          "output": [
            "Please enter the feet and inches to convert: \n 5 feet 10 inches is 1 metres and 78 centimetres."
          ]
        },
        {
          "input": [
            "0 11\n"
          ],
          "output": [
            "Please enter the feet and inches to convert: \n 0 feet 11 inches is 0 metres and 28 centimetres.\n"
          ]
        },
        {
          "input": [
            "0 0\n"
          ],
          "output": [
            "Please enter the feet and inches to convert: \n 0 feet 0 inches is 0 metres and 0 centimetres.\n"
          ]
        }
      ]
    },
    {
      "question-id": "chapter-6-Q8",
      "title": "Question 13 in Winter 2014 Midterm Exam",
      "difficulty": "Challenging",
      "type": "programming",
      "table": false,
      "multipart": false,
      "question": "In this question, you are to complete the code for a function and its calling in a main program. The function is called `sumAndProductOfMultiples`. It takes integers `multiple1` and `multiple2`, and a maximum bound `max` as input, and computes both the sum and the product of all the positive integers less than `max` that are multiples of either `multiple1` or `multiple2`.\n\nFor example, if `multiple1 = 3`, `multiple2 = 5`, and `max = 10`, the positive integers less than $10$ that are multiples of either $3$ or $5$ are $3$, $5$, $6$, $9$. Their sum is $23$, and their product is $810$. The function must return the `sum` and `product` values via pointer parameters `sumPtr` and `productPtr`, as implied in the skeleton code below.\n\nIn the code skeleton below, you are given most of the `main` function, but you must give the call to the `sumAndProductOfMultiples` function. After that you are given just the declaration line of the function, and you must write the remainder of the function.\n\n",
      "starter-code": "#include <stdio.h>\n\nvoid sumAndProductOfMultiples(int multiple1, int multiple2, int max,\n                              int* sumPtr, int* productPtr);\n\nint main(void) {\n  int multi1 = 3, multi2 = 5, max = 10;\n  int sum, product;\n  // add your call to sumAndProductOfMultiples here:\n  \n  printf(\"m1 = %d, m2 = %d, max = %d, sum = %d, product = %d\\n\", multi1, multi2,\n         max, sum, product);\n  return 0;\n}\n\nvoid sumAndProductOfMultiples(int multiple1, int multiple2, int max,\n                              int* sumPtr, int* productPtr) {\n\n  // Your Code Here\n        \n}\n",
      "answer": "#include <stdio.h>\n\nvoid sumAndProductOfMultiples(int multiple1, int multiple2, int max,\n                              int* sumPtr, int* productPtr);\n\nint main(void) {\n  int multi1 = 3, multi2 = 5, max = 10;\n  int sum, product;\n  // add your call to sumAndProductOfMultiples here:\n  sumAndProductOfMultiples(multi1, multi2, max, &sum, &product);\n  printf(\"m1 = %d, m2 = %d, max = %d, sum = %d, product = %d\\n\", multi1, multi2,\n         max, sum, product);\n  return 0;\n}\nvoid sumAndProductOfMultiples(int multiple1, int multiple2, int max,\n                              int* sumPtr, int* productPtr) {\n  *sumPtr = 0, *productPtr = 1;\n  int i;\n  for (i = 1; i < max; i++) {\n    if (i % multiple1 == 0 || i % multiple2 == 0) {\n      *sumPtr += i;\n      *productPtr *= i;\n    }\n  }\n}\n",
      "testcases": [
        {
          "input": [
            ""
          ],
          "output": [
            "m1 = 3, m2 = 5, max = 10, sum = 23, product = 810\n"
          ]
        }
      ]
    }
  ]
};