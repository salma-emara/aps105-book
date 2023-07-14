let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Which of the following print(s) `Wednesday`?",
      "answer": [
        0,
        3
      ],
      "distractors": [
        "```\nchar weekdays[][10] = {\"Monday\",   \"Tuesday\", \"Webnesday\",    \"Thursday\",\n                       \"Friday\",       \"Saturday\",     \"Sunday\"};\n\nweekdays[2][2] = 'd';\nprintf(\"%s\", weekdays[2]);\n```\n",
        "```\nchar weekdays[][10] = {\"Monday\",   \"Tuesday\", \"Webnesday\",    \"Thursday\",\n                       \"Friday\",       \"Saturday\",     \"Sunday\"};\n\nweekdays[2] = \"Wednesday\";\nprintf(\"%s\", weekdays[2]);\n```\n",
        "```\nchar *weekdays[7] = {\"Monday\",   \"Tuesday\", \"Webnesday\",    \"Thursday\",\n                       \"Friday\",       \"Saturday\",     \"Sunday\"};\n\nweekdays[2][2] = 'd';\nprintf(\"%s\", weekdays[2]);\n```\n",
        "```\nchar *weekdays[7] = {\"Monday\",   \"Tuesday\", \"Webnesday\",    \"Thursday\",\n                       \"Friday\",       \"Saturday\",     \"Sunday\"};\n\nweekdays[2] = \"Wednesday\";\nprintf(\"%s\", weekdays[2]);\n```\n"
      ],
      "explainations": [
        "A is correct. `weekdays` is a 2D array of characters, each row is a string with 10 characters. If the string is not long enough, the compiler will automatically add a null character at the end of the string. Since each row is a character array, we can change the value of each character in the string. `weekdays[2][2] = 'd'` will change the third character of the third string to `d`, which is `Wednesday`.",
        "B is incorrect. `weekdays[2]` is an array identifier, which is a constant pointer to the first element of the array. We cannot assign a new string to it.",
        "C is incorrect. `weekdays` is a 1D array of pointers to characters. Each element of the array is a character potiner which can point to a string. Since `weekdays[2]` is pointing to a constant string, we cannot change the characters in the constant string.",
        "D is correct. `weekdays` is a 1D array of pointers to characters. Each element of the array is a character potiner which can point to a string. Although `weekdays[2]` is a pointer, it is mutable. We can assign a new string to it."
      ]
    }
  ]
};