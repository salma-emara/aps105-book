let parsedObject; 
  parsedObject = {
  "exercises": [
    {
      "title": "Question 3 in Winter 2019 Final Exam",
      "difficulty": "Easy",
      "type": "explaination",
      "multipart": false,
      "question": "The following array of integers is the result of the first round of partitioning, used \nin the Quicksort algorithm to sort the array in ascending order. Identify the possible \narray element or elements that could have been used as the pivot in the first partitioning \nround. Justify your answer; guessing an answer with no justifications will result in a \nmark of zero. \n",
      "question-code": "{15, 6, 45, 60, 32, 71, 102, 81}\n",
      "answer": " \nThe pivot is 71, because all elements on its left are smaller than it \n`{15, 6, 45, 60, 32}`, and all elements on its right are larger then \nit `{102, 81}`. \n"
    },
    {
      "title": "Question 5 in Winter 2019 Final Exam",
      "difficulty": "Easy",
      "type": "explaination",
      "table": true,
      "multipart": true,
      "question": "We have a number of TAs who have carefully marked a large number of final exams and \nnow must sort them alphabetically.\n\n[PLEASE NOTE that this question is not worth many marks, so answer with a phrase!\n Do not spend time elaborating.]\n\n(a) Here are some sorting methods you know about. Which ones would work well,\nand which not well to allow the TAs to most quickly sort the exams? Why or why \nnot would the particular method work well or not?\n",
      "headers": [
        "Method",
        "OK?",
        "Reason"
      ],
      "rows": [
        [
          "Insertion Sort",
          "",
          ""
        ],
        [
          "Selection Sort",
          "",
          ""
        ],
        [
          "Bubble Sort",
          "",
          ""
        ],
        [
          "Quicksort Sort",
          "",
          ""
        ]
      ],
      "answer": [
        [
          "Insertion Sort",
          "No",
          "All TAs have to work on looking for one element to place it at the end"
        ],
        [
          "Selection Sort",
          "No",
          "All TAs have to work on looking for one element to place it at the end"
        ],
        [
          "Bubble Sort",
          "No",
          "All TAs have to work on looking for one element to place it at the end"
        ],
        [
          "Quicksort",
          "Yes",
          "Each TA can work on groups of exams"
        ]
      ]
    },
    {
      "title": "Question 5 in Winter 2019 Final Exam",
      "difficulty": "Easy",
      "type": "explaination",
      "table": false,
      "multipart": true,
      "question": " (b) What may be a better sorting method?\n",
      "answer": "Each TA takes a stack of exams and sorts into alphabetic piles which are then sorted.\n"
    }
  ]
};