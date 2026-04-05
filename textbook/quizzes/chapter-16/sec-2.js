let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Why can a binary search tree use recursion to print its elements?",
      "answer": [
        1
      ],
      "distractors": [
        "The binary search tree at most has two children per node.",
        "The binary search tree structure is recursive in nature, where each node has at most two children which are binary search trees themselves.",
        "All nodes in left subtree are less than to the root node, and all nodes in the right subtree are greater than the root node.",
        "None of the above."
      ],
      "explainations": [
        "A is incorrect. The binary search tree at most has two children per node, but this does not explain why it can use recursion to print its elements in order.",
        "B is correct. A binary search tree can be broken into smaller binary search subtrees easily.",
        "C is incorrect. This does not explain why recursion can be used to print elements of the binary search tree.",
        "D is incorrect. B is correct."
      ]
    },
    {
      "prompt": "What is the difference between searching for a node and inserting a node in a binary search tree?",
      "answer": [
        3
      ],
      "distractors": [
        "Searching need to find the node with the same value, while inserting can just insert the node at the end of the tree.",
        "Inserting will change the structure of the tree before inserting, while searching will not.",
        "Searching involves comparing the node's value with the target value, while inserting does not involve any comparison.",
        "None of above."
      ],
      "explainations": [
        "A is incorrect. Inserting a node in a binary search tree requires finding the correct position to insert the node, which is the same as searching for a node.",
        "B is incorrect. Inserting a node in a binary search tree does not change the structure of the tree before inserting. It only inserts the node at a NULL position.",
        "C is incorrect. Both searching and inserting involve comparing the node's value with the target value.",
        "D is correct. Searching and inserting essentially have the same process, which is to compare the node's value with the target value. The searching is the first step of inserting."
      ]
    }
  ]
};