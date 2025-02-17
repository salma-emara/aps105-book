let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Which of the following statements best describe(s) the relationship between a string and a character array in C?",
      "answer": [
        1,
        2
      ],
      "distractors": [
        "A string is a data type in C, while a character array is a storage container for string data.",
        "A string is a subset of a character array that represents a sequence of characters terminated by a null character.",
        "A character array can store a string.",
        "A string and a character array are two different terms used interchangeably to refer to the same concept in C."
      ],
      "explainations": [
        "A is incorrect. Because a string is not a separate data type in C. It is an interpretation of a character array.",
        "B is correct. A string is a subset of a character array that represents a sequence of characters terminated by a null character.",
        "C is correct. A character array can store a string.",
        "D is incorrect. Because a string and a character array are not interchangeable terms. A character array can represent any sequence of characters, while a string specifically refers to a null-terminated character array."
      ]
    },
    {
      "prompt": "In which of the following, the content of the character array `myString` stores `\"hello\"` or the pointer `pStr` points to is `\"hello\"` after the execution?",
      "answer": [
        0,
        3
      ],
      "distractors": [
        "```\nchar myString[] = \"Hello\";\nmyString[0] = 'h';\n```\n",
        "```\nchar myString[] = \"Hello\";\nmyString = 'hello';\n```\n",
        "```\nchar* pStr = \"Hello\";\npStr[0] = 'h';\n```\n",
        "```\nchar myString[] = \"Hello\";\nchar* pStr = myString;\npStr[0] = 'h';\n```\n"
      ],
      "explainations": [
        "A is correct. Because the string is stored in a character array, which is mutable.",
        "B is incorrect. Because the array identifier is a constant pointer to the first element of the array. It cannot be assigned to another value.",
        "C is incorrect. Although the pointer is mutable, the string it points to is constant and cannot be changed.",
        "D is correct. The string is stored in a character array, which is mutable. The pointer is then initialized to point to the character array, so every operation on the pointer will affect the character array."
      ]
    },
    {
      "prompt": "Which of the following statements accurately describe(s) the usage of the null character in a string?",
      "answer": [
        0
      ],
      "distractors": [
        "The null character represents the end of a string and is used to determine the string's length.",
        "The null character is used to indicate the beginning of a string.",
        "The null character is a special character that is not used in strings.",
        "The null character is used to indicate the presence of spaces within a string."
      ],
      "explainations": [
        "A is correct. In C, the null character is used to mark the end of a string. It is placed at the end of a character array (string) to indicate where the string ends. When processing a string, functions rely on the presence of the null character to determine the string's length and to identify the end of the string while performing operations on it.",
        "B is incorrect. The null character is not used to indicate the beginning of a string. It is specifically used to mark the end of a string.",
        "C is incorrect. The null character is indeed a special character, but it is actively used in strings to represent the end of the string. It has a specific purpose in string handling and is an essential part of C string conventions.",
        "D is incorrect. The null character is not used to indicate the presence of spaces within a string. Spaces within a string are represented by the space character `' '`."
      ]
    }
  ]
};