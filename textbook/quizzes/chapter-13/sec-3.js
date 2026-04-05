let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Which of the following code can insert a node at the tail of a linked list?\n\nAssume the following struct and function have been defined:\n```\ntypedef struct node {\n    int data;\n    struct node *next;\n} Node;\n\nNode *createNode(int value) {\n    Node *newNode = (Node *)malloc(sizeof(Node));\n    if (newNode == NULL) {\n        return NULL;\n    }\n    newNode->data = value;\n    newNode->next = NULL;\n    return newNode;\n}\n```\n",
      "answer": [
        1,
        2,
        3
      ],
      "distractors": [
        "```\ntypedef struct list {\n  Node* head;\n  Node* tail;\n} LinkedList;\n\nbool insertAtTail(LinkedList* list, int value) {\n    Node *temp = createNode(value);\n    if (temp == NULL) {\n        return false;\n    }\n    if(list->head == NULL) { // If the list is empty\n        list->head = temp;\n        list->tail = temp;\n    } else {\n        list->tail->next = temp;\n        temp->next = list->tail;\n    }\n    return true;\n}\n\nint main(void) {\n    LinkedList list;\n    list.head = createNode(1);\n    list.tail = list.head;\n\n    insertAtTail(&list, 2);\n    insertAtTail(&list, 3);\n\n    return 0;\n}\n```\n",
        "```\ntypedef struct list {\n  Node* head;\n  Node* tail;\n} LinkedList;\n\nbool insertAtTail(LinkedList* list, int value) {\n    Node *temp = createNode(value);\n    if (temp == NULL) {\n        return false;\n    }\n    if(list->head == NULL) { // If the list is empty\n        list->head = temp;\n        list->tail = temp;\n    } else {\n        list->tail->next = temp;\n        list->tail = temp;\n    }    \n    return true;\n}\n\nint main(void) {\n    LinkedList list;\n    list.head = createNode(1);\n    list.tail = list.head;\n\n    insertAtTail(&list, 2);\n    insertAtTail(&list, 3);\n\n    return 0;\n}\n```\n",
        "```\ntypedef struct list {\n  Node* head;\n  Node* tail;\n} LinkedList;\n\nbool insertAtTail(LinkedList *list, int value) {\n    Node *temp = createNode(value);\n    if (temp == NULL) {\n        return false;\n    }\n    Node *cur = list->head;\n    bool inserted = false;\n    while (cur != NULL && !inserted) {\n        if (cur->next == NULL) {\n            cur->next = temp;\n            list->tail = temp;\n            inserted = true;\n        } else {\n            cur = cur->next;\n        }\n    } \n    if (!inserted){\n        list->head = temp;\n        list->tail = temp;\n    }\n    return true;\n}\n\nint main(void) {\n    LinkedList list;\n    list.head = createNode(1);\n    list.tail = list.head;\n\n    insertAtTail(&list, 2);\n    insertAtTail(&list, 3);\n\n    return 0;\n}\n```\n",
        "```\ntypedef struct list {\n  Node* tail;\n} LinkedList;\n\nbool insertAtTail(LinkedList *list, int value) {\n    Node *temp = createNode(value);\n    if (temp == NULL) {\n        return false;\n    }\n    if (list->tail != NULL) {\n        list->tail->next = temp;\n    }\n    list->tail = temp;\n    return true;\n}\n\nint main(void) {\n    Node *head = createNode(1);\n    LinkedList list;\n    list.tail = head;\n\n    insertAtTail(&list, 2);\n    insertAtTail(&list, 3);\n\n    return 0;\n}\n```\n"
      ],
      "explainations": [
        "A is incorrect. The code incorrectly updates the tail pointer. The output of the code is a circular linked list.",
        "B is correct. The code inserts the node at the tail of the linked list.",
        "C is correct. The code traverses the linked list to find the tail node, and then inserts the node at the tail.",
        "D is correct. The code create a new data structure to store the tail pointer, and then inserts the node at the tail."
      ]
    },
    {
      "prompt": "Which of the following correctly traverse(s) and print(s) all elements of a linked list in order?\n\nAssume the following struct has been defined:\n```\ntypedef struct node {\n    int data;\n    struct node *next;\n} Node;\n\ntypedef struct list {\n  Node* head;\n} LinkedList;\n\nNode *createNode(int value) {\n    Node *newNode = (Node *)malloc(sizeof(Node));\n    if (newNode == NULL) {\n        return NULL;\n    }\n    newNode->data = value;\n    newNode->next = NULL;\n    return newNode;\n}\n```\n",
      "answer": [
        0,
        2
      ],
      "distractors": [
        "```\nint main(void) {\n    Node *node1 = createNode(1);\n    Node *node2 = createNode(2);\n    Node *node3 = createNode(3);\n\n    node1->next = node2;\n    node2->next = node3;\n    \n    Node *cur = node1;\n    while (cur != NULL) {\n        printf(\"%d \", cur->data);\n        cur = cur->next;\n    } \n\n    return 0;\n}\n```\n",
        "```\nint main(void) {\n    Node *node1 = createNode(1);\n    Node *node2 = createNode(2);\n    Node *node3 = createNode(3);\n\n    node1->next = node2;\n    node2->next = node3;\n    \n    Node *cur = node1;\n    while (cur->next != NULL) {\n        printf(\"%d \", cur->data);\n        cur = cur->next;\n    } \n\n    return 0;\n}\n```\n",
        "```\nint main(void) {\n    Node *node1 = createNode(1);\n    Node *node2 = createNode(2);\n    Node *node3 = createNode(3);\n\n    node1->next = node2;\n    node2->next = node3;\n    \n    Node *cur = node1;\n    do {\n        if (cur != NULL) {\n            printf(\"%d \", cur->data);\n            cur = cur->next;\n        }\n    } while (cur != NULL);\n\n    return 0;\n}\n```\n",
        "```\nint main(void) {\n    Node *node1 = createNode(1);\n    Node *node2 = createNode(2);\n    Node *node3 = createNode(3);\n\n    node1->next = node2;\n    node2->next = node3;\n    \n    Node *cur = node1;\n    do {\n        if (cur != NULL) {\n            printf(\"%d \", cur->data);\n            cur = cur->next;\n        }\n    } while (cur->next != NULL);\n\n    return 0;\n}\n```\n"
      ],
      "explainations": [
        "A is correct. This is the basic way to traverse a linked list.",
        "B is incorrect. The code does not print the last element of the linked list.",
        "C is correct. This is the same as A.",
        "D is incorrect. The code does not print the last element of the linked list."
      ]
    }
  ]
};