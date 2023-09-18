let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Which of the following code print(s) `APS105`?",
      "answer": [
        0,
        1,
        2,
        3
      ],
      "distractors": [
        "```\nchar s[] = \"APS105\";\nprintf(\"%s\\n\", s);\n```\n",
        "```\nchar s[] = \"APS105\\0APS105\";\nprintf(\"%s\\n\", s);\n```\n",
        "```\nchar s[] = \"APS105APS105\";\nprintf(\"%.6s\\n\", s + 6);\n```\n",
        "```\nchar s[] = \"APS105\";\nputs(s);\n```\n"
      ],
      "explainations": [
        "A is correct. This is the basic way to print a string.",
        "B is correct. The first null character terminates the string, so only `APS105` is printed.",
        "C is correct. The precision field specifies the maximum number of characters from the pointer to print. Since the pointer is pointing to the 7th character, only `APS105` is printed.",
        "D is correct. `puts` prints the string and a newline character."
      ]
    },
    {
      "prompt": "Which of the following code print(s) `APS105` after the given inputs?",
      "answer": [
        0,
        1,
        2
      ],
      "distractors": [
        "User input:\n```\nAPS105\n```\nCode:\n```\nchar s[6 + 1];\nscanf(\"%s\", s);\nprintf(\"%s\\n\", s);\n```\n",
        "User input:\n```\n    APS105\n```\nCode:\n```\nchar s[6 + 1];\nscanf(\"%s\", s);\nprintf(\"%s\\n\", s);\n```\n",
        "User input:\n```\nAPS    105\n```\nCode:\n```\nchar s1[3 + 1];\ncahr s2[3 + 1];\nscanf(\"%s\", s1);\nscanf(\"%s\", s2);\nprintf(\"%s\", s1);\nprintf(\"%s\\n\", s2);\n```\n",
        "User input:\n```\nAPS105\n```\nCode:\n```\nchar s[6 + 1];\nfgets(s, 6, stdin);\nprintf(\"%s\\n\", s);\n```\n"
      ],
      "explainations": [
        "A is correct. This is the basic way to input and print a string.",
        "B is correct. The leading spaces are ignored by `scanf`.",
        "C is correct. `scanf` stops reading when it encounters a whitespace character. The first `scanf` reads `APS` and the second `scanf` reads `105`.",
        "D is incorrect. The second argument of `fgets` specifies the maximum number of characters to read, including the null character. Therefore, only `APS10` is read."
      ]
    },
    {
      "prompt": "Which of the following statements are true regarding the `getStringSafely()` function?",
      "answer": [
        1,
        2
      ],
      "distractors": [
        "The function reads characters from the user until it encounters a newline character.",
        "The function uses the getchar() function to read characters from the user.",
        "The function counts the number of characters read from the user to ensure that the string is shorter than the maximum length.",
        "The function terminates the string with a null character at the maximum length."
      ],
      "explainations": [
        "A is incorrect. The function reads characters from the user until it encounters a newline character or the maximum length is reached.",
        "B is correct. The function uses the getchar() function to read characters from the user.",
        "C is correct. The function counts the number of characters read from the user to ensure that the string is shorter than the maximum length.",
        "D is incorrect. The function terminates the string with a null character at the total characters count if the user enters fewer characters than the maximum allowed length or at the maximum length if the user enters more characters than the maximum allowed length."
      ]
    }
  ]
};