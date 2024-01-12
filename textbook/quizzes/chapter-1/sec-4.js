let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Which of the following code snippets demonstrates good coding style, following the guidelines mentioned in the \"Bad coding style\" section of the handout?",
      "answer": [
        1
      ],
      "distractors": [
        "```\n#include <stdio.h>\nint main(void){printf(\"Hello World!\\n\");return 0;}\n```\n",
        "```\n#include <stdio.h>\nint main(void) {\n    printf(\"Hello World!\\n\");\n    return 0;\n}\n```\n",
        "```\n#include <stdio.h>\nint main(void) {\n    printf(\"Hello World!\\n\");\nreturn 0;}\n```\n",
        "```\n#include <stdio.h>\nint main(void) {\nprintf(\"Hello World!\\n\");\nreturn 0;}\n```\n"
      ],
      "explainations": [
        "A) is not good coding style. Good coding style involves proper indentation, using new lines for readability, and placing opening and closing braces on separate lines. Option B adheres to these guidelines, making the code more readable and maintainable.",
        "B) is good coding style. Good coding style involves proper indentation, using new lines for readability, and placing opening and closing braces on separate lines. Option B adheres to these guidelines, making the code more readable and maintainable.",
        "C) is not good coding style. Good coding style involves proper indentation, using new lines for readability, and placing opening and closing braces on separate lines. Option B adheres to these guidelines, making the code more readable and maintainable.",
        "D) is not good coding style. Good coding style involves proper indentation, using new lines for readability, and placing opening and closing braces on separate lines. Option B adheres to these guidelines, making the code more readable and maintainable."
      ]
    },
    {
      "prompt": "Consider the code snippet below. How many errors are there in the code?\n```\n#include <stdio.h>\n\nint main(void) {\n    int num;\n    \n    printf(\"Enter a number: \");\n    scanf(\"%d\", num);\n    \n    printf(\"The number you entered is: %d\\n\", &num);\n    \n    return 0\n}\n```\n",
      "answer": [
        3
      ],
      "distractors": [
        "0",
        "1",
        "2",
        "3"
      ],
      "explainations": [
        "There are 3 errors. \nError 1: Missing ampersand before num in scanf:\nThe scanf function requires the address of the variable where the input should be stored. However, in this code, the ampersand (`&`) is missing before num in the scanf statement. To fix this error, you should use `scanf(\"%d\", &num);`.\n\nError 2: Redundant ampersand before num in the second printf:\nThe printf function expects the value of the variable to be printed, not its address. In this code, there is a redundant ampersand (`&`) before num in the second printf statement. To fix this error, you should remove the ampersand and use `printf(\"The number you entered is: %d\\n\", num);`.\n\nError 3: Missing semicolon at the end of the line:\nAt the end of the `return 0` line, there is a missing semicolon (`;`). In C, a semicolon is used to terminate a statement. To fix this error, you should add a semicolon at the end of the line, like this: `return 0;`.\n",
        "There are 3 errors. \nError 1: Missing ampersand before num in scanf:\nThe scanf function requires the address of the variable where the input should be stored. However, in this code, the ampersand (`&`) is missing before num in the scanf statement. To fix this error, you should use `scanf(\"%d\", &num);`.\n\nError 2: Redundant ampersand before num in the second printf:\nThe printf function expects the value of the variable to be printed, not its address. In this code, there is a redundant ampersand (`&`) before num in the second printf statement. To fix this error, you should remove the ampersand and use `printf(\"The number you entered is: %d\\n\", num);`.\n\nError 3: Missing semicolon at the end of the line:\nAt the end of the `return 0` line, there is a missing semicolon (`;`). In C, a semicolon is used to terminate a statement. To fix this error, you should add a semicolon at the end of the line, like this: `return 0;`.\n",
        "There are 3 errors. \nError 1: Missing ampersand before num in scanf:\nThe scanf function requires the address of the variable where the input should be stored. However, in this code, the ampersand (`&`) is missing before num in the scanf statement. To fix this error, you should use `scanf(\"%d\", &num);`.\n\nError 2: Redundant ampersand before num in the second printf:\nThe printf function expects the value of the variable to be printed, not its address. In this code, there is a redundant ampersand (`&`) before num in the second printf statement. To fix this error, you should remove the ampersand and use `printf(\"The number you entered is: %d\\n\", num);`.\n\nError 3: Missing semicolon at the end of the line:\nAt the end of the `return 0` line, there is a missing semicolon (`;`). In C, a semicolon is used to terminate a statement. To fix this error, you should add a semicolon at the end of the line, like this: `return 0;`.\n",
        "There are 3 errors. \nError 1: Missing ampersand before num in scanf:\nThe scanf function requires the address of the variable where the input should be stored. However, in this code, the ampersand (`&`) is missing before num in the scanf statement. To fix this error, you should use `scanf(\"%d\", &num);`.\n\nError 2: Redundant ampersand before num in the second printf:\nThe printf function expects the value of the variable to be printed, not its address. In this code, there is a redundant ampersand (`&`) before num in the second printf statement. To fix this error, you should remove the ampersand and use `printf(\"The number you entered is: %d\\n\", num);`.\n\nError 3: Missing semicolon at the end of the line:\nAt the end of the `return 0` line, there is a missing semicolon (`;`). In C, a semicolon is used to terminate a statement. To fix this error, you should add a semicolon at the end of the line, like this: `return 0;`.\n"
      ]
    },
    {
      "prompt": "Consider the code snippet below. How can you print the `2%d\tab2%d` using printf?",
      "answer": [
        0
      ],
      "distractors": [
        "```\nint num = 2;\nprintf(\"%d%%d\\tab%d%%d\", num, num);\n```\n",
        "```\nint num = 2;\nprintf(\"%d\\\\%d\\tab%d\\\\%d\", num, num);\n```\n",
        "```\nint num = 2;\nprintf(\"%d%%d\\tab%d%%d\", num);\n```\n",
        "```\nint num = 2;\nprintf(\"%d%d\\tab%d%d\", num);\n```\n"
      ],
      "explainations": [
        "A) is correct. Note that `\\t` is an escape character. For `%` to be printed, you need to use `%%`; There are two decimal numbers to be printed, so you need to use two `%d`s and follow the format specifier with the two variables separately, even though they are the same.",
        "B) is incorrect. It should use `%%` to print `%`. Here the first two `%d`s will be replaced by the two numbers, and the last two `%d`s will be replaced by garbage values.",
        "C) is incorrect. It should use two `%d`s to print the two numbers. The last `%d` will be replaced by a garbage value.",
        "D) is incorrect. It should use `%%` to print `%`. Here the first `%d` will be replaced by the number, and the rest will be replaced by garbage values."
      ]
    }
  ]
};