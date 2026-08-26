registerExercises("../trace/exercises/chapter13-2/testing-exercises", {
  "exercises": [
    {
      "question-id": "visualizer-LIST-CONCEPT1",
      "title": "Building the List Correctly",
      "difficulty": "Easy",
      "table": false,
      "multipart": false,
      "type": "multiple-choice",
      "question": "What is the resulting structure of the list from `head`?\n\n```{code-block} c\nNode *head = createNode(1);\nhead = createNode(2);\nhead->next = createNode(4);\n```\n",
      "answer": [
        1
      ],
      "choices": [
        "`1 -> 2 -> 4`",
        "`2 -> 4`",
        "`1 -> 4`",
        "Runtime error"
      ]
    }
  ]
});