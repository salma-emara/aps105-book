registerExercises("../trace/exercises/chapter13-3/testing-exercises", {
  "exercises": [
    {
      "question-id": "chapter13-insert-q1",
      "title": "Counting Loop Iterations",
      "difficulty": "Easy",
      "table": false,
      "multipart": false,
      "type": "multiple-choice",
      "question": "Suppose `head` points to the following linked list:\n\n`1 -> 2 -> 3 -> 4 -> 5`\n\nHow many times does the loop body execute?\n\n```{code-block} c\nNode *current = head;\n\nwhile (current != NULL) {\n  if (current->data == 3) {\n    current = current->next;\n  }\n  current = current->next;\n}\n```\n",
      "answer": [
        1
      ],
      "choices": [
        "3",
        "4",
        "5",
        "6"
      ]
    }
  ]
});