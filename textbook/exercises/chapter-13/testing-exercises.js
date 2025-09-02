let parsedObject; 
  parsedObject = {
  "exercises": [
    {
      "title": "Question 5 in Winter 2018 Final Exam",
      "difficulty": "Easy",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "Complete the following C program, designed to search for an int-type item, called `key`, in a linked list, pointed to by `head`.\n```{code-block} c\ntypedef struct node {\n  int data;\n  struct node *link;\n} Node;\n\nNode *search(Node *head, int key) {\n  Node *current = head;\n  // insert your code in the line below between the parentheses\n  while (                                          ) {\n    current = current->link;\n  }\n\n  return current;\n}\n```\n",
      "starter-code": "Node *search(Node *head, int key) {\n  Node *current = head;\n  // insert your code in the line below between the parentheses\n  while (                                          ) {\n    current = current->link;\n  }\n\n  return current;\n}\n",
      "answer": "typedef struct node {\n  int data;\n  struct node *link;\n} Node;\n\nNode *search(Node *head, int key) {\n  Node *current = head;\n\n  while (current != NULL && current->data != key) {\n    current = current->link;\n  }\n\n  return current;\n}\n",
      "append-before": "#include <stdio.h>\n#include <stdlib.h>\n",
      "main-function": "int main() {\n    int n, key;\n    scanf(\"%d\", &n);\n\n    if (n <= 0) return 0;\n\n    int value;\n    Node *head = NULL, *tail = NULL;\n\n    // Read n integers and create the linked list\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d\", &value);\n        Node *newNode = (Node*) malloc(sizeof(Node));\n        newNode->data = value;\n        newNode->link = NULL;\n        if (head == NULL) {\n            head = tail = newNode;\n        } else {\n            tail->link = newNode;\n            tail = newNode;\n        }\n    }\n\n    // Read the key to search\n    scanf(\"%d\", &key);\n\n    Node *result = search(head, key);\n    if (result != NULL) {\n        printf(\"Found: %d\\n\", result->data);\n    } else {\n        printf(\"Not found\\n\");\n    }\n\n    // Free the linked list\n    Node *curr = head;\n    while (curr != NULL) {\n        Node *tmp = curr;\n        curr = curr->link;\n        free(tmp);\n    }\n\n    return 0;\n}\n",
      "testcases": [
        {
          "input": [
            "3\n1 2 3\n1\n"
          ],
          "output": [
            "Found: 1\n"
          ]
        },
        {
          "input": [
            "4\n5 6 7 8\n7\n"
          ],
          "output": [
            "Found: 7\n"
          ]
        },
        {
          "input": [
            "5\n10 20 30 40 50\n25\n"
          ],
          "output": [
            "Not found\n"
          ]
        }
      ]
    },
    {
      "title": "Question 6 in Winter 2016 Final Exam",
      "difficulty": "Easy",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "Consider the following code, where head points to the head of a linked list:\n```{code-block} c\ntypedef struct node {\n  int value;\n  struct node *link;\n} Node;\n\nNode *head;\n```\n\nComplete the following C function that returns a pointer to the node that precedes (comes before) `searchNode`, if it is found in the linked list. If `searchNode` is not found or the linked list is empty, the function should return `NULL`. Read the function carefully: you may need to add code\nin several locations.\n",
      "starter-code": "\nNode *predecessor(Node *head, Node *searchNode) {\n  Node *current;\n  current = head;\n  if (head == searchNode) return NULL;\n  // COMPLETE THE NEXT LINE:\n  while (                                          ) {\n    if (current->link == searchNode) return current;\n    // WRITE CODE HERE:\n  }\n  return NULL;\n}\n",
      "answer": "Node *predecessor(Node *head, Node *searchNode) {\n  Node *current;\n  current = head;\n  if (head == searchNode) {\n    return NULL;\n  }\n  while (current != NULL) {\n    if (current->link == searchNode) {\n      return current;\n    }\n    // write your code HERE:\n    current = current->link;\n  }\n  return NULL;\n}\n",
      "append-before": "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct node {\n  int value;\n  struct node *link;\n} Node;\n\nNode *head;\n",
      "main-function": "int main(void) {\n    int n;\n    scanf(\"%d\", &n);\n\n    Node nodes[100]; // assuming max 100 nodes\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d\", &nodes[i].value);\n        nodes[i].link = (i < n - 1) ? &nodes[i + 1] : NULL;\n    }\n\n    Node *head = &nodes[0];\n\n    int searchVal;\n    scanf(\"%d\", &searchVal);\n\n    Node *searchNode = NULL;\n    for (int i = 0; i < n; i++) {\n        if (nodes[i].value == searchVal) {\n            searchNode = &nodes[i];\n            break;\n        }\n    }\n\n    Node *pred = predecessor(head, searchNode);\n\n    if (!searchNode) {\n        printf(\"Value %d not found in the list.\\n\", searchVal);\n    } else if (!pred) {\n        printf(\"Value %d is the head of the list; no predecessor.\\n\", searchVal);\n    } else {\n        printf(\"Predecessor of %d is %d.\\n\", searchVal, pred->value);\n    }\n\n    return 0;\n}\n",
      "testcases": [
        {
          "input": [
            "5\n10 20 30 40 50\n30\n"
          ],
          "output": [
            "Predecessor of 30 is 20.\n"
          ]
        },
        {
          "input": [
            "4\n5 15 25 35\n5\n"
          ],
          "output": [
            "Value 5 is the head of the list; no predecessor.\n"
          ]
        },
        {
          "input": [
            "4\n5 15 25 35\n5\n"
          ],
          "output": [
            "Value 5 is the head of the list; no predecessor.\n"
          ]
        }
      ]
    },
    {
      "title": "Question 13 in Winter 2018 Final Exam",
      "difficulty": "Intermediate",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "The following C structure is used to define each node in a linked list:\n```{code-block} c\ntypedef struct node {\n  int data;\n  struct node *link;\n} Node;\n```\n\nWrite a C function called `printDuplicates` that receives a pointer to the first node (`head`) of a linked list as a parameter. The function should find and print the duplicate integers in the linked list. For\nexample, if the linked list contains the integers $6$, $3$, $3$, $6$, $7$, $4$, then the `printDuplicates()` function should print:\n<pre>\n6\n3\n</pre>\n\n**Note:** In your solution, you may assume that a given integer occurs at most twice in the linked list.\n",
      "starter-code": "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct node {\n  int data;\n  struct node *link;\n} Node;\n\nvoid printDuplicates(Node *head) {\n  \n  // Write your function here\n\n}\n",
      "answer": "void printDuplicates(Node *head) {\n  Node *current = head;\n\n  while (current != NULL) {\n    Node *runner = current->link;\n\n    while (runner != NULL) {\n      if (current->data == runner->data) {\n        printf(\"%d\\n\", current->data);\n      }\n\n      runner = runner->link;\n\n    }\n\n    current = current->link;\n\n  }\n  \n}\n",
      "main-function": "int main(void) {\n    int n;\n    scanf(\"%d\", &n);\n\n    if (n <= 0) return 0;\n\n    Node* head = NULL;\n    Node* tail = NULL;\n\n    for (int i = 0; i < n; i++) {\n        int val;\n        scanf(\"%d\", &val);\n\n        Node* newNode = (Node*) malloc(sizeof(Node));\n        newNode->data = val;\n        newNode->link = NULL;\n\n        if (!head) {\n            head = newNode;\n            tail = newNode;\n        } else {\n            tail->link = newNode;\n            tail = newNode;\n        }\n    }\n\n    printDuplicates(head);\n\n    // Free memory\n    Node* current = head;\n    while (current) {\n        Node* tmp = current;\n        current = current->link;\n        free(tmp);\n    }\n\n    return 0;\n}\n",
      "testcases": [
        {
          "input": [
            "6\n6 3 3 6 7 4\n"
          ],
          "output": [
            "6\n3\n"
          ]
        },
        {
          "input": [
            "5\n1 2 3 4 5\n"
          ],
          "output": [
            ""
          ]
        },
        {
          "input": [
            "4\n8 8 9 9 "
          ],
          "output": [
            "8\n9"
          ]
        },
        {
          "input": [
            "7\n-1 2 -1 3 2 4 3\n"
          ],
          "output": [
            "-1\n2\n3\n"
          ]
        },
        {
          "input": [
            "1\n42\n"
          ],
          "output": [
            ""
          ]
        }
      ]
    },
    {
      "title": "Question 12 in Winter 2016 Final Exam",
      "difficulty": "Intermediate",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "The following C structure is used to define each node in a linked list:\n```{code-block} c\ntypedef struct node {\n  int value;\n  struct node* link;\n} Node;\n```\nAssume that nodes in the linked list are maintained in order of their values, such that the value\nstored in each node is greater than or equal to the value in predecessor nodes. Write a C function:\n\n```{code-block} c\nvoid simplify(Node *head)\n```\n\nthat deletes any duplicate items in the linked list. The parameter head is a pointer to the head node of a linked list. Note that the head node of the linked list will remain unchanged after the deletions are made. For example, if before calling simplify, the linked list contains:\n\n<pre>\n13 13 15 15 17 17 17 19 22 25 25 28\n</pre>\n\nthen after calling the function, the list should contain:\n\n<pre>\n13 15 17 19 22 25 28\n</pre>\n",
      "starter-code": "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct node {\n  int value;\n  struct node* link;\n} Node;\n\nvoid simplify(Node *head) {\n\n  // Write your function here\n\n}\n",
      "answer": "void simplify(Node *head) {\n  Node *current;\n  current = head;\n  if (current == NULL) {\n    return;\n  }\n  while (current->link != NULL) {\n    if (current->value == current->link->value) {\n      Node *nodeToRemove = current->link;\n      current->link = current->link->link;\n      free(nodeToRemove);\n    } else\n      current = current->link;\n  }\n}\n",
      "main-function": "int main(void) {\n    int n;\n    scanf(\"%d\", &n);\n\n    if (n <= 0) {\n        printf(\"Simplified list:\\n\");\n        return 0;\n    }\n\n    Node *head = NULL, *prev = NULL;\n\n    for (int i = 0; i < n; i++) {\n        int val;\n        scanf(\"%d\", &val);\n        Node *node = (Node*)malloc(sizeof(Node));\n        node->value = val;\n        node->link = NULL;\n\n        if (prev != NULL) prev->link = node;\n        else head = node;\n\n        prev = node;\n    }\n    simplify(head);\n\n    printf(\"Simplified list:\\n\");\n    Node *current = head;\n    while (current != NULL) {\n        printf(\"%d \", current->value);\n        current = current->link;\n    }\n    printf(\"\\n\");\n\n    return 0;\n}\n",
      "testcases": [
        {
          "input": [
            "12\n13 13 15 15 17 17 17 19 22 25 25 28\n"
          ],
          "output": [
            "Simplified list:\n13 15 17 19 22 25 28 \n"
          ]
        },
        {
          "input": [
            "5\n1 3 5 7 9\n"
          ],
          "output": [
            "Simplified list:\n1 3 5 7 9 \n"
          ]
        },
        {
          "input": [
            "6\n2 2 2 2 2 2\n"
          ],
          "output": [
            "Simplified list:\n2 \n"
          ]
        },
        {
          "input": [
            "1\n42\n"
          ],
          "output": [
            "Simplified list:\n42 \n"
          ]
        }
      ]
    },
    {
      "title": "Question 14 in Winter 2017 Final Exam",
      "difficulty": "Challenging",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "The following C structure is used to define each node in a linked list:\n```{code-block} c\ntypedef struct node {\n  int data;\n  struct node *next;\n} Node;\n```\n\nWrite a C function, called `buildJoinedList`, that takes two linked lists called `firstList` and `secondList` as its parameters, and returns a new list that joins the two lists, with `secondList` at the front. Both `firstList` and `secondList` are pointers to the first node of a linked list. The function should return a pointer to a new list that is dynamically allocated.\n\nNote that the existing linked lists pointed to by `firstList` and `secondList` must not be modified in any way.\n\nAn example of how the function should work is as follows: if `firstList` points to a linked list containing nodes storing the numbers $1$, $2$, $3$, $4$, $5$ and `secondList` containing the numbers $6$, $7$, $8$, $9$, $10$, then the newly created list returned by the `buildJoinedList` function\nshould contain nodes storing the numbers $6$, $7$, $8$, $9$, $10$, $1$, $2$, $3$, $4$, $5$.\n",
      "starter-code": "#include <stdio.h>\n\ntypedef struct node {\n  int data;\n  struct node *next;\n} Node;\n\nNode *buildJoinedList(Node *firstList, Node *secondList) {\n  \n  // Write your function here\n\n}\n",
      "answer": "Node *newNode(int newValue, Node *link) {\n  Node *newNode;\n  Node *node = (Node *)malloc(sizeof(Node));\n  if (node != NULL) {\n    node->data = newValue;\n    node->next = link;\n  }\n  return node;\n}\nNode *buildJoinedList(Node *firstList, Node *secondList) {\n  Node *current = secondList, *head = NULL, *tail = NULL;\n  while (current != NULL) {\n    if (head == NULL) {\n      head = newNode(current->data, NULL);\n      tail = head;\n      current = current->next;\n    } else {\n      tail->next = newNode(current->data, NULL);\n      tail = tail->next;\n      current = current->next;\n    }\n  }\n  current = firstList;\n  while (current != NULL) {\n    if (head == NULL) {\n      head = newNode(current->data, NULL);\n      tail = head;\n      current = current->next;\n    } else {\n      tail->next = newNode(current->data, NULL);\n      tail = tail->next;\n      current = current->next;\n    }\n  }\n  return head;\n}\n",
      "main-function": "// Helper function to create a new node\nNode *createNode(int value) {\n    Node *n = (Node *)malloc(sizeof(Node));\n    n->data = value;\n    n->next = NULL;\n    return n;\n}\n\n// Helper function to build a linked list from input\nNode *readList(int n) {\n    if (n <= 0) return NULL;\n    int val;\n    scanf(\"%d\", &val);\n    Node *head = createNode(val);\n    Node *current = head;\n    for (int i = 1; i < n; i++) {\n        scanf(\"%d\", &val);\n        current->next = createNode(val);\n        current = current->next;\n    }\n    return head;\n}\n\n// Helper function to print a linked list\nvoid printList(Node *head) {\n    printf(\"Joined List: \");\n    Node *curr = head;\n    while (curr != NULL) {\n        printf(\"%d \", curr->data);\n        curr = curr->next;\n    }\n    printf(\"\\n\");\n}\n\n// Helper function to free a linked list\nvoid freeList(Node *head) {\n    Node *curr = head;\n    while (curr != NULL) {\n        Node *tmp = curr;\n        curr = curr->next;\n        free(tmp);\n    }\n}\n\nint main(void) {\n    int n1, n2;\n    scanf(\"%d\", &n1);\n    Node *firstList = readList(n1);\n\n    scanf(\"%d\", &n2);\n    Node *secondList = readList(n2);\n\n    Node *joinedList = buildJoinedList(firstList, secondList);\n\n    printList(joinedList);\n\n    // Free all allocated memory\n    freeList(firstList);\n    freeList(secondList);\n    freeList(joinedList);\n\n    return 0;\n}\n",
      "testcases": [
        {
          "input": [
            "5\n1 2 3 4 5\n5\n6 7 8 9 10\n"
          ],
          "output": [
            "Joined List: 6 7 8 9 10 1 2 3 4 5 \n"
          ]
        },
        {
          "input": [
            "3\n10 20 30\n2\n5 15\n"
          ],
          "output": [
            "Joined List: 5 15 10 20 30 \n"
          ]
        },
        {
          "input": [
            "0\n3\n100 200 300\n"
          ],
          "output": [
            "Joined List: 100 200 300\n"
          ]
        },
        {
          "input": [
            "0\n0\n"
          ],
          "output": [
            "Joined List: "
          ]
        },
        {
          "input": [
            "1\n100\n1\n200\n"
          ],
          "output": [
            "Joined List: 200 100"
          ]
        }
      ]
    },
    {
      "title": "Question 14 in Winter 2022 Final Exam",
      "difficulty": "Challenging",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "The `Node` structure in a linked list has been defined as follows:\n\n```{code-block} c\ntypedef struct node {\n  int data;\n  struct node *next;\n} Node;\n```\n\nThe `LinkedList` structure has also been defined to contain the `head` of a linked list:\n\n```{code-block} c\ntypedef struct linkedList {\n  Node *head;\n} LinkedList;\n```\n\nWrite a C function called `reorder`, the prototype of which is given below, that reorders the nodes in a linked list such that nodes with a value of $0$ appear at the **front** of the linked list and nodes with any other integer value appear at the end of the linked list, while maintaining the original order of non-zero nodes.\n\n**Example 1:**\n<pre>\nInput List:        0   0  15   0   0  13  10\nOutput List:       0   0   0   0  15  13  10\n</pre>\n\n\n**Example 2:**\n<pre>\nInput List:        1   0  19   0   0   5  0\nOutput List:       0   0   0   0   1  19  5\n</pre>\n\n**Note:** You are not allowed to copy or modify the `data` member in any of the nodes in the linked list. However, you can modify the `next` pointer in the nodes.\n",
      "starter-code": "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct node {\n  int data;\n  struct node *next;\n} Node;\n\ntypedef struct linkedList {\n  Node *head;\n} LinkedList;\n\nvoid reorder(LinkedList *list) {\n  \n  // Write your function here\n  \n}\n",
      "answer": "// Solution 1:\nvoid reorder(LinkedList *list) {\n  Node *tail = list->head, *prev = NULL, *curr = list->head;\n\n  while (tail->next != NULL)  // Find the tail of the list\n    tail = tail->next;\n  Node *newTail = tail;\n\n  while (curr->data != 0 && curr != tail) {\n    newTail->next = curr;\n    curr = curr->next;\n    newTail->next->next = NULL;\n    newTail = newTail->next;\n  }\n\n  if (curr->data == 0) {\n    list->head = curr;  // Make head to point to first 0\n    while (curr != tail) {\n      if (curr->data == 0) {\n        prev = curr;\n        curr = curr->next;\n      } else {\n        prev->next = curr->next;\n        curr->next = NULL;\n        newTail->next = curr;\n        newTail = curr;\n        curr = prev->next;\n      }\n    }\n  } else {\n    prev = curr;\n  }\n  // check if more 0 nodes and end is non-zero\n  if (newTail != tail && tail->data != 0) {\n    prev->next = tail->next;\n    tail->next = NULL;\n    newTail->next = tail;\n  }\n}\n\n// Solution 2:\nvoid reorder(LinkedList *list) {\n  Node *current = list->head;\n  Node *prev = NULL;\n  while (current != NULL) {\n    if (current->data == 0) {  // insert at front of list\n      if (current == list->head) {\n        // traverse and do nothing\n        prev = current;\n        current = current->next;\n      } else { // order is very important\n        Node *temp = current;\n        prev->next = current->next;  // prev should be as is\n        current = current->next;\n        temp->next = list->head;\n        list->head = temp;\n      }\n    } else {\n      // traverse and do nothing\n      prev = current;\n      current = current->next;\n    }\n  }\n}\n",
      "main-function": "int main(void) {\n    int n;\n    scanf(\"%d\", &n);\n\n    LinkedList list;\n    list.head = NULL;\n\n    Node *prev = NULL;\n    for (int i = 0; i < n; i++) {\n        Node *newNode = (Node *)malloc(sizeof(Node));\n        scanf(\"%d\", &newNode->data);\n        newNode->next = NULL;\n\n        if (prev == NULL) {\n            list.head = newNode;\n        } else {\n            prev->next = newNode;\n        }\n        prev = newNode;\n    }\n\n    reorder(&list);\n\n    Node *curr = list.head;\n    printf(\"Reordered list: \");\n    while (curr != NULL) {\n        printf(\"%d \", curr->data);\n        Node *tmp = curr;\n        curr = curr->next;\n        free(tmp);  // free dynamically allocated node\n    }\n    printf(\"\\n\");\n\n    return 0;\n}\n",
      "testcases": [
        {
          "input": [
            "7\n0 0 15 0 0 13 10\n"
          ],
          "output": [
            "Reordered list: 0 0 0 0 15 13 10 \n"
          ]
        },
        {
          "input": [
            "7\n1 0 19 0 0 5 0\n"
          ],
          "output": [
            "Reordered list: 0 0 0 0 1 19 5 \n"
          ]
        },
        {
          "input": [
            "5\n1 2 3 4 5\n"
          ],
          "output": [
            "Reordered list: 1 2 3 4 5 \n"
          ]
        },
        {
          "input": [
            "4\n0 0 0 0\n"
          ],
          "output": [
            "Reordered list: 0 0 0 0 \n"
          ]
        },
        {
          "input": [
            "3\n2 0 3\n"
          ],
          "output": [
            "Reordered list: 0 2 3 \n"
          ]
        }
      ]
    }
  ]
};