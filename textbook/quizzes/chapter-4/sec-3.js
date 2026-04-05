let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Which of the following converting while/do-while loop to for loop is/are correct?",
      "answer": [
        1,
        2
      ],
      "distractors": [
        "While loop:\n```\nint i = 0;\nwhile (i < 10) {\n    i += 2;\n    printf(\"%d \", i);\n}\n```\nFor loop:\n```\nfor (int i = 0; i < 10; i += 2) {\n    printf(\"%d \", i);\n}\n```\n",
        "While loop:\n```\nint i = 0;\nbool flag = true;\nwhile (flag) {\n    if (i >= 8) {\n        flag = false;\n    }\n    printf(\"%d \", i);\n    i += 2;\n}\n```\nFor loop:\n```\nfor (int i = 0; i < 10; i += 2) {\n    printf(\"%d \", i);\n}\n```\n",
        "Do-while loop:\n```\nint i = 0;\ndo {\n    printf(\"%d \", i);\n    i += 2;\n} while (i < 10);\n```\nFor loop:\n```\nfor (int i = 0; i < 10; i += 2) {\n    printf(\"%d \", i);\n}\n```\n",
        "Do-while loop:\n```\nint i = 0;\nbool flag = true;\ndo {\n    printf(\"%d \", i);\n    i += 2;\n    if (i >= 8) {\n        flag = false;\n    }\n} while (flag);\n```\nFor loop:\n```\nfor (int i = 0; i < 10; i += 2) {\n    printf(\"%d \", i);\n}\n```\n"
      ],
      "explainations": [
        "A is incorrect. The while loop will print 2 4 6 8 10. The for loop will print 0 2 4 6 8. This is because the while loop executes `i += 2` before printing, while the for loop executes `i += 2` after the body of the loop, which is the print statement.",
        "B is correct. Both loops will print 0 2 4 6 8. `flag` is the condition of the while loop, but it is checked in the beginning of the loop, so it is slightly different from the end condition of the for loop. The initialization and the increment are the same for both loops.",
        "C is correct. Both loops will print 0 2 4 6 8. In this case, do-while loop is the same as while loop.",
        "D is incorrect. The do-while loop will print 0 2 4 6. The for loop will print 0 2 4 6 8. When `i` reaches 8, the do-while loop would have printed 0 2 4 6, and then `flag` is set to false, so the loop terminates."
      ]
    },
    {
      "prompt": "What will the following code print?\n```\nint ii = 0;\nfor (int i = ii; i < 10; i++, ii += 2) {\n    ii--;\n}\nprintf(\"%d\", ii);\n```\n",
      "answer": [
        2
      ],
      "distractors": [
        "20",
        "19",
        "10",
        "9"
      ],
      "explainations": [
        "A is incorrect. The output is 10. Any changes to 'ii' in the for loop will affect the output as `ii` is defclared outside the for loop. In each iteration, `ii` will firstly minus 1, then add 2. So the final value of `ii` is 10.",
        "B is incorrect. The output is 10. Any changes to 'ii' in the for loop will affect the output as `ii` is defclared outside the for loop. In each iteration, `ii` will firstly minus 1, then add 2. So the final value of `ii` is 10.",
        "C is correct. The output is 10. Any changes to 'ii' in the for loop will affect the output as `ii` is defclared outside the for loop. In each iteration, `ii` will firstly minus 1, then add 2. So the final value of `ii` is 10.",
        "D is incorrect. The output is 10. Any changes to 'ii' in the for loop will affect the output as `ii` is defclared outside the for loop. In each iteration, `ii` will firstly minus 1, then add 2. So the final value of `ii` is 10."
      ]
    }
  ],
  "question": [
    {
      "prompt": "Which of the following has/have the same output as the following code?\n```\nfor (int i = 0; i < 10; i += 2) {\n    printf(\"%d \", i);\n}\n```\n",
      "answer": [
        1,
        3
      ],
      "distractors": [
        "```\nint i = 0;\nfor (;i < 10;) {\n    i += 2;\n    printf(\"%d \", i);\n}\n```\n",
        "```\nint i = 0;\nwhile (i < 10) {\n    printf(\"%d \", i);\n    i += 2;\n}\n```\n",
        "```\nfor (int i = 0; i < 10; printf(\"%d \", i)) {\n    i += 2;\n}\n```\n",
        "```\nfor (int i = 0; i < 10; printf(\"%d \", i), i += 2);\n```\n"
      ],
      "explainations": [
        "A is incorrect. The sample code will print 0 2 4 6 8. This code will print 2 4 6 8 10.",
        "B is correct. Both loops will print 0 2 4 6 8.",
        "C is incorrect. The sample code will print 0 2 4 6 8. This code will print 2 4 6 8 10, as the print statement is executed at the end of each iteration, which is after `i += 2`.",
        "D is correct. Both loops will print 0 2 4 6 8. Since the print statement and increment are both in the increment part of the for loop, they are executed from left to right at the end of each iteration."
      ]
    }
  ]
};