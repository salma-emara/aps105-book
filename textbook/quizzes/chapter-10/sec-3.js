let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Which of the following print(s) `3`?",
      "answer": [
        0,
        1,
        2
      ],
      "distractors": [
        "```\nchar s[] = \"Hello\";\nint size = strlen(s + 2);\nprintf(\"%d\", size);\n```\n",
        "```\nchar s[] = \"Hel\\0lo\";\nint size = strlen(s);\nprintf(\"%d\", size);\n```\n",
        "```\nchar s[] = \"Hel\\0\";\nint size = strlen(s);\nprintf(\"%d\", size);\n```\n",
        "None of the above."
      ],
      "explainations": [
        "A is correct. The function returns the length of the string counting number of characters starting at initial address to the last character before null character.",
        "B is correct. The function returns the length of the string counting number of characters starting at initial address to the last character before null character.",
        "C is correct. The function returns the length of the string counting number of characters starting at initial address to the last character before null character.",
        "D is incorrect as A, B and C are correct."
      ]
    },
    {
      "prompt": "Which of the following print(s) `APS105`?",
      "answer": [
        2
      ],
      "distractors": [
        "```\nchar s[] = \"I love APS105!\";\nchar d[6 + 1];\nstrcpy(d, s + 7);\nprintf(\"%s\", d);\n```\n",
        "```\nchar s[] = \"I love APS105!\";\nchar d[6 + 1];\nstrncpy(d, s + 7, 6);\nprintf(\"%s\", d);\n```\n",
        "```\nchar s[] = \"I love APS105!\";\nchar d[6 + 1] = \"\";\nstrncpy(d, s + 7, 6);\nprintf(\"%s\", d);\n```\n",
        "None of the above."
      ],
      "explainations": [
        "A is incorrect. The function copies the string starting at the 7th character to the destination string. It will copy `APS105!`, and there will be no space for the null-character.",
        "B is incorrect. Although `strncpy` copies exactly 6 characters, it does not add a null character at the end of the destination string. There may be garbage characters after `APS105` until the null character is found.",
        "C is correct. `d` is initialized and it is filled with null characters. `strncpy` copies exactly 6 characters to `d` from the first to the 6th entry of `d`, the last entry is still a null character. It will print `APS105`.",
        "D is incorrect as C is correct."
      ]
    },
    {
      "prompt": "Which of the following print(s) `APS105`?",
      "answer": [
        0,
        3
      ],
      "distractors": [
        "```\nchar d1[] = \"APS\";\nchar d2[] = \"105\";\nstrcat(d1, d2);\nprintf(\"%s\", d1);\n```\n",
        "```\nchar d1[] = \"APS\";\nchar d2[] = \"105\";\nstrcat(d1, d2);\nprintf(\"%s\", d2);\n```\n",
        "```\nchar d1[6 + 1] = \"APS\";\nd1[5] = '5';\nchar d2[] = \"10\";\nstrcat(d1, d2);\nprintf(\"%s\", d1);\n```\n",
        "```\nchar d1[6 + 1] = \"APS\";\nchar d2[] = \"105 + 1 = 106\";\nstrncat(d1, d2, 3);\nprintf(\"%s\", d1);\n```\n"
      ],
      "explainations": [
        "A is incorrect. The first argument is the destination string and the second argument is the source string. The function appends the source string to the destination string. However, `strcat` assumes there is enough space in `d1` to hold 6 characters and 1 null-character, but it only has space to hold 3 characters and one null-character.",
        "B is incorrect. It prints the source string `d2` and assumes `d1` has enough space.",
        "C is incorrect. Although the 6th character of `d1` is set to `5`, `d2` is concatenated to `d1` from the 4th character, and the null character of `d2` will overwrite the `5` in `d1`. It will print `APS10`.",
        "D is correct. The function appends the first 3 characters of the source string to the destination string then adds a null character to the end of the destination string if it was not terminated by null. It will print `APS105`."
      ]
    }
  ]
};