let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Which of the following can show the advantage of using functions?",
      "answer": [
        0,
        1,
        2,
        3
      ],
      "distractors": [
        "An identical piece of code scattered throughout a large-scale program can be changed or fixed in one place.",
        "Two engineers want to implment different modules of a program at the same time.",
        "The code is more readable and concise.",
        "Able to conduct testing more easily."
      ],
      "explainations": [
        "A is correct. Functions can improve reusability and maintainability of code.",
        "B is correct. Functions can improve the collaboration.",
        "C is correct. Functions can make the code more readable and concise.",
        "D is correct. Since sub-problems will be isolated into different functions. We can test each function individually. This makes debugging easier."
      ]
    },
    {
      "prompt": "Which of the following's order of execution is `main()` -> `A()` -> `P()` -> `S()`?",
      "answer": [
        0,
        1,
        2
      ],
      "distractors": [
        "```\nvoid A() {\n}\n\nvoid P() {\n\n}\n\nvoid S() {\n\n}\n\nint main() {\n    A();\n    P();\n    S();\n\n    return 0;\n}\n```\n",
        "```\nvoid A();\nvoid P();\nvoid S();\n\nvoid A() {\n\n}\n\nvoid S() {\n\n}\n\nvoid P() {\n    S();\n}\n\nint main() {\n    A();\n    P();\n\n    return 0;\n}\n```\n",
        "```\nvoid S() {\n\n}\n\nvoid P() {\n    S();\n}\n\nvoid A() {\n    P();\n}\n\nint main() {\n    A();\n\n    return 0;\n}\n```\n",
        "```\nvoid A();\nvoid P();\nvoid S();\n\nvoid A() {\n    P();\n    S();\n}\n\nint main() {\n    A();\n\n    return 0;\n}\n```\n"
      ],
      "explainations": [
        "A is correct. It calls `A()`, `P()`, and `S()` in order in `main()`.",
        "B is correct. It calls `A()` and `P()` in order in `main()`. Since `P()` calls `S()`, the order of execution is `main()` -> `A()` -> `P()` -> `S()`.",
        "C is correct. It calls `A()` in `main()`. Since `A()` calls `P()`, and `P()` calls `S()`, the order of execution is `main()` -> `A()` -> `P()` -> `S()`.",
        "D is incorrect. There is a compilation error since `P()` and `S()` are only declared but not defined."
      ]
    }
  ]
};