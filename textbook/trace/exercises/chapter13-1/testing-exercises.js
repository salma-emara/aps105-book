registerExercises("../trace/exercises/chapter13-1/testing-exercises", {
  "exercises": [
    {
      "question-id": "chapter13-form-linked-list-q1",
      "title": "Pointer Reassignment",
      "difficulty": "Easy",
      "table": false,
      "multipart": false,
      "type": "multiple-choice",
      "question": "After executing the following code, what is the value of `temp->data`?\n\n```{code-block} c\nNode *head = (Node *)malloc(sizeof(Node));\nhead->data = 1;\n\nhead->next = (Node *)malloc(sizeof(Node));\nhead->next->data = 2;\nhead->next->next = NULL;\n\nNode* temp = head->next;\n```\n",
      "answer": [
        1
      ],
      "choices": [
        "1",
        "2",
        "0",
        "Runtime error"
      ]
    }
  ]
});