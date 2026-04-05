let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Which of the following can output `Even!` when `n` is even? (Assume `n` is an integer)",
      "answer": [
        0,
        2,
        3
      ],
      "distractors": [
        "```\nbool isEven = (n % 2 == 0);\nif (isEven) {\n    printf(\"Even!\");\n}\n```\n",
        "```\nif (n % 2 = 0) {\n    printf(\"Even!\");\n}\n```\n",
        "```\nif (n % 2) {\n} else {\n    printf(\"Even!\");\n}\n```\n",
        "```\nif ((n + 2) % 2 == 0) {\n    printf(\"Even!\");\n}\n```\n"
      ],
      "explainations": [
        "A is correct. The boolean variable `isEven` will be `true` if `n` is even, and `false` otherwise. The `if` statement will be executed if `isEven` is `true`, that is, when `n` is even.",
        "B is incorrect. The `=` operator is used for assignment, not comparison.",
        "C is correct. The `else` statement will be executed if the `if` statement is not executed, that is, when `n % 2 == 0` which means `n` is even, the `else` statement will be executed.",
        "D is correct. `(n + 2) % 2` is equivalent to `n % 2`, so the `if` statement will be executed if `n` is even."
      ]
    },
    {
      "prompt": "Which of the following will output `True`?",
      "answer": [
        0,
        1,
        3
      ],
      "distractors": [
        "```\nint x = 0;\nif (x = 1) {\n    printf(\"True\");\n}\n```\n",
        "```\nif ('1' - '0' == 1) {\n    printf(\"True\");\n}\n```\n",
        "```\nif ('a' < 'A') {\n    printf(\"True\");\n}\n```\n",
        "```\nif (1 == 1.0) {\n    printf(\"True\");\n}\n```\n"
      ],
      "explainations": [
        "A is correct. The `=` operator is used for assignment and will return the value assigned, which is 1 in this case. 1 is considered `true` in C, so the `if` statement will be executed.",
        "B is correct. The ASCII value of `'1'` is 49, and the ASCII value of `'0'` is 48. So `'1' - '0'` is 1, so the `if` statement will be executed.",
        "C is incorrect. The ASCII value of `'a'` is 97, and the ASCII value of `'A'` is 65. So `'a' < 'A'` is `false`, so the `if` statement will not be executed.",
        "D is correct. The `==` operator will return `true` if the values on both sides are equal, regardless of their types. So the `if` statement will be executed."
      ]
    }
  ]
};