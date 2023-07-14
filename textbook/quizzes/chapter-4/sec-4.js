let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Which of the following will print the following output?\n```\n  *\n ***\n*****\n```\n",
      "answer": [
        2,
        3
      ],
      "distractors": [
        "```\nfor (int line = 1; line <= 3; line++) {  // loop over lines\n    for (int star = 1; star <= 2 * line - 1; star++) {  // loop over stars in a single line\n        printf(\"*\");\n    }\n    printf(\"\\n\");\n}\n```\n",
        "```\nfor (int line = 1; line <= 3; line++) {\n    for (int space = 1; space <= 3 - line; space++) {\n        printf(\" \");\n    }\n    printf(\"\\n\");\n    for (int star = 1; star <= 2 * line - 1; star++) {\n        printf(\"*\");\n    }\n}\n```\n",
        "```\nfor (int line = 0; line < 3; line++) {\n    for (int space = 1; space <= 2 - line; space++) {\n        printf(\" \");\n    }\n    for (int star = 1; star <= 2 * line + 1; star++) {\n        printf(\"*\");\n    }\n    printf(\"\\n\");\n}\n```\n",
        "```\nfor (int line = 0; line < 3; line++, printf(\"\\n\")) {\n    for (int space = 1; space <= 2 - line; space++) {\n        printf(\" \");\n    }\n    for (int star = 1; star <= 2 * line + 1; star++) {\n        printf(\"*\");\n    }\n}\n```\n"
      ],
      "explainations": [
        "A is incorrect. The output will be like:\n```\n*\n***\n*****\n```\n",
        "B is incorrect. The output will be like:\n```\n*\n***\n*****\n```\n",
        "C is correct. It first prints spaces according to the line number, then prints stars according to the line number. Then it prints a new line after each line finishes.\n",
        "D is correct. Similar to C, it just moves the new line to the end of the outer loop.\n"
      ]
    }
  ]
};