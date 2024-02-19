let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Jade is writing a program that calculated the discount on a price. For example, if user inputs `10 0.1`, it expects to output `9.00`. How many errors are there in the code below without changing the type of `price` and `discount`?\n```\n#include <stdio.h>\n\nvoid calDiscount(double*, double);\n\nint main() {\n    double price;\n    double discount;\n    scanf(\"%lf %lf\", price, &discount);\n    calDiscount(&price, discount);\n    printf(\"%.2lf\", &price);\n}\n\nvoid calDiscount(double *price, double discount) {\n    price *= (1 - discount);\n}\n```\n",
      "answer": [
        2
      ],
      "distractors": [
        "1",
        "2",
        "3",
        "4"
      ],
      "explainations": [
        "A is incorrect. There are 3 errors in the code.\nError 1:\nAt 8th line, the `scanf` function should be `scanf(\"%lf %lf\", &price, &discount);` instead of `scanf(\"%lf %lf\", price, &discount);`. The `scanf` function requires the address of the variable to store the input value, so the `&` operator is needed.\n\nError 2:\nAt 10th line, the `printf` function should be `printf(\"%.2lf\", price);` instead of `printf(\"%.2lf\", &price);`. The `printf` function requires the value of the variable to print, so the `&` operator is not needed.\n\nError 3:\nAt 14th line, `price *= discount;` should be `*price *= discount;`. The `price` is a pointer variable, so the `*` operator is needed to access the value of the variable. It is not recommended to use the same name for a pointer variable and a normal variable.\n",
        "B is incorrect. There are 3 errors in the code.\nError 1:\nAt 8th line, the `scanf` function should be `scanf(\"%lf %lf\", &price, &discount);` instead of `scanf(\"%lf %lf\", price, &discount);`. The `scanf` function requires the address of the variable to store the input value, so the `&` operator is needed.\n\nError 2:\nAt 10th line, the `printf` function should be `printf(\"%.2lf\", price);` instead of `printf(\"%.2lf\", &price);`. The `printf` function requires the value of the variable to print, so the `&` operator is not needed.\n\nError 3:\nAt 14th line, `price *= discount;` should be `*price *= discount;`. The `price` is a pointer variable, so the `*` operator is needed to access the value of the variable. It is not recommended to use the same name for a pointer variable and a normal variable.\n",
        "C is correct. There are 3 errors in the code.\nError 1:\nAt 8th line, the `scanf` function should be `scanf(\"%lf %lf\", &price, &discount);` instead of `scanf(\"%lf %lf\", price, &discount);`. The `scanf` function requires the address of the variable to store the input value, so the `&` operator is needed.\n\nError 2:\nAt 10th line, the `printf` function should be `printf(\"%.2lf\", price);` instead of `printf(\"%.2lf\", &price);`. The `printf` function requires the value of the variable to print, so the `&` operator is not needed.\n\nError 3:\nAt 14th line, `price *= discount;` should be `*price *= discount;`. The `price` is a pointer variable, so the `*` operator is needed to access the value of the variable. It is not recommended to use the same name for a pointer variable and a normal variable.\n",
        "D is incorrect. There are 3 errors in the code.\nError 1:\nAt 8th line, the `scanf` function should be `scanf(\"%lf %lf\", &price, &discount);` instead of `scanf(\"%lf %lf\", price, &discount);`. The `scanf` function requires the address of the variable to store the input value, so the `&` operator is needed.\n\nError 2:\nAt 10th line, the `printf` function should be `printf(\"%.2lf\", price);` instead of `printf(\"%.2lf\", &price);`. The `printf` function requires the value of the variable to print, so the `&` operator is not needed.\n\nError 3:\nAt 14th line, `price *= discount;` should be `*price *= discount;`. The `price` is a pointer variable, so the `*` operator is needed to access the value of the variable. It is not recommended to use the same name for a pointer variable and a normal variable.\n"
      ]
    },
    {
      "prompt": "What is the size of the pointer variable on an old machine (32 bits)?",
      "answer": [
        0
      ],
      "distractors": [
        "4 bytes",
        "8 bytes",
        "16 bytes",
        "It varies depending on the data type"
      ],
      "explainations": [
        "A is correct. A pointer is a memory address, and on a 32-bit machine, a memory address is 32 bits, or 4 bytes.",
        "B is incorrect. A pointer is a memory address, and on a 32-bit machine, a memory address is 32 bits, or 4 bytes.",
        "C is incorrect. A pointer is a memory address, and on a 32-bit machine, a memory address is 32 bits, or 4 bytes.",
        "D is incorrect. A pointer is a memory address, and on a 32-bit machine, a memory address is 32 bits, or 4 bytes."
      ]
    },
    {
      "prompt": "When inputting `10 5` and `5 10` to the following program, what is the output?\n```\n#include <stdio.h>\n\nint* innerFunc(int**, int**);\nint outerFunc(int*, int*, int*);\n\nint main() {\n    int val1, val2;\n    scanf(\"%d %d\", &val1, &val2);\n    int *pval1 = &val1;\n    int *pval2 = &val2;\n    printf(\"%d\", outerFunc(innerFunc(&pval1, &pval2), pval1, pval2));\n    \n    return 0;\n}\n\nint* innerFunc(int **ppval1, int **ppval2) {\n    int* temp;\n    if (**ppval1 > **ppval2) {\n        temp = *ppval1;\n    } else {\n        temp = *ppval2; \n    }\n    return temp;\n}\n\nint outerFunc(int *largest, int *pval1, int *pval2) {\n    int temp;\n    if (largest == pval1) {\n        temp = *largest - *pval2;\n    } else {\n        temp = *largest - *pval1;\n    }\n    return temp;\n}\n```\n",
      "answer": [
        3
      ],
      "distractors": [
        "Garbage address value.",
        "Garbage value.",
        "5 -5",
        "5 5"
      ],
      "explainations": [
        "A is incorrect. The `innerFunc` function returns the address of the larger value between `val1` and `val2`. The `outerFunc` function returns the difference between the largest value and the other value. In both inputs, the largest value is `10`, and the other value is `5`, so the output is always `5`.",
        "B is incorrect. The `innerFunc` function returns the address of the larger value between `val1` and `val2`. The `outerFunc` function returns the difference between the largest value and the other value. In both inputs, the largest value is `10`, and the other value is `5`, so the output is always `5`.",
        "C is incorrect. The `innerFunc` function returns the address of the larger value between `val1` and `val2`. The `outerFunc` function returns the difference between the largest value and the other value. In both inputs, the largest value is `10`, and the other value is `5`, so the output is always `5`.",
        "D is correct. The `innerFunc` function returns the address of the larger value between `val1` and `val2`. The `outerFunc` function returns the difference between the largest value and the other value. In both inputs, the largest value is `10`, and the other value is `5`, so the output is always `5`."
      ]
    },
    {
      "prompt": "What can happen if dereferencing a pointer variable that is not initialized?",
      "answer": [
        3
      ],
      "distractors": [
        "The compiler will give an warning.",
        "The program crashes with a segmentation fault.",
        "Another variable is overwritten.",
        "Any of the above. The program will have an undefined behavior."
      ],
      "explainations": [
        "A is incorrect. The compiler may give an warning and recommend you set the address of the pointer to NULL when you declare it.",
        "B is incorrect. If the garbage address in the pointer exists, but your program can not access or does not have permission to access, the operating system will raise an error named Segmentation Fault error.",
        "C is incorrect. If the address exists, and your program can access it (rarely happens), it may change a value of another variable in your program.",
        "D is correct. Any of the errors may occur. Hence, the program will have an undefined behavior."
      ]
    }
  ]
};