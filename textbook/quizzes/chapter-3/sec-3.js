let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Which of is following code can determine the median of `x`, `y`, and `z` (Assume they are not identical)?",
      "answer": [
        0,
        1,
        2,
        3
      ],
      "distractors": [
        "```\nif (x < y) {\n    if (x > z) {\n        printf(\"median is %d\", x);\n    } else if (y < z) {\n        printf(\"median is %d\", y);\n    } else {\n        printf(\"median is %d\", z);\n    }\n} else {\n    if (x < z) {\n        printf(\"median is %d\", x);\n    } else if (y > z) {\n        printf(\"median is %d\", y);\n    } else {\n        printf(\"median is %d\", z);\n    }\n}\n```\n",
        "```\nif (x < y && x < z) {\n    if (y < z) {\n        printf(\"median is %d\", y);\n    } else {\n        printf(\"median is %d\", z);\n    }\n} else if (x > y) {\n    if (x < z) {\n        printf(\"median is %d\", x);\n    } else if (y > z) {\n        printf(\"median is %d\", y);\n    } else {\n        printf(\"median is %d\", z);\n    }\n} else {\n    if (x < y) {\n        printf(\"median is %d\", x);\n    } else if (y < z) {\n        printf(\"median is %d\", z);\n    } else {\n        printf(\"median is %d\", y);\n    }\n}\n```\n",
        "```\nif (((x < y) && (x > z)) || ((x < z) && (x > y))) {\n    printf(\"median is %d\", x);\n} else if (((y < x) && (y > z)) || ((y < z) && (y > x))) {\n    printf(\"median is %d\", y);\n} else {\n    printf(\"median is %d\", z);\n}\n```\n",
        "```\nif (((x < y) || (x < z)) && ((x > y) || (x > z))) {\n    printf(\"median is %d\", x);\n} else if (((y < x) || (y < z)) && ((y > x) || (y > z))) {\n    printf(\"median is %d\", y);\n} else {\n    printf(\"median is %d\", z);\n}\n```\n"
      ],
      "explainations": [
        "A is correct. It first compares `x` and `y`, then uses the nested `if` to build the condition of each variable being the median.",
        "B is correct. It is similar to A, but extracts the first nested `if` in the first branch of the outer `if`.",
        "C is correct. It is a more readable version of A and B.",
        "D is correct. It is the same as C."
      ]
    },
    {
      "prompt": "Which of the following code can output `Odd` if `x` is odd and `Mul-6` if `x` is divisible by 6?",
      "answer": [
        1,
        3
      ],
      "distractors": [
        "```\nif (x % 2 == 0)\n    if (x % 3 == 0)\n        printf(\"Mul-6\");\nelse\n    printf(\"Odd\");\n```\n",
        "```\nif (x % 2 == 0 && x % 3 == 0)\n    printf(\"Mul-6\");\nelse if (x % 2 != 0)\n    printf(\"Odd\");\n```\n",
        "```\nif (x % 2 == 0 && x % 3 == 0)\n    printf(\"Mul-6\");\nelse if (x % 3 == 0)\n    printf(\"Odd\");\n```\n",
        "```\nif (x % 2 == 0) {\n    if (x % 3 == 0)\n        printf(\"Mul-6\");\n} else\n    printf(\"Odd\");\n```\n"
      ],
      "explainations": [
        "A is incorrect. The dangling `else` is attached to the inner `if`.",
        "B is correct. It first checks if `x` is divisible by 6, then checks if `x` is odd.",
        "C is incorrect. It first checks if `x` is divisible by 6, then it checks if `x` is the odd which is also divisible by 3, but not all odd numbers.",
        "D is correct. It first checks if `x` is even or odd, then checks if `x` is divisible by 3 when it is even."
      ]
    }
  ]
};