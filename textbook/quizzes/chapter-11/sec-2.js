let parsedObject; 
  parsedObject = {
  "question": [
    {
      "prompt": "When designing a recursive function for solving a problem, which of the following should be determined?",
      "answer": [
        0,
        1,
        2,
        3
      ],
      "distractors": [
        "The terminating condition.",
        "The size of input.",
        "How to break down the problem into smaller subproblems.",
        "The number of recursive calls in the worst case."
      ],
      "explainations": [
        "A is correct. The terminating condition is the base case of the recursive function, which is when the function stops calling itself.",
        "B is incorrect. The size of the input is not important to design a recursive function.",
        "C is correct. The problem should be broken down into smaller subproblems in each recursive call.",
        "D is incorrect. To solve a problem recursively, we may not need the number of times the function will call itself."
      ]
    }
  ],
  "questions": [
    {
      "prompt": "In the example mentioned in 11.2.4, while keeping the `printRow` function as is, if we modify the `printPattern` function to the following:\n```\nvoid printPattern(int n) {\n    if (n > 0) {\n        printPattern(n - 1);\n        printRow(n);\n        printPattern(n - 1);\n    }\n}\n```\nWhat will be the output when `n = 3`? \n",
      "answer": [
        1
      ],
      "distractors": [
        "```\n*\n**\n***\n**\n*\n```\n",
        "```\n*\n**\n*\n***\n*\n**\n*\n```\n",
        "```\n***\n*\n**\n*\n**\n*\n***\n```\n",
        "```\n***\n**\n*\n*\n*\n**\n***\n**\n*\n```\n"
      ],
      "explainations": [
        "A is incorrect. Trace the function as we do in this section.",
        "B is correct. Trace the function as we do in this section.",
        "C is incorrect. Trace the function as we do in this section.",
        "D is incorrect. Trace the function as we do in this section."
      ]
    }
  ]
};