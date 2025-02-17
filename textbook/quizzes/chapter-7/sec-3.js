let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "What is the purpose of passing the size of the array along with the pointer to the first element?",
      "answer": [
        1
      ],
      "distractors": [
        "To help the function know the data type of the array elements.",
        "To help the function determine the number of elements in the array.",
        "To help the function allocate memory for the array.",
        "None of the above."
      ],
      "explainations": [
        "A is incorrect. The data type of the array elements is determined by the declaration of the array argument.",
        "B is correct. The function needs to know the number of elements in the array so that it can process each element.",
        "C is incorrect. The memory has already been allocated for the array outside of the function.",
        "D is incorrect, as B is correct."
      ]
    },
    {
      "prompt": "Which of the following code can add 3 to all the elements of the array?",
      "answer": [
        0,
        1,
        2
      ],
      "distractors": [
        "```\n#include <stdio.h>\n\nvoid addN(int[], const int, int);\n\nint main(void) {\n    const int size = 3;\n    int x[3] = {1, 0, 5};\n    addN(x, size, 3);\n    for (int i = 0; i < size; i++) {\n        printf(\"%d \", x[i]);\n    }\n    return 0;\n}\n\nvoid addN(int list[], const int size, int n) {\n    for (int i = 0; i < size; i++) {\n        list[i] += n;\n    }\n}\n```\n",
        "```\n#include <stdio.h>\n\nvoid addN(int*, const int, int);\n\nint main(void) {\n    const int size = 3;\n    int x[3] = {1, 0, 5};\n    addN(x, size, 3);\n    for (int i = 0; i < size; i++) {\n        printf(\"%d \", x[i]);\n    }\n    return 0;\n}\n\nvoid addN(int *list, const int size, int n) {\n    for (int i = 0; i < size; i++) {\n        list[i] += n;\n    }\n}\n```\n",
        "```\n#include <stdio.h>\n\nvoid addN(int*, const int, int);\n\nint main(void) {\n    const int size = 3;\n    int x[3] = {1, 0, 5};\n    addN(x, size, 3);\n    for (int i = 0; i < size; i++) {\n        printf(\"%d \", x[i]);\n    }\n    return 0;\n}\n\nvoid addN(int *list, const int size, int n) {\n    for (int i = 0; i < size; i++) {\n        *(list + i) += n;\n    }\n}\n```\n",
        "```\n#include <stdio.h>\n\nvoid addN(int, const int, int);\n\nint main(void) {\n    const int size = 3;\n    int x[3] = {1, 0, 5};\n    addN(*x, size, 3);\n    for (int i = 0; i < size; i++) {\n        printf(\"%d \", x[i]);\n    }\n    return 0;\n}\n\nvoid addN(int list, const int size, int n) {\n    for (int i = 0; i < size; i++) {\n        *(&list + i) += n;\n    }\n}\n```\n"
      ],
      "explainations": [
        "A is correct. It is a basic way to pass the array to the function.",
        "B is correct. It uses `int*` instead of `int[]`, because they are equivalent.",
        "C is correct. It uses pointer arithmetic to access the array elements.",
        "D is incorrect. It only passes the value of the first element of the array. Although it tries to use pointer arithmetic, it does not work because the `&list` is not the address of the first element of the array. `list` has a copy of the value in `x[0].`"
      ]
    }
  ]
};