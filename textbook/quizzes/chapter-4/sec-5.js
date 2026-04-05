let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Jade writes a program to print the following figure (input is 3):\n<br>\n`\n11111\n12221\n12321\n12221\n11111\n`\n<br>\nThe figure is a lots of squares. Each square is made of numbers. The numbers in the square are the same. The numbers in the square are from 1 to the half of the width of the square. The width of the square is an odd number. The width of the square is 5 in the example above.\n\nHere is the code Jade writes:\n```\n#include <stdio.h>\n\nint main() {\n    int n = 5;\n    for (int row = 1; row <= n; row++) {\n        for (int col = 1; col <= n; col++) {\n            int temp_row = row;\n            if (row >= n / 2 + 1) {\n                temp_row = n - row + 1;\n            }\n            int num = temp_row;\n            if (col < temp_row - 1) {\n                num = col;\n            }\n            if (col > n - temp_row + 1) {\n                num = n - col + 1;\n            }\n            printf(\"%d\", num);\n            printf(\"\\n\");\n        }\n    }\n    return 0;\n}\n```\nHow many errors are there in the code?\n",
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
        "A is incorrect. There are 2 errors in the code.\nError 1:\nThe 11th line, condition `col < temp_row - 1` is incorrect. When `n` is 5, `col` is 1 and `row` is 2, this condition will be true. The output will be like:\n`\n11111\n22221\n13321\n22221\n11111\n`\nThe correct version is `col < temp_row`.\n\nError 2:\nThe 18th line, print new line should be outside the inner loop.\n",
        "B is correct. There are 2 errors in the code.\nError 1:\nThe 11th line, condition `col < temp_row - 1` is incorrect. When `n` is 5, `col` is 1 and `row` is 2, this condition will be true. The output will be like:\n`\n11111\n22221\n13321\n22221\n11111\n`\nThe correct version is `col < temp_row`.\n\nError 2:\nThe 18th line, print new line should be outside the inner loop.\n",
        "C is incorrect. There are 2 errors in the code.\nError 1:\nThe 11th line, condition `col < temp_row - 1` is incorrect. When `n` is 5, `col` is 1 and `row` is 2, this condition will be true. The output will be like:\n`\n11111\n22221\n13321\n22221\n11111\n`\nThe correct version is `col < temp_row`.\n\nError 2:\nThe 18th line, print new line should be outside the inner loop.\n",
        "D is incorrect. There are 2 errors in the code.\n\nError 1:\nThe 11th line, condition `col < temp_row - 1` is incorrect. When `n` is 5, `col` is 1 and `row` is 2, this condition will be true. The output will be like:\n`\n11111\n22221\n13321\n22221\n11111\n`\nThe correct version is `col < temp_row`.\n\nError 2:\nThe 18th line, print new line should be outside the inner loop.\n"
      ]
    }
  ]
};