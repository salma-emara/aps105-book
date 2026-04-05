let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Which of the following code print(s) `3.33`?",
      "answer": [
        0,
        1,
        2
      ],
      "distractors": [
        "```\ndouble m = 10 / (double) 3;\nprintf(\"%.2f\", m);\n```\n",
        "```\ndouble m = (5.0 + 5.0) / 3;\nprintf(\"%.2f\", m);\n```\n",
        "```\ndouble m = (5.0 + 5) / 3;\nprintf(\"%.2f\", m);\n```\n",
        "```\ndouble m = 10 / 3 + 0.0;\nprintf(\"%.2f\", m);\n```\n"
      ],
      "explainations": [
        "A is correct. `10 / (double) 3` is a double division, as 3 has been explicitly converted to double type, so it will be `3.33`.",
        "B is correct. `5.0 + 5.0` is a double, and `3` is an integer, so the result of the division is a double.",
        "C is correct. `5.0 + 5` is a double, and `3` is an integer, so the result of the division is a double.",
        "D is incorrect. `10 / 3` is an integer division, so it will be `3.00`. Then `3.00` + `0.0` is still `3.00`."
      ]
    }
  ]
};