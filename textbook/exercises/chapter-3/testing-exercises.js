let parsedObject; 
  parsedObject = {
  "exercises": [
    {
      "title": "Question 2 in Winter 2018 Midterm Exam",
      "difficulty": "Easy",
      "type": "explaination",
      "multipart": false,
      "question": "Writea single C statement — which contains exactly one terminating semi-colon (`;`), and does\nnot contain brace brackets (`{` or `}`) — that declares a `bool` variable named `isHighlighted`, and\nsets its value to true if and only if the value stored in an integer variable named `characterCount`\nis an **even positive** number. Assume that the variable `characterCount` has already been declared\nand initialized.\n",
      "answer": " \nbool isHighlighted = characterCount % 2 == 0 && characterCount > 0; "
    },
    {
      "title": "Question 2 in Winter 2019 Midterm Exam",
      "difficulty": "Easy",
      "type": "explaination",
      "multipart": false,
      "question": "Write a single C statement that declares a boolean-type variable named `divisible` and assigns\ntrue to divisible if and only if the value stored in the int variable named `numOfItems` is exactly\ndivisible by $5$ or $7$. Assume that variable `numOfItems` has been declared and initialized.\n",
      "answer": " \nbool divisible = numOfItems % 5 == 0 || numOfItems % 7 == 0; "
    },
    {
      "title": "Question 7 in Winter 2018 Final Exam",
      "difficulty": "Easy",
      "type": "multiple-choice",
      "table": false,
      "multipart": true,
      "question": "Evaluate the following relational expressions by circling the right answer.\n",
      "question-code": " '\\O' == 0\n",
      "answer": [
        0
      ],
      "choices": [
        "True",
        "False"
      ],
      "explanations": [
        "True, since \\0 has ASCII code of zero"
      ]
    },
    {
      "title": "Question 7 in Winter 2018 Final Exam",
      "difficulty": "Easy",
      "type": "multiple-choice",
      "table": true,
      "multipart": true,
      "question": " \n",
      "question-code": " int x = 10 % 8;\n(x > 0) && (x % 2 == 0) && !false\n",
      "answer": [
        0
      ],
      "choices": [
        "True",
        "False"
      ],
      "explanations": [
        "True, since x stores 2"
      ]
    },
    {
      "title": "Question 7 in Winter 2018 Final Exam",
      "difficulty": "Easy",
      "type": "multiple-choice",
      "table": true,
      "multipart": true,
      "question": " \n",
      "question-code": " 'c' - 3 == 'a'\n",
      "answer": [
        1
      ],
      "choices": [
        "True",
        "False"
      ],
      "explanations": [
        "False, since 'c' - 2 == 'a'"
      ]
    },
    {
      "title": "Question 7 in Winter 2018 Final Exam",
      "difficulty": "Easy",
      "type": "multiple-choice",
      "table": true,
      "multipart": true,
      "question": " \n",
      "question-code": " \nint w = rand() % 75 * 2 - 99;\n(w < -99) || (w > 49);\n",
      "answer": [
        1
      ],
      "choices": [
        "True",
        "False"
      ],
      "explanations": [
        "False, since the range of random numbers in w is between -99 and 49 inclusive"
      ]
    }
  ]
};