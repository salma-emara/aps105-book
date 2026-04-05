let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Which of the following code can print the even number from 1 to 10?",
      "answer": [
        0,
        2,
        3
      ],
      "distractors": [
        "```\nint i = 1;\nwhile (i <= 10) {\n    if (i % 2 == 0) {\n        printf(\"%d \", i);\n    }\n    i++;\n}\n```\n",
        "```\nint i = 0;\nwhile (i < 5) {\n    printf(\"%d \", i * 2);\n    i++;\n}\n```\n",
        "```\nint i = 2;\nwhile (i <= 10) {\n    printf(\"%d \", i);\n    i += 2;\n}\n```\n",
        "```\nint i = 5;\nwhile (i > 0) {\n    i--;\n    printf(\"%d \", 10 - 2 * i);\n}\n```\n"
      ],
      "explainations": [
        "A is correct. It iterates from 1 to 10, checks if the number is even, and prints it if it is.",
        "B is incorrect. The output is 0 2 4 6 8, which is not the even numbers from 1 to 10.",
        "C is correct. It iterates from 2 to 10, the step length is 2, which is the even numbers from 1 to 10.",
        "D is correct. It iterates from 5 to 1, since it executes `i--` before `printf`, the `i` used in `printf` will be from 4 to 0, so the output is 2 4 6 8 10"
      ]
    },
    {
      "prompt": "Which of the following can use infinite `while` loop?",
      "answer": [
        0,
        1
      ],
      "distractors": [
        "Repainting the screen of a game.",
        "Maintaining a persistent connection and continuously handling incoming requests or messages.",
        "Searching for a specific element in a list.",
        "Reading a file line by line."
      ],
      "explainations": [
        "A is correct. As long as the game is running, the screen needs to be repainted.",
        "B is correct. As long as the server is running, it needs to handle incoming requests or messages.",
        "C is incorrect. The list is finite, so the loop will eventually end.",
        "D is incorrect. The file is finite, so the loop will eventually end."
      ]
    }
  ]
};