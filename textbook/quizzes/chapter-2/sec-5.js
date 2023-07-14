let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Which of the following can get different numbers every time run it?",
      "answer": [
        2
      ],
      "distractors": [
        "int a = rand();\nint b = rand();\nint c = rand();\n",
        "srand(1);\nint a = rand();\nint b = rand();\nint c = rand();\n",
        "srand(time(NULL));\nint a = rand();\nint b = rand();\nint c = rand();\n",
        "srand(rand());\nint a = rand();\nsrand(rand());\nint b = rand();\nsrand(rand());\nint c = rand();\n"
      ],
      "explainations": [
        "A is incorrect. Every time run the code, `rand()` will always take the same default seed, so the values of `a`, `b`, and `c` will always be the same.",
        "B is incorrect. Similarly, `srand(1)` always set the seed to 1, so the values of `a`, `b`, and `c` will always be the same.",
        "C is correct. `srand(time(NULL))` will set the seed to the current time, so the values of `a`, `b`, and `c` will be different every time run the code.",
        "D is incorrect. `srand(rand())` will set the seed to the value of `rand()`, which is the same every time run the code as mentioned in the explaination of A option. So the values of `a`, `b`, and `c` will always be the same."
      ]
    },
    {
      "prompt": "Which of the following can generate a random number (precision up to two decimal places) between 1.00 and 2.00 (1.00 <= x < 2.00)?",
      "answer": [
        1,
        3
      ],
      "distractors": [
        "```\nsrand(time(NULL));\nint a = rand() % 100 + 1;\ndouble result = a / 100.0 + 1.0;\n```\n",
        "```\nsrand(time(NULL));\nint a = rand() % 100;\ndouble result = a / 100.0 + 1.0;\n```\n",
        "```\nsrand(time(NULL));\nint a = rand() % 100;\ndouble result = 2 - a / 100.0;\n```\n",
        "```\nsrand(time(NULL));\nint a = (rand() % 100) * 2;\ndouble result = (a / 100.0 + 2.0) / 2;\n```\n"
      ],
      "explainations": [
        "A is incorrect. It can generate 2.00 which exceeds the upper bound. It also cannot generate 1.00, which is the lower bound.",
        "B is correct. It can generate from 1.00 to 1.99.",
        "C is incorrect. It can generate 2.00 which exceeds the upper bound. It also cannot generate 1.00, which is the lower bound.",
        "D is correct. It firstly generate from 2.00 to 3.98, then divide by 2 to get from 1.00 to 1.99."
      ]
    }
  ]
};