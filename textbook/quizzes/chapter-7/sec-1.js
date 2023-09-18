let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "What is the purpose of using an array to store grades in the example mentioned at the beginning of the section?",
      "answer": [
        3
      ],
      "distractors": [
        "To easily access and initialize different elements.",
        "To avoid the trouble of dealing with multiple variables.",
        "To calculate the average grade more efficiently.",
        "All of the above."
      ],
      "explainations": [
        "A, B and C are all correct. Arrays are used to store multiple values of the same type in a single variable. This makes it easier to access and initialize different elements.",
        "A, B and C are all correct. Arrays are used to store multiple values of the same type in a single variable. This makes it easier to access and initialize different elements.",
        "A, B and C are all correct. Arrays are used to store multiple values of the same type in a single variable. This makes it easier to access and initialize different elements.",
        "A, B and C are all correct. Arrays are used to store multiple values of the same type in a single variable. This makes it easier to access and initialize different elements."
      ]
    },
    {
      "prompt": "In C programming language, how do you access the last element of an array?",
      "answer": [
        2
      ],
      "distractors": [
        "By using an index of -1.",
        "By using an index of 0.",
        "By using an index one less than the size of the array.",
        "By using an index equal to the size of the array."
      ],
      "explainations": [
        "A is incorrect. In C programming language, to access the first element, we use an index of 0, which makes the last element has an index of one less than the size.",
        "B is incorrect. In C programming language, to access the first element, we use an index of 0, which makes the last element has an index of one less than the size.",
        "C is correct. In C programming language, to access the first element, we use an index of 0, which makes the last element has an index of one less than the size.",
        "D is incorrect. In C programming language, to access the first element, we use an index of 0, which makes the last element has an index of one less than the size."
      ]
    },
    {
      "prompt": "Which of the following code can initialize an array of 5 intergers?",
      "answer": [
        1,
        3
      ],
      "distractors": [
        "```\nint arr[5] = {1, 2, 3};\n```\n",
        "```\nint arr[5] = {1, 2, 3, 4, 5};\n```\n",
        "```\nint arr[5];\nfor (int i = 1; i <= 5; i++) {\n    arr[i] = i;\n}\n```\n",
        "```\nint arr[] = {1, 2, 3, 4, 5};\n```\n"
      ],
      "explainations": [
        "A is correct. This is equivalent to `int arr[5] = {1, 2, 3, 0, 0};`, which means that the remaining elements in the array will be set to 0 when initializing fewer elements than the size of the array.",
        "B is correct. In C programming language, to initialize an array, we can use curly brackets to enclose the values.",
        "C is incorrect. The for loop will cause an error when `i == 5` because `arr[5]` is outside the bounds of the array. Remember the index of an array starts from 0.",
        "D is correct. The compiler will deduce the size of the array from the number of elements you are initializing between curly brackets."
      ]
    },
    {
      "prompt": "Jade is writing a similar program to the one mentioned in the material which reverses the elements in an array. The following code expects to print out `8 9 12 2 5 7`. How many errors are there in the code?\n```\n#include <stdio.h>\n#define SIZE 6\n\nint main(void){\n    int arr[SIZE] = [2, 5, 7, 8, 9, 12];\n    for(int low = 0, high = SIZE / 2 + 1; high < SIZE; low++, high++){\n        int temp = arr[low];\n        arr[low] = arr[high];\n        arr[high] = temp; \n    }\n\n    for (int index = 0; index < SIZE; index++){\n        printf(\"%d \", arr[index]);\n    } \n    printf(\"\\n\");\n    return 0;\n}\n```\n",
      "answer": [
        1
      ],
      "distractors": [
        "1",
        "2",
        "3",
        "4"
      ],
      "explainations": [
        "A is incorrect. There are 2 errors in the code.\nError 1:\nIn line 5, the initialization of the array is incorrect. The correct way to initialize an array is to use curly brackets to enclose the values.\n\nError 2:\nIn line 6, the initialization of the variable `high` is incorrect. The correct way to initialize the variable is to use `SIZE / 2` instead of `SIZE / 2 + 1`.\n",
        "B is correct. There are 2 errors in the code.\nError 1:\nIn line 5, the initialization of the array is incorrect. The correct way to initialize an array is to use curly brackets to enclose the values.\n\nError 2:\nIn line 6, the initialization of the variable `high` is incorrect. The correct way to initialize the variable is to use `SIZE / 2` instead of `SIZE / 2 + 1`.\n",
        "C is incorrect. There are 2 errors in the code.\nError 1:\nIn line 5, the initialization of the array is incorrect. The correct way to initialize an array is to use curly brackets to enclose the values.\n\nError 2:\nIn line 6, the initialization of the variable `high` is incorrect. The correct way to initialize the variable is to use `SIZE / 2` instead of `SIZE / 2 + 1`.\n",
        "D is incorrect. There are 2 errors in the code.\nError 1:\nIn line 5, the initialization of the array is incorrect. The correct way to initialize an array is to use curly brackets to enclose the values.\n\nError 2:\nIn line 6, the initialization of the variable `high` is incorrect. The correct way to initialize the variable is to use `SIZE / 2` instead of `SIZE / 2 + 1`.\n"
      ]
    }
  ]
};