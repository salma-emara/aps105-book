let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "What is the correct order of steps to delete a node from a linked list?\n\n1. Free the dynamically allocated memory for the node we want to delete.\n2. Fix the links before and after the node we want to delete.\n3. Update the head of the list if necessary.\n4. Find the node we want to delete.\n",
      "answer": [
        2
      ],
      "distractors": [
        "4, 2, 3, 1",
        "2, 3, 1, 4",
        "4, 2, 1, 3",
        "2, 4, 3, 1"
      ],
      "explainations": [
        "A is incorrect. The correct order is 4, 2, 1, 3.",
        "B is incorrect. The correct order is 4, 2, 1, 3.",
        "C is correct. The correct order is 4, 2, 1, 3.",
        "D is incorrect. The correct order is 4, 2, 1, 3."
      ]
    },
    {
      "prompt": "Which of the following correctly delete(s) the second last node of a linked list? \n\nAlso assume the following struct has been defined:\n```\ntypedef struct node {\n    int data;\n    struct node *next;\n} Node;\n\ntypedef struct list {\n  Node* head;\n} LinkedList;\n```\n",
      "answer": [
        3
      ],
      "distractors": [
        "```\nvoid deleteNodes(LinkedList *list) {\n    Node *secondLast = list->head;\n    Node *thirdLast = list->head;\n    while (secondLast->next->next != NULL) {\n        secondLast = secondLast->next;\n    }\n    while (thirdLast->next->next->next != NULL) {\n        thirdLast = thirdLast->next;\n    }\n\n    thirdLast->next = secondLast->next;\n    free(secondLast);\n}\n```\n",
        "```\nvoid deleteNodes(LinkedList *list) {\n    if (list->head == NULL || list->head->next == NULL) {\n        return;\n    }\n\n    Node *secondLast = list->head;\n    Node *thirdLast = list->head;\n    while (secondLast->next->next != NULL) {\n        secondLast = secondLast->next;\n    }\n    while (thirdLast->next->next->next != NULL) {\n        thirdLast = thirdLast->next;\n    }\n    \n    thirdLast->next = secondLast->next;\n    free(secondLast);\n}\n```\n",
        "```\nvoid deleteNodes(LinkedList *list) {\n    if (list->head == NULL || list->head->next == NULL) {\n        return;\n    }\n\n    Node *secondLast = list->head;\n    Node *thirdLast = list->head;\n    while (secondLast->next->next != NULL) {\n        secondLast = secondLast->next;\n    }\n    while (secondLast != list->head && thirdLast->next->next->next != NULL) {\n        thirdLast = thirdLast->next;\n    }\n    \n    thirdLast->next = secondLast->next;\n    free(secondLast);\n}\n```\n",
        "```\nvoid deleteNodes(LinkedList *list) {\n    if (list->head == NULL || list->head->next == NULL) {\n        return;\n    }\n    \n    Node *secondLast = list->head;\n    Node *thirdLast = NULL;\n\n    while (secondLast->next->next != NULL) {\n        thirdLast = secondLast;\n        secondLast = secondLast->next;\n    }\n\n    if (thirdLast != NULL) {\n        thirdLast->next = secondLast->next;\n    }\n\n    free(secondLast);\n}\n```\n"
      ],
      "explainations": [
        "A is incorrect. If the list is empty or there is only one node, it will run into a memory error when trying to access `secondLast->next->next`.",
        "B is incorrect. If there are only two nodes in the list, it will run into a memory error when trying to access `thirdLast->next->next->next`.",
        "C is correct. It will delete the second last node correctly.",
        "D is correct. It will delete the second last node correctly."
      ]
    }
  ]
};