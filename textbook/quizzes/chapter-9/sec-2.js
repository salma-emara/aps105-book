let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "When passing a 2D array to a function in C/C++, why is it necessary to specify the number of columns in the second dimension of the array between `[]` in the function parameter list?",
      "answer": [
        3
      ],
      "distractors": [
        "To ensure proper memory allocation.",
        "To enable the function to iterate over the correct number of rows and columns.",
        "To prevent memory leaks and ensure efficient memory management.",
        "To allows the compiler to correctly calculate the memory offsets when accessing array elements."
      ],
      "explainations": [
        "A is incorrect. No new memory is allocated when passing an array to a function.",
        "B is incorrect. While the number of columns is necessary if we were to iterate over all the elements in the array and need to know the row and column number, however, this does not directly address the necessity for including column number in the second dimension of the array.",
        "C is incorrect. It doesn't prevent or cause memory leaks.",
        "D is correct. It is to calculate the correct memory address of each element in the array when indexing it. For example, `arr[1][2]` translates to &arr[0][0] + 1 * number of columns + 2. Without knowing the number of columns, accessing row 2 and column 3 is impossible inside a function."
      ]
    },
    {
      "prompt": "Which of the following functions with 2D array parameter have correct declaration?",
      "answer": [
        3
      ],
      "distractors": [
        "```\nvoid func(int arr[][], int rows, int cols) {\n    // function body\n}\n```\n",
        "```\nvoid func(int arr[][cols], int rows, int cols) {\n    // function body\n}\n```\n",
        "```\nvoid func(int rows, int cols, int arr[rows][]) {\n    // function body\n}\n```\n",
        "```\nvoid func(int rows, int cols, int arr[][cols]) {\n    // function body\n}\n```\n"
      ],
      "explainations": [
        "A is incorrect. The function declaration is incorrect. The size of the column of the 2D array must be specified.",
        "B is incorrect. The function declaration is incorrect. The `cols` parameter is not declared before it is used.",
        "C is incorrect. The function declaration is incorrect. The size of the column of the 2D array must be specified.",
        "D is correct. The function declaration is correct. The size of the column of the 2D array is specified."
      ]
    }
  ]
};