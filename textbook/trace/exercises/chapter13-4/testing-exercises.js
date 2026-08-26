registerExercises("../trace/exercises/chapter13-4/testing-exercises", {
  "exercises": [
    {
      "question-id": "visualizer-DF-BEHAVIOR2",
      "title": "Order Matters in deleteFront",
      "difficulty": "Easy",
      "table": false,
      "multipart": false,
      "type": "multiple-choice",
      "question": "In the following code, we store `list->head->next` before `free(list->head)`. Why?\n\n```{code-block} c\nNode *newHead = list->head->next;\nfree(list->head);\nlist->head = newHead;\n```\n",
      "answer": [
        1
      ],
      "choices": [
        "Because `free(list->head)` deletes `list->head`",
        "Because after freeing the head, we lose access to its `next` pointer",
        "It is not necessary",
        "Because freeing memory automatically deletes all remaining nodes"
      ]
    }
  ]
});