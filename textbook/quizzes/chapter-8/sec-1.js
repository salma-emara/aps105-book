let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "When dynamically allocating memory in C, which of the following statements is/are true?",
      "answer": [
        1
      ],
      "distractors": [
        "Dynamic memory allocation allows you to allocate memory at compile-time.",
        "Dynamic memory allocation in C is done using functions such as `malloc()`",
        "Dynamically allocated memory is automatically deallocated when it goes out of scope.",
        "None of the above."
      ],
      "explainations": [
        "A is incorrect. Dynamic memory allocation allows you to allocate memory at run-time.",
        "B is correct. Dynamic memory allocation in C is done using functions such as `malloc()`",
        "C is incorrect. Dynamically allocated memory is not automatically deallocated when it goes out of scope. You need to use the `free()` function to deallocate it.",
        "D is incorrect as B is correct."
      ]
    },
    {
      "prompt": "What is a memory leak in C programming?",
      "answer": [
        2
      ],
      "distractors": [
        "It refers to a situation where the computer's memory is full and cannot allocate any more memory.",
        "It occurs when a program intentionally releases memory to conserve resources.",
        "It happens when dynamically allocated memory is not deallocated when no longer needed.",
        "It is a programming technique used to optimize memory usage in C."
      ],
      "explainations": [
        "A is incorrect. A memory leak occurs when memory that is dynamically allocated using functions like `malloc()` is not deallocated using the `free()` function when it is no longer needed.",
        "B is incorrect. A memory leak occurs when memory that is dynamically allocated using functions like `malloc()` is not deallocated using the `free()` function when it is no longer needed.",
        "C is correct. A memory leak occurs when memory that is dynamically allocated using functions like `malloc()` is not deallocated using the `free()` function when it is no longer needed.",
        "D is incorrect. A memory leak occurs when memory that is dynamically allocated using functions like `malloc()` is not deallocated using the `free()` function when it is no longer needed."
      ]
    },
    {
      "prompt": "Which of the following statements is/are correct to allocate memory dynamically for an array of integers in C?",
      "answer": [
        3
      ],
      "distractors": [
        "`int myArray[] = (int)malloc(10 * sizeof(int));`",
        "`int myArray = (int*)malloc(10 * sizeof(int));`",
        "`int* myArray = (int*)malloc(10 * sizeof(int*));`",
        "`int* myArray = (int*)malloc(10 * sizeof(int));`"
      ],
      "explainations": [
        "A is incorrect. The return type of `malloc()` is `void*`, which is supposed to be cast to the appropriate type according to the type of data being allocated. In this case, the type of data being allocated is `int` array, so the return value of `malloc()` should be cast to `int*`. Also, the syntax of `int myArray[]` indicates that myArray is a static array not dynamically allocated.",
        "B is incorrect. `malloc` returns the address of the first element in an array of `int`, which should be held in a pointer not an integer.",
        "C is incorrect. The `myArray` is an array of `int` not an array of `int*`. One element has a size of `sizeof(int)` not `sizeof(int*)`.",
        "D is correct. This statement dynamically allocates 10 elements each of size `sizeof(int)`, and stores the address to the first element in a pointer with type `int*`."
      ]
    }
  ]
};