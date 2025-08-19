let parsedObject; 
  parsedObject = {
  "exercises": [
    {
      "title": "Question 5 in Winter 2018 Final Exam",
      "difficulty": "Easy",
      "table": false,
      "multipart": false,
      "type": "explaination",
      "question": "Complete the following C program, designed to search for an int-type item, called `key`, in a linked list, pointed to by `head`.\n```{code-block} c\ntypedef struct node {\n  int data;\n  struct node *link;\n} Node;\n\nNode *search(Node *head, int key) {\n  Node *current = head;\n  // insert your code in the line below between the parentheses\n  while (                                          ) {\n    current = current->link;\n  }\n\n  return current;\n}\n```\n",
      "answer": "typedef struct node {\n  int data;\n  struct node *link;\n} Node;\n\nNode *search(Node *head, int key) {\n  Node *current = head;\n\n  while (current != NULL && current->data != key) {\n    current = current->link;\n  }\n\n  return current;\n}\n"
    },
    {
      "title": "Question 6 in Winter 2016 Final Exam",
      "difficulty": "Easy",
      "table": false,
      "multipart": false,
      "type": "programming",
      "question": "Consider the following code, where head points to the head of a linked list:\n```{code-block} c\ntypedef struct node {\n  int value;\n  struct node *link;\n} Node;\n\nNode *head;\n```\n\nComplete the following C function that returns a pointer to the node that precedes (comes before) `searchNode`, if it is found in the linked list. If `searchNode` is not found or the linked list is empty, the function should return `NULL`. Read the function carefully: you may need to add code\nin several locations.\n",
      "starter-code": "#include <stdio.h>\n\ntypedef struct node {\n  int value;\n  struct node *link;\n} Node;\n\nNode *head;\n\nint main(void){\n\n  Node *predecessor(Node *head, Node *searchNode) {\n    Node *current;\n    current = head;\n    if (head == searchNode) return NULL;\n    // COMPLETE THE NEXT LINE:\n    while (                                          ) {\n      if (current->link == searchNode) return current;\n      // WRITE CODE HERE:\n    }\n    return NULL;\n  }\n  \n}\n",
      "answer": "Node *predecessor(Node *head, Node *searchNode) {\n  Node *current;\n  current = head;\n  if (head == searchNode) {\n    return NULL;\n  }\n  while (current != NULL) {\n    if (current->link == searchNode) {\n      return current;\n    }\n    // write your code HERE:\n    current = current->link;\n  }\n  return NULL;\n}\n"
    },
    {
      "title": "Question 13 in Winter 2018 Final Exam",
      "difficulty": "Intermediate",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "The following C structure is used to define each node in a linked list:\n```{code-block} c\ntypedef struct node {\n  int data;\n  struct node *link;\n} Node;\n```\n\nWrite a C function called `printDuplicates` that receives a pointer to the first node (`head`) of a linked list as a parameter. The function should find and print the duplicate integers in the linked list. For\nexample, if the linked list contains the integers $6$, $3$, $3$, $6$, $7$, $4$, then the `printDuplicates()` function should print:\n<pre>\n6\n3\n</pre>\n\n**Note:** In your solution, you may assume that a given integer occurs at most twice in the linked list.\n",
      "starter-code": "#include <stdio.h>\n\ntypedef struct node {\n  int data;\n  struct node *link;\n} Node;\n\nvoid printDuplicates(Node *head) {\n  // Write your function here\n}\n",
      "answer": "void printDuplicates(Node *head) {\n  Node *current = head;\n\n  while (current != NULL) {\n    Node *runner = current->next;\n\n    while (runner != NULL) {\n      if (current->data == runner->data) {\n        printf(\"%d\\n\", current->data);\n      }\n\n      runner = runner->next;\n    }\n\n    current = current->next;\n  }\n}\n",
      "main-function": "int main(void) {\n}\n"
    },
    {
      "title": "Question 12 in Winter 2016 Final Exam",
      "difficulty": "Intermediate",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "The following C structure is used to define each node in a linked list:\n```{code-block} c\ntypedef struct node {\n  int value;\n  struct node* link;\n} Node;\n```\nAssume that nodes in the linked list are maintained in order of their values, such that the value\nstored in each node is greater than or equal to the value in predecessor nodes. Write a C function:\n\n```{code-block} c\nvoid simplify(Node *head)\n```\n\nthat deletes any duplicate items in the linked list. The parameter head is a pointer to the head node of a linked list. Note that the head node of the linked list will remain unchanged after the deletions are made. For example, if before calling simplify, the linked list contains:\n\n<pre>\n13 13 15 15 17 17 17 19 22 25 25 28\n</pre>\n\nthen after calling the function, the list should contain:\n\n<pre>\n13 15 17 19 22 25 28\n</pre>\n\n",
      "starter-code": "#include <stdio.h>\n\ntypedef struct node {\n  int value;\n  struct node* link;\n} Node;\n\nvoid simplify(Node *head) {\n  // Write your function here\n}\n",
      "answer": "void simplify(Node *head) {\n  Node *current;\n  current = head;\n  if (current == NULL) {\n    return;\n  }\n  while (current->link != NULL) {\n    if (current->value == current->link->value) {\n      Node *nodeToRemove = current->link;\n      current->link = current->link->link;\n      free(nodeToRemove);\n    } else\n      current = current->link;\n  }\n}\n",
      "main-function": "int main(void) {\n}\n"
    },
    {
      "title": "Question 14 in Winter 2017 Final Exam",
      "difficulty": "Challenging",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "The following C structure is used to define each node in a linked list:\n```{code-block} c\ntypedef struct node {\n  int data;\n  struct node *next;\n} Node;\n```\n\nWrite a C function, called `buildJoinedList`, that takes two linked lists called `firstList` and `secondList` as its parameters, and returns a new list that joins the two lists, with `secondList` at the front. Both `firstList` and `secondList` are pointers to the first node of a linked list. The function should return a pointer to a new list that is dynamically allocated.\n\nNote that the existing linked lists pointed to by `firstList` and `secondList` must not be modified in any way.\n\nAn example of how the function should work is as follows: if `firstList` points to a linked list containing nodes storing the numbers $1$, $2$, $3$, $4$, $5$ and `secondList` containing the numbers $6$, $7$, $8$, $9$, $10$, then the newly created list returned by the `buildJoinedList` function\nshould contain nodes storing the numbers $6$, $7$, $8$, $9$, $10$, $1$, $2$, $3$, $4$, $5$.\n",
      "starter-code": "#include <stdio.h>\n\ntypedef struct node {\n  int data;\n  struct node *next;\n} Node;\n\nNode *buildJoinedList(Node *firstList, Node *secondList) {\n  // Write your function here\n}\n",
      "answer": "Node *newNode(int newValue, Node *link) {\n  Node *newNode;\n  Node *node = (Node *)malloc(sizeof(Node));\n  if (node != NULL) {\n    node->data = newValue;\n    node->next = link;\n  }\n  return node;\n}\nNode *buildJoinedList(Node *firstList, Node *secondList) {\n  Node *current = secondList, *head = NULL, *tail = NULL;\n  while (current != NULL) {\n    if (head == NULL) {\n      head = newNode(current->data, NULL);\n      tail = head;\n      current = current->next;\n    } else {\n      tail->next = newNode(current->data, NULL);\n      tail = tail->next;\n      current = current->next;\n    }\n  }\n  current = firstList;\n  while (current != NULL) {\n    if (head == NULL) {\n      head = newNode(current->data, NULL);\n      tail = head;\n      current = current->next;\n    } else {\n      tail->next = newNode(current->data, NULL);\n      tail = tail->next;\n      current = current->next;\n    }\n  }\n  return head;\n}\n",
      "main-function": "int main(void) {\n}\n"
    },
    {
      "title": "Question 14 in Winter 2022 Final Exam",
      "difficulty": "Challenging",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "The `Node` structure in a linked list has been defined as follows:\n\n```{code-block} c\ntypedef struct node {\n  int data;\n  struct node *next;\n} Node;\n```\n\nThe `LinkedList` structure has also been defined to contain the `head` of a linked list:\n\n```{code-block} c\ntypedef struct linkedList {\n  Node *head;\n} LinkedList;\n```\n\nWrite a C function called `reorder`, the prototype of which is given below, that reorders the nodes in a linked list such that nodes with a value of $0$ appear at the **front** of the linked list and nodes with any other integer value appear at the end of the linked list, while maintaining the original order of non-zero nodes.\n\n**Example 1:**\n<pre>\nInput List:        0   0  15   0   0  13  10\nOutput List:       0   0   0   0  15  13  10\n</pre>\n\n\n**Example 2:**\n<pre>\nInput List:        1   0  19   0   0   5  0\nOutput List:       0   0   0   0   1  19  5\n</pre>\n\n**Note:** You are not allowed to copy or modify the `data` member in any of the nodes in the linked list. However, you can modify the `next` pointer in the nodes.\n",
      "starter-code": "#include <stdio.h>\n\ntypedef struct node {\n  int data;\n  struct node *next;\n} Node;\n\ntypedef struct linkedList {\n  Node *head;\n} LinkedList;\n\nvoid reorder(LinkedList *list) {\n  // Write your function here\n}\n",
      "answer": "// Solution 1:\nvoid reorder(LinkedList *list) {\n  Node *tail = list->head, *prev = NULL, *curr = list->head;\n\n  while (tail->next != NULL)  // Find the tail of the list\n    tail = tail->next;\n  Node *newTail = tail;\n\n  while (curr->data != 0 && curr != tail) {\n    newTail->next = curr;\n    curr = curr->next;\n    newTail->next->next = NULL;\n    newTail = newTail->next;\n  }\n\n  if (curr->data == 0) {\n    list->head = curr;  // Make head to point to first 0\n    while (curr != tail) {\n      if (curr->data == 0) {\n        prev = curr;\n        curr = curr->next;\n      } else {\n        prev->next = curr->next;\n        curr->next = NULL;\n        newTail->next = curr;\n        newTail = curr;\n        curr = prev->next;\n      }\n    }\n  } else {\n    prev = curr;\n  }\n  // check if more 0 nodes and end is non-zero\n  if (newTail != tail && tail->data != 0) {\n    prev->next = tail->next;\n    tail->next = NULL;\n    newTail->next = tail;\n  }\n}\n\n// Solution 2:\nvoid reorderAlternative(LinkedList *list) {\n  Node *current = list->head;\n  Node *prev = NULL;\n  while (current != NULL) {\n    if (current->data == 0) {  // insert at front of list\n      if (current == list->head) {\n        // traverse and do nothing\n        prev = current;\n        current = current->next;\n      } else { // order is very important\n        Node *temp = current;\n        prev->next = current->next;  // prev should be as is\n        current = current->next;\n        temp->next = list->head;\n        list->head = temp;\n      }\n    } else {\n      // traverse and do nothing\n      prev = current;\n      current = current->next;\n    }\n  }\n}\n",
      "main-function": "int main(void) {\n}\n"
    }
  ]
};