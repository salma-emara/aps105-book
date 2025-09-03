let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Write a C program that prints \"Hello, World!\"",
      "programming": true,
      "tracing": false,
      "code": "#include <stdio.h>\n\nint main(void){\n    printf(\"\");\n    return 0;\n}",
      "answer": [],
      "distractors": [],
      "explainations": [],
      "testcases": [
        {
          "input": [
            ""
          ],
          "output": [
            "Hello, World!"
          ]
        }
      ]
    },
    {
      "prompt": "In the box provided below, write the output generated after the following program is completely executed.",
      "programming": false,
      "tracing": true,
      "code": "#include <stdio.h>\nint main(void) {\n  int first = 1, second = 2, data[4] = {10, 20, 30, 40};\n  int *third = &second, *fourth = &first, *fifth = data + first + 1;\n  (*third)++;\n  (*fourth)++;\n  data[second] = *fifth + first + *third + *fourth;\n  printf(\"first = %d, second = %d, third = %d, fourth = %d, fifth = %d\\n\",\n         first, second, *third, *fourth, *fifth);\n  for (int i = 0; i < 4; i++) {\n    printf(\"%d, \", data[i]);\n  }\n  printf(\"\\n\");\n  return 0;\n}\n",
      "answer": "first = 2, second = 3, third = 3, fourth = 2, fifth = 30\n10, 20, 30, 37,",
      "distractors": [],
      "explainations": []
    },
    {
      "prompt": "What will be printed when the following C program is executed?",
      "programming": false,
      "tracing": true,
      "code": "int main(void) {\n  int first = 1, second = 10;\n  int *pointerToFirst, *pointerToSecond;\n\n  pointerToFirst = &first;\n  pointerToSecond = &second;\n  *pointerToFirst = *pointerToSecond - *pointerToFirst;\n  *pointerToSecond = *pointerToSecond - *pointerToFirst;\n  *pointerToFirst = *pointerToSecond + *pointerToFirst;\n  printf(\"%d, %d\\n\", first, second);\n}\n",
      "answer": "10, 1",
      "distractors": [],
      "explainations": []
    },
    {
      "prompt": "Write a C program that reads two integers from the user and prints their sum.",
      "programming": true,
      "tracing": false,
      "code": "#include <stdio.h>\n\nint main() {\n    int a, b;\n\n    // printf(\"Enter two integers:\");\n\n    // Read two integers from one line\n    scanf(\"%d %d\", &a, &b);\n\n    // Print the sum\n    printf(\"%d\\n\", a + b);\n\n    return 0;\n}\n",
      "answer": [],
      "distractors": [],
      "explainations": [],
      "testcases": [
        {
          "input": [
            "3 5"
          ],
          "output": [
            "Enter two integers:\n8"
          ]
        }
      ]
    },
    {
      "prompt": "Write a program that converts inches to centimeters. The program should prompt the user for a number of inches and then output the equivalent number of centimeters. The conversion factor is 2.54 centimeters per inch.",
      "programming": true,
      "tracing": false,
      "code": "// Description: This program convert inches to centimeters\n#include <stdio.h>\n\nint main(void){\n  // Declare variables\n  const double InchesToCm = 2.54;\n  double inputInches, outputCm;\n\n  // Prompt user for input\n  scanf(\"%lf\", &inputInches);\n  // Convert inches to centimeters\n  outputCm = inputInches * InchesToCm;\n \n  // Display output in 2 decimal places\n  printf(\"The number of centimeters is %.2lf\\n\", outputCm);\n  return 0;\n}",
      "answer": [],
      "distractors": [],
      "explainations": [],
      "testcases": [
        {
          "input": [
            "10"
          ],
          "output": [
            "The number of centimeters is 25.40"
          ]
        },
        {
          "input": [
            "5"
          ],
          "output": [
            "The number of centimeters is 12.70"
          ]
        },
        {
          "input": [
            "3.4"
          ],
          "output": [
            "The number of centimeters is 8.64"
          ]
        }
      ]
    },
    {
      "prompt": "Let's say you want to design a \"micro\" computer with exactly 64KB of memory. How many bits would you need to address each byte of memory?",
      "programming": false,
      "tracing": false,
      "code": "",
      "output": "",
      "answer": [
        3
      ],
      "distractors": [
        "4 bits",
        "8 bits",
        "12 bits",
        "16 bits"
      ],
      "explainations": [
        "4 bits is incorrect. The memory is organized in cells. Each cell stores a byte. Each cell has an address. This makes the memory byte-addressable. This means at each address only one byte is stored.\n\nTo address 64KB of memory, we can use a 16-bit address. This allows us to represent 2^16 = 65,536 unique addresses, which covers the range of 64KB.\n",
        "8 bits is incorrect. The memory is organized in cells. Each cell stores a byte. Each cell has an address. This makes the memory byte-addressable. This means at each address only one byte is stored.\n\nTo address 64KB of memory, we can use a 16-bit address. This allows us to represent 2^16 = 65,536 unique addresses, which covers the range of 64KB.\n",
        "12 bits is incorrect. The memory is organized in cells. Each cell stores a byte. Each cell has an address. This makes the memory byte-addressable. This means at each address only one byte is stored.\n\nTo address 64KB of memory, we can use a 16-bit address. This allows us to represent 2^16 = 65,536 unique addresses, which covers the range of 64KB.\n",
        "16 bits is correct. The memory is organized in cells. Each cell stores a byte. Each cell has an address. This makes the memory byte-addressable. This means at each address only one byte is stored.\n\nTo address 64KB of memory, we can use a 16-bit address. This allows us to represent 2^16 = 65,536 unique addresses, which covers the range of 64KB.\n"
      ]
    }
  ]
};