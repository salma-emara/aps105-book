let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "What is the main characteristic of a binary tree?",
      "answer": [
        3
      ],
      "distractors": [
        "Each node can have any number of children.",
        "Each node can have only one child.",
        "Each node can have multiple parents.",
        "Each node can have at most two children."
      ],
      "explainations": [
        "A is incorrect. Each node can have at most two children.",
        "B is incorrect. Each node can have at most two children.",
        "C is incorrect. Each node can have at most two children.",
        "D is correct. Each node can have at most two children."
      ]
    },
    {
      "prompt": "What is/are the main characteristic(s) of a binary search tree?",
      "answer": [
        0,
        2,
        3
      ],
      "distractors": [
        "Each node can have at most two children.",
        "Each node can have any number of children.",
        "The left child of a node is always smaller than the node, and the right child is always larger.",
        "All nodes in the left subtree of a node are always smaller than the node, and all nodes in the right subtree are always larger."
      ],
      "explainations": [
        "A is correct. Each node can have at most two children. Binary search trees are a type of binary tree.",
        "B is incorrect. Each node can have at most two children.",
        "C is correct. In general, all nodes in the left subtree of a node are always smaller than the node, and all nodes in the right subtree are always larger. Not just the left and right child.",
        "D is correct. All nodes in the left subtree of a node are always smaller than the node, and all nodes in the right subtree are always larger."
      ]
    },
    {
      "prompt": "Why do we need a binary search tree?",
      "answer": [
        0
      ],
      "distractors": [
        "It allows efficient searching for elements.",
        "It reduces the number of nodes in the tree.",
        "It ensures balanced tree structure, where the height of the left and right sub-tree of any node does not differ by more than one.",
        "It reduces the amount of memory needed to store elements."
      ],
      "explainations": [
        "A is correct. Binary search trees allow efficient searching for elements.",
        "B is incorrect. Binary search trees do not reduce the number of nodes in the tree.",
        "C is incorrect. Binary search trees do not ensure balanced tree structure. (But they can be balanced.)",
        "D is incorrect. Binary search trees for each element requires storing two pointers for the right and left child, hence it does not save space."
      ]
    }
  ]
};