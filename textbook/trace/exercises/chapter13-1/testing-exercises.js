let parsedObject; 
  parsedObject = {
  "exercises": [
    {
      "question-id": "chapter13-form-linked-list-q1",
      "title": "Pointer Reassignment",
      "difficulty": "Easy",
      "table": false,
      "multipart": false,
      "type": "visualizer",
      "question": "After executing the following code, what will be printed?\n\n```{code-block} c\nNode *head = (Node *)malloc(sizeof(Node));\nhead->data = 1;\nhead->next = NULL;\n\nNode *temp = (Node *)malloc(sizeof(Node));\ntemp->data = 2;\ntemp->next = NULL;\n\nhead = temp;\n\nprintf(\"%d\", head->data);\n```\n\nA. 1\n\nB. 2\n\nC. 0\n\nD. Runtime error\n",
      "answer": "B\n"
    }
  ]
};