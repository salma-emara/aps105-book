let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Let's say you want to design a new number type for integer number, called `myint`. You want to use 12 bits to represent an integer. Which of the following range is correct for the new number type?",
      "answer": [
        0
      ],
      "distractors": [
        "`myint` can represent numbers from -2048 to 2047, `unsigned myint` can represent numbers from 0 to 4095",
        "`myint` can represent numbers from -2048 to 2047, `unsigned myint` can represent numbers from 0 to 2047",
        "`myint` can represent numbers from -1024 to 1023, `unsigned myint` can represent numbers from 0 to 2047",
        "`myint` can represent numbers from -1024 to 1023, `unsigned myint` can represent numbers from 0 to 1023"
      ],
      "explainations": [
        "A is correct. Since we are using 12 bits to represent an integer, the range of `myint` is from -2^11 to 2^11 - 1, one sign bit is used to indicate whether it is positive or negtive. The range of `unsigned myint` is from 0 to 2^12, as the sign bit is not used.",
        "B is incorrect. Since we are using 12 bits to represent an integer, the range of `myint` is from -2^11 to 2^11 - 1, one sign bit is used to indicate whether it is positive or negtive. The range of `unsigned myint` is from 0 to 2^12, as the sign bit is not used.",
        "C is incorrect. Since we are using 12 bits to represent an integer, the range of `myint` is from -2^11 to 2^11 - 1, one sign bit is used to indicate whether it is positive or negtive. The range of `unsigned myint` is from 0 to 2^12, as the sign bit is not used.",
        "D is incorrect. Since we are using 12 bits to represent an integer, the range of `myint` is from -2^11 to 2^11 - 1, one sign bit is used to indicate whether it is positive or negtive. The range of `unsigned myint` is from 0 to 2^12, as the sign bit is not used."
      ]
    },
    {
      "prompt": "Which of the following can print `The course number is APS105.`?",
      "answer": [
        0,
        2,
        3
      ],
      "distractors": [
        "`printf(\"The course number is %c%c%c%c%c%c.\", 'A', 'P', 'S', '1', '0', '5');`\n",
        "`printf(\"The course number is %c%c%c%d%d%d.\", 'A', 'P', 'S', '1', '0', '5');`\n",
        "`printf(\"The course number is %c%c%c%c%c%c.\", 'A', 'P', 'S', 49, 48, 53);`\n",
        "`printf(\"The course number is %c%c%c%c%c%c.\", 'A', 'P', 'S', '0' + 1, '0' + 0, '0' + 5);`\n"
      ],
      "explainations": [
        "A is correct. It literally prints each character of `APS105` one by one.",
        "B is incorrect. `%d` is used to print integer, not character.",
        "C is correct. 49 is the ASCII code for `'1'`, 48 is the ASCII code for `'0'`, 53 is the ASCII code for `'5'`.",
        "D is correct. `'0' + 1` will first convert `'0'` to its ASCII code, which is 48, then add 1 to it, which gives 49, the ASCII code for `'1'`. Similarly, `'0' + 0` gives 48, the ASCII code for `'0'`, and `'0' + 5` gives 53, the ASCII code for `'5'`."
      ]
    },
    {
      "prompt": "In which of the following the variable `isPositive` is correctly assigned to `true` if `n` is positive? (Assume `n` is an integer)",
      "answer": [
        0,
        2,
        3
      ],
      "distractors": [
        "`bool isPositive = n > 0;`\n",
        "`bool isPositive = n;`\n",
        "`bool isPositive = n > 0 != 0;`\n",
        "`bool isPositive = n <= 0 != 1;`\n"
      ],
      "explainations": [
        "A is correct. The condition `n > 0` is literally checking if `n` is positive.",
        "B is incorrect. In C, `0` is considered as `false`, and any non-zero number is considered as `true`. Therefore, `if (n)` is checking if `n` is non-zero. Thus, `n` can be negative or positive.",
        "C is correct. `n > 0` is checking if `n` is positive, and `!= 0` is checking if the result of `n > 0` is non-zero. The result of `n > 0` is either `true` or `false`, which is `1` or `0` in C. Therefore, `n > 0 != 0` is checking if `n > 0` is not `false`",
        "D is correct. Similar to C option."
      ]
    }
  ]
};