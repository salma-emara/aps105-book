let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Write a C program that prints \"Hello, World!\"",
      "programming": true,
      "code": "// This program prints the message \"Hello, World!\" on the screen.\n#include <stdio.h>\n\nint main(void){\n    printf(\"\");\n    return 0;\n}",
      "output": "Hello, World!",
      "answer": [],
      "distractors": [],
      "explainations": []
    },
    {
      "prompt": "Let's say you want to design a \"micro\" computer with exactly 64KB of memory. How many bits would you need to address each byte of memory?",
      "programming": false,
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