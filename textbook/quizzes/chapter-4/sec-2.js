let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Which of the following code can print the odd number from 1 to 10?",
      "answer": [
        0,
        1,
        2,
        3
      ],
      "distractors": [
        "```\nint i = 1;\nwhile (i <= 5) {\n    printf(\"%d \", i * 2 - 1);\n    i++;\n}\n```\n",
        "```\nint i = 1;\ndo {\n    printf(\"%d \", i);\n    i += 2;\n} while (i < 10);\n```\n",
        "```\nint i = 10;\ndo {\n    printf(\"%d \", 11 - i);\n    i -= 2;\n} while (i < 10 && i > 1);\n```\n",
        "```\nbool start = false;\nint i = 0;\ndo {\n    i++;\n    if (i >= 1 && i < 10) {\n        start = true;\n    } else {\n        start = false;\n    }\n    if (i % 2 == 1) {\n        printf(\"%d \", i);\n    }\n} while (start);\n```\n"
      ],
      "explainations": [
        "A is correct. The loop will print 1 3 5 7 9.",
        "B is correct. This is a basic do-while loop usage.",
        "C is correct. Similar to B, but use a inverse formular to print the odd number.",
        "D is correct. Notice that the do-while will always run at least once, so in in the first iteration, the `start` will be set to true, so the loop will run until `i` is 10 where `start` will be set to false."
      ]
    }
  ]
};