let parsedObject; 
  parsedObject = {
  "exercises": [
    {
      "title": "Question 2 in Winter 2018 Midterm Exam",
      "difficulty": "Easy",
      "type": "explaination",
      "table": false,
      "multipart": false,
      "question": "Writea single C statement — which contains exactly one terminating semi-colon (`;`), and does\nnot contain brace brackets (`{` or `}`) — that declares a `bool` variable named `isHighlighted`, and\nsets its value to true if and only if the value stored in an integer variable named `characterCount`\nis an **even positive** number. Assume that the variable `characterCount` has already been declared\nand initialized.\n",
      "answer": "`bool isHighlighted = characterCount % 2 == 0 && characterCount > 0;` "
    },
    {
      "title": "Question 2 in Winter 2019 Midterm Exam",
      "difficulty": "Easy",
      "table": false,
      "type": "explaination",
      "multipart": false,
      "question": "Write a single C statement that declares a boolean-type variable named `divisible` and assigns\ntrue to divisible if and only if the value stored in the int variable named `numOfItems` is exactly\ndivisible by $5$ or $7$. Assume that variable `numOfItems` has been declared and initialized.\n",
      "answer": "`bool divisible = numOfItems % 5 == 0 || numOfItems % 7 == 0;` "
    },
    {
      "title": "Question 7 in Winter 2018 Final Exam",
      "difficulty": "Easy",
      "type": "multiple-choice",
      "table": false,
      "multipart": true,
      "question": "Evaluate the following relational expressions by circling the right answer.\n`'\\O' == 0`\n",
      "answer": [
        0
      ],
      "choices": [
        "True",
        "False"
      ],
      "explanation": "True, since \\\\0 has ASCII code of zero"
    },
    {
      "title": "Question 7 in Winter 2018 Final Exam",
      "difficulty": "Easy",
      "type": "multiple-choice",
      "table": false,
      "multipart": true,
      "question": "`int x = 10 % 8;`<br>`(x > 0) && (x % 2 == 0) && !false`\n",
      "answer": [
        0
      ],
      "choices": [
        "True",
        "False"
      ],
      "explanation": "True, since x stores 2"
    },
    {
      "title": "Question 7 in Winter 2018 Final Exam",
      "difficulty": "Easy",
      "type": "multiple-choice",
      "table": false,
      "multipart": true,
      "question": "`'c' - 3 == 'a'`\n",
      "answer": [
        1
      ],
      "choices": [
        "True",
        "False"
      ],
      "explanation": "False, since 'c' - 2 == 'a'\n"
    },
    {
      "title": "Question 7 in Winter 2018 Final Exam",
      "difficulty": "Easy",
      "type": "multiple-choice",
      "table": false,
      "multipart": true,
      "question": "`int w = rand() % 75 * 2 - 99;`<br>\n`(w < -99) \\|\\| (w > 49);`\n",
      "answer": [
        1
      ],
      "choices": [
        "True",
        "False"
      ],
      "explanation": "False, since the range of random numbers in w is between -99 and 49 inclusive"
    },
    {
      "title": "Modified version of Question 7 in Winter 2019 Midterm Exam",
      "difficulty": "Easy",
      "type": "programming",
      "table": false,
      "multipart": false,
      "question": "Write C program to find the median, which is the number at the middle, among three integers `p`, `q` and `r`. \nThe program should prompt the user to enter three integers, which get stored in `p`, `q` and `r`. Your program \nshould print the value of the number at the middle. For example, with integers $2$, $7$, and $5$ as input, the \nfunction returns 5; with integers $6$, $4$, and $6$ as input, the function returns $6$.\n\n",
      "starter-code": "#include <stdio.h>\n\nint main(void) {\n\n}\n",
      "answer": "#include <stdio.h>\nint main(void) {\n  int p = 0, q = 0, r = 0;\n  printf(\"Enter three integers: \");\n  scanf(\"%d %d %d\", &p, &q, &r);\n\n  if ((p >= q && p <= r) || (p >= r && p <= q)) {\n    printf(\"%d\", p);\n  } else if ((q >= p && q <= r) || (q >= r && q <= p)) {\n    printf(\"%d\", q);\n  } else {\n    printf(\"%d\", r);\n  }\n}\n",
      "testcases": [
        {
          "input": [
            "2 7 5\n"
          ],
          "output": [
            "Enter three integers: \n 5\n"
          ]
        },
        {
          "input": [
            "6 4 6\n"
          ],
          "output": [
            "Enter three integers: \n 6"
          ]
        },
        {
          "input": [
            "-5 -7 -10\n"
          ],
          "output": [
            "Enter three integers: \n -7\n"
          ]
        },
        {
          "input": [
            "8 8 8 "
          ],
          "output": [
            "Enter three integers: \n 8\n"
          ]
        }
      ]
    },
    {
      "title": "Modified Version of Question 4 in Winter 2022 Midterm Exam",
      "difficulty": "Easy",
      "type": "programming",
      "table": false,
      "multipart": false,
      "question": "The following program finds the middle character, e.g., if we have `a = 'a'`, `b = 'b'`, and `c = 'c'`, the program prints `b`. Rewrite this function such that it only uses one `printf` and one nested `if-else` statement.\n\n```{code-block} c\n#include <stdio.h>\n\nint main(void) {\n  char a = '\\0', b = '\\0', c = '\\0';\n  printf(\"Enter three characters: \");\n  scanf(\"%c %c %c\", &a, &b, &c);\n  if (a < b) {\n    if (b < c) {\n      printf(\"%c\", b);\n    } else if (a < c) {\n      printf(\"%c\", c);\n    } else {\n      printf(\"%c\", a);\n    }\n  }\n\n  if (c < b) {\n    printf(\"%c\", b);\n  }\n  if (a < c) {\n    printf(\"%c\", a);\n  }\n  printf(\"%c\", c);\n}\n```\n\n",
      "starter-code": "#include <stdio.h>\n\nint main(void) {\n\n}\n",
      "answer": "#include <stdio.h>\n\nint main(void) {\n  char a = '\\0', b = '\\0', c = '\\0';\n  printf(\"Enter three characters: \");\n  scanf(\"%c %c %c\", &a, &b, &c);\n\n  char result = a;\n\n  if ((a < b && b < c) || (c < b && b < a)) {\n    result = b;\n  } else if ((a < c && c < b) || (b < c && c < a)) {\n    result = c;\n  }\n\n  printf(\"%c\", result);\n}\n",
      "testcases": [
        {
          "input": [
            "a b c\n"
          ],
          "output": [
            "Enter three characters:\n b\n"
          ]
        },
        {
          "input": [
            "b a c\n"
          ],
          "output": [
            "Enter three characters:\n b\n"
          ]
        },
        {
          "input": [
            "a b a"
          ],
          "output": [
            "Enter three characters:\n a\n"
          ]
        },
        {
          "input": [
            "x x x\n"
          ],
          "output": [
            "Enter three characters:\n x\n"
          ]
        },
        {
          "input": [
            "1 9 5\n"
          ],
          "output": [
            "Enter three characters:\n 5\n"
          ]
        },
        {
          "input": [
            "a 9 b\n"
          ],
          "output": [
            "Enter three characters:\n a\n"
          ]
        },
        {
          "input": [
            "A Z m\n"
          ],
          "output": [
            "Enter three characters:\n Z\n"
          ]
        }
      ]
    }
  ]
};