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
    },
    {
      "prompt": "What is the output of the following code?\n```\nint i = 100;\nint j = i++ + --i + ++i;\nj += j - j;\nprintf(\"%d %d\", j, i);\n```\n",
      "answer": [
        2
      ],
      "distractors": [
        "300 101\n",
        "301 100\n",
        "301 101\n",
        "300 99\n"
      ],
      "explainations": [
        "A is incorrect. `i++` is a post-increment, so it will be 100. `--i` is a pre-decrement, so it will be 100 as `i` is 101 after `i++`. Then `i` is still 100 at the moment, and `++i` is a pre-increment, so it will be 101, `i` is 101 at the moment. So `j` is equivalent to 100 + 100 + 101 = 301 after the second line. `j += j - j` is equivalent to `j = j + j - j`, so `j` is still 301 after the third line. Thus the output is `301 101`.",
        "B is incorrect. `i++` is a post-increment, so it will be 100. `--i` is a pre-decrement, so it will be 100 as `i` is 101 after `i++`. Then `i` is still 100 at the moment, and `++i` is a pre-increment, so it will be 101, `i` is 101 at the moment. So `j` is equivalent to 100 + 100 + 101 = 301 after the second line. `j += j - j` is equivalent to `j = j + j - j`, so `j` is still 301 after the third line. Thus the output is `301 101`.",
        "C is correct. `i++` is a post-increment, so it will be 100. `--i` is a pre-decrement, so it will be 100 as `i` is 101 after `i++`. Then `i` is still 100 at the moment, and `++i` is a pre-increment, so it will be 101, `i` is 101 at the moment. So `j` is equivalent to 100 + 100 + 101 = 301 after the second line. `j += j - j` is equivalent to `j = j + j - j`, so `j` is still 301 after the third line. Thus the output is `301 101`.",
        "D is incorrect. `i++` is a post-increment, so it will be 100. `--i` is a pre-decrement, so it will be 100 as `i` is 101 after `i++`. Then `i` is still 100 at the moment, and `++i` is a pre-increment, so it will be 101, `i` is 101 at the moment. So `j` is equivalent to 100 + 100 + 101 = 301 after the second line. `j += j - j` is equivalent to `j = j + j - j`, so `j` is still 301 after the third line. Thus the output is `301 101`."
      ]
    },
    {
      "prompt": "What is the output of the following code?\n```\nint i = 100, j = 100;\ni += ++i * 2;\nj += 2 * j++;\nprintf(\"%d %d\", i, j);\n```\n",
      "answer": [
        0
      ],
      "distractors": [
        "303 301\n",
        "302 301\n",
        "301 301\n",
        "303 302\n"
      ],
      "explainations": [
        "A is correct. `++i` is a pre-increment, so it will be 101. Then `i` is 101 at the moment, and `++i * 2` is 202. So `i` is equivalent to 101 + 202 = 303 after the second line. `j++` is a post-increment, so it will be 100 and `2 * j++` is 200. Then `j` is 101 at the moment, so `j` is equivalent to 101 + 200 = 301 after the second line. Thus the output is `303 301`.",
        "B is incorrect. `++i` is a pre-increment, so it will be 101. Then `i` is 101 at the moment, and `++i * 2` is 202. So `i` is equivalent to 101 + 202 = 303 after the second line. `j++` is a post-increment, so it will be 100 and `2 * j++` is 200. Then `j` is 101 at the moment, so `j` is equivalent to 101 + 200 = 301 after the second line. Thus the output is `303 301`.",
        "C is incorrect. `++i` is a pre-increment, so it will be 101. Then `i` is 101 at the moment, and `++i * 2` is 202. So `i` is equivalent to 101 + 202 = 303 after the second line. `j++` is a post-increment, so it will be 100 and `2 * j++` is 200. Then `j` is 101 at the moment, so `j` is equivalent to 101 + 200 = 301 after the second line. Thus the output is `303 301`.",
        "D is incorrect. `++i` is a pre-increment, so it will be 101. Then `i` is 101 at the moment, and `++i * 2` is 202. So `i` is equivalent to 101 + 202 = 303 after the second line. `j++` is a post-increment, so it will be 100 and `2 * j++` is 200. Then `j` is 101 at the moment, so `j` is equivalent to 101 + 200 = 301 after the second line. Thus the output is `303 301`."
      ]
    }
  ]
};