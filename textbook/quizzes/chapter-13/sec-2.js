let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "What is a node in a linked list?",
      "answer": [
        2
      ],
      "distractors": [
        "A node is a data structure that holds at least two different type members: value and index.",
        "A node is a data structure that holds at least two different type members: value and link to the head or last node.",
        "A node is a data structure that holds at least two different type members: value and link to the next node.",
        "A node is a data structure that holds at least two different type members: value and link to a random node."
      ],
      "explainations": [
        "A is incorrect. Nodes in a linked list do not typically hold an index value. However, they do need a pointer to the next node.",
        "B is incorrect. The link should point to the next node to be able to traverse all nodes in the list.",
        "C is correct. This is the basic definition of a node in a linked list.",
        "D is incorrect. The random node cannot ensure the linked list can be fully traversed."
      ]
    },
    {
      "prompt": "Assume we have the following node definition:\n```\ntypedef struct node {\n  int data;\n  struct node *next;\n} Node;\n```\nWhich of the following correctly create(s) `node1` and `node2` and link(s) `node2` after `node1`?\n",
      "answer": [
        1
      ],
      "distractors": [
        "```\nNode node1;\nnode1.data = 0;\nnode1.next = NULL;\n\nNode node2;\nnode2.data = 1;\nnode2.next = NULL;\n\nnode1.next = node2;\n\nprintf(\"%d %d\", node1.data, (node1.next)->data);\n```\n",
        "```\nNode node1;\nnode1.data = 0;\nnode1.next = NULL;\n\nNode node2;\nnode2.data = 1;\nnode2.next = NULL;\n\nnode1.next = &node2;\n\nprintf(\"%d %d\", node1.data, (node1.next)->data);\n```\n",
        "```\nNode node1;\nnode1.data = 0;\nnode1.next = NULL;\n\nNode node2;\nnode2.data = 1;\nnode2.next = NULL;\n\nnode1.next = node2;\n\nprintf(\"%d %d\", node1.data, node1->next->data);\n```\n",
        "```\nNode *node1;\nnode1->data = 0;\nnode1->next = NULL;\n\nNode *node2;\nnode2->data = 1;\nnode2->next = NULL;\n\nnode1->next = node2;\n\nprintf(\"%d %d\", node1->data, node1->next->data);\n```\n"
      ],
      "explainations": [
        "A is incorrect. The `node1.next` is a pointer, so it should be assigned with the address of `node2`, which needs `&`.",
        "B is correct. This is the basic way to create and link two nodes together.",
        "C is incorrect. The `node1` is not a pointer, so it cannot use `->` to access its members.",
        "D is incorrect. The `node1` and `node2` are not pointing to `Node` data structures in the memory, so accessing what they point to is a memory error."
      ]
    },
    {
      "prompt": "Assume we have the same node definition as the previous question. Which of the following correctly dynamically create(s) `node1` and `node2` and free the allocated memory?",
      "answer": [
        1,
        3
      ],
      "distractors": [
        "```\nNode node1 = (Node *)malloc(sizeof(Node));\nnode1.data = 0;\nnode1.next = NULL;\n\nNode node2 = (Node *)malloc(sizeof(Node));\nnode2.data = 1;\nnode2.next = NULL;\n\nnode1.next = &node2;\n\nprintf(\"%d %d\", node1.data, node1.next->data);\n\nfree(node1.next);\nfree(node1);\n```\n",
        "```\nNode *node1 = (Node *)malloc(sizeof(Node));\nnode1->data = 0;\nnode1->next = NULL;\n\nNode *node2 = (Node *)malloc(sizeof(Node));\nnode2->data = 1;\nnode2->next = NULL;\n\nnode1->next = node2;\n\nprintf(\"%d %d\", node1->data, node1->next->data);\n\nfree(node1);\nfree(node2);\n```\n",
        "```\nNode *node1 = (Node *)malloc(sizeof(Node));\nnode1->data = 0;\nnode1->next = NULL;\n\nNode *node2 = (Node *)malloc(sizeof(Node));\nnode2->data = 1;\nnode2->next = NULL;\n\nnode1->next = node2;\n\nprintf(\"%d %d\", node1->data, node1->next->data);\n\nfree(node1);\nfree(node1->next);\n```\n",
        "```\nNode *node1 = (Node *)malloc(sizeof(Node));\nnode1->data = 0;\nnode1->next = NULL;\n\nNode *node2 = (Node *)malloc(sizeof(Node));\nnode2->data = 1;\nnode2->next = NULL;\n\nnode1->next = node2;\n\nprintf(\"%d %d\", node1->data, node1->next->data);\n\nfree(node1->next);\nfree(node1);\n```\n"
      ],
      "explainations": [
        "A is incorrect. The `node1` and `node2` are supposed to be pointers, so they should be declared as `Node *`.",
        "B is correct. This is the basic way to dynamically create and link two nodes together. Since `node1` and `node2` store the address separately, the order of `free` does not matter.",
        "C is incorrect. The order of `free` is incorrect. If we free `node1`, it is a memory error to access `node1->next` and free it. `node1` should be freed after `node1->next`.",
        "D is correct. The `node1` is freed after `node1->next`."
      ]
    }
  ]
};