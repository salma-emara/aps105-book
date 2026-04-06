registerExercises("../trace/exercises/chapter13-1/testing-exercises", {
  "exercises": [
    {
      "question-id": "chapter13-form-linked-list-q1",
      "title": "Pointer Reassignment",
      "difficulty": "Easy",
      "table": false,
      "multipart": false,
      "type": "visualizer",
      "question": "After executing the following code, what is the value of `temp->data`?\n\n```{code-block} c\nNode *head = (Node *)malloc(sizeof(Node));\nhead->data = 1;\n\nhead->next = (Node *)malloc(sizeof(Node));\nhead->next->data = 2;\nhead->next->next = NULL;\n\nNode* temp = head->next;\n```\n\nA. 1\n\nB. 2\n\nC. 0\n\nD. Runtime error\n",
      "answer": "B\n"
    }
  ]
});