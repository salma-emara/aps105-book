let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Which of the following correctly dynamically allocates a 2D array with 3 rows and 2 columns?",
      "answer": [
        0,
        2
      ],
      "distractors": [
        "```\nint* arr[3];\nfor (int i = 0; i < 3; i++) {\n    arr[i] = (int*)malloc(2 * sizeof(int));\n}\n```\n",
        "```\nint* arr[2];\nfor (int i = 0; i < 2; i++) {\n    arr[i] = (int*)malloc(3 * sizeof(int));\n}\n```\n",
        "```\nint** arr = (int**)malloc(3 * sizeof(int*));\n\nfor (int i = 0; i < 3; i++) {\n    *(arr + i) = (int*)malloc(2 * sizeof(int));\n}\n```\n",
        "```\nint** arr = (int**)malloc(2 * sizeof(int*));\n\nfor (int i = 0; i < 2; i++) {\n    *(arr + i) = (int*)malloc(3 * sizeof(int));\n}\n```\n"
      ],
      "explainations": [
        "A is correct. It statically allocates an array of 3 pointers to integers (which are rows), and then dynamically allocates 2 integers for each of those pointers.",
        "B is incorrect. It statically allocates an array of 2 pointers to integers (which are rows), and then dynamically allocates 3 integers for each of those pointers.",
        "C is correct. It dynamically allocates an array of 3 pointers to integers (which are rows), and then dynamically allocates 2 integers for each of those pointers.",
        "D is incorrect. It dynamically allocates an array of 2 pointers to integers (which are rows), and then dynamically allocates 3 integers for each of those pointers."
      ]
    },
    {
      "prompt": "Assuming `arr` is a 2D array with 3 rows and 2 columns and has been dynamically allocated as follows, which of the following is/are correct?\n\n```\nint** arr = (int**)malloc(3 * sizeof(int*));\n\nfor (int i = 0; i < 3; i++) {\n    *(arr + i) = (int*)malloc(2 * sizeof(int));\n}\n```\n\n",
      "answer": [
        3
      ],
      "distractors": [
        "`free(arr)` frees the entire array allocated by `arr`.",
        "`free(arr)` frees the memory of `arr[0][0]`.",
        "`free(arr[0])` frees the first column of the array allocated by `arr`.",
        "`free(arr[0])` frees the first row of the array allocated by `arr`."
      ],
      "explainations": [
        "A is incorrect. `free(arr)` only frees the memory of the pointers to the rows, not the memory of the rows themselves.",
        "B is incorrect. `free(arr)` only frees the memory of the pointers to the rows, not the memory of the rows themselves.",
        "C is incorrect. `free(arr[0])` frees the memory of the first row, not the first column.",
        "D is correct. `free(arr[0])` frees the memory of the first row."
      ]
    }
  ]
};