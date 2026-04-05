let parsedObject; 
  parsedObject = {
  "exercises": [
    {
      "question-id": "visualizer-DF-BEHAVIOR2",
      "title": "Order Matters in deleteFront",
      "difficulty": "Easy",
      "table": false,
      "multipart": false,
      "type": "visualizer",
      "question": "Why must we store `list->head->next` before calling `free(list->head)`?\n\n```{code-block} c\nNode *newHead = list->head->next;\nfree(list->head);\nlist->head = newHead;\n```\n\nA. Because `free(list->head)` will remove access to the original head pointer itself\n\nB. Because after freeing the head, we cannot safely access its `next` pointer\n\nC. Because `newHead` must always be assigned before updating `list->head`\n\nD. Because freeing memory automatically deletes all remaining nodes\n",
      "answer": "B\n"
    }
  ]
};