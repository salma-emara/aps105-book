let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Which of below is/are reasonable? (Type candidates: `int`, `double`, `const int`, `const double`)",
      "answer": [
        0,
        2,
        3
      ],
      "distractors": [
        "Days in week: `const int`",
        "Gravity: `double`",
        "Age of a person in years: `int`",
        "Planck's constant in joule-seconds: `const double`"
      ],
      "explainations": [
        "A is correct because the number of days in a week is a constant integer value.",
        "B is incorrect because gravity is a constant value (9.8), so it should be declared as `const double`.",
        "C is correct because a person's age is an integer value.",
        "D is correct because Planck's constant is a constant double value (6.02214076e23)`."
      ]
    },
    {
      "prompt": "Jade is writing a program to convert a temperature in Celsius to Fahrenheit (If input 26.7, it should output 80.06). She has written the following code. How many the errors in the code?\n```\n#include <stdio.h>\n\nint main(void) {\n    // Declare variables\n    int fahrenheit;\n    double celsius;\n\n    // Prompt user for input\n    printf(\"Enter the temperature in Celsius: \");\n    scanf(\"%f\", &celsius);\n\n    // Convert Celsius to Fahrenheit\n    fahrenheit = (celsius * 9 / 5) + 32;\n\n    // Display output\n    printf(\"The temperature in Fahrenheit is: %.2lf\", fahrenheit);\n\n    return 0;\n}\n```\n",
      "answer": [
        2
      ],
      "distractors": [
        "0",
        "1",
        "2",
        "3"
      ],
      "explainations": [
        "There are 2 errors.\nError 1: The variable `celsius` is declared as a `double` but the `scanf` function is using `%f` to read the input. The `%f` is used to read a `float` value. To read a `double` value, we should use `%lf`.\n\nError 2: The variable `fahrenheit` is declared as an `int` but the according to the sample input and output, it should be a `double`.\n",
        "There are 2 errors.\nError 1: The variable `celsius` is declared as a `double` but the `scanf` function is using `%f` to read the input. The `%f` is used to read a `float` value. To read a `double` value, we should use `%lf`.\n\nError 2: The variable `fahrenheit` is declared as an `int` but the according to the sample input and output, it should be a `double`.\n",
        "There are 2 errors.\nError 1: The variable `celsius` is declared as a `double` but the `scanf` function is using `%f` to read the input. The `%f` is used to read a `float` value. To read a `double` value, we should use `%lf`.\n\nError 2: The variable `fahrenheit` is declared as an `int` but the according to the sample input and output, it should be a `double`.\n",
        "There are 2 errors.\nError 1: The variable `celsius` is declared as a `double` but the `scanf` function is using `%f` to read the input. The `%f` is used to read a `float` value. To read a `double` value, we should use `%lf`.\n\nError 2: The variable `fahrenheit` is declared as an `int` but the according to the sample input and output, it should be a `double`.\n"
      ]
    }
  ]
};