# Operations on a binary search treee

In this section, we will discuss how to how to **print** the values of the nodes in order in a binary search tree, how to **search** for and **insert** elements in a binary search tree. We will **not** discuss how to delete elements from a binary search tree.

## Preliminaries

Recall that a binary search tree can be represented using the following data structure `BSTree` that only holds a pointer to the `root` of the binary search tree. While each node in the binary search tree can be represented using the following data structure `Node` that holds the `data` of the node, and pointers to the `left` and `right` children of the node.

```{code-block} c 
typedef struct bstree {
    Node *root;
} BSTree;
```

```{code-block} c
typedef struct node {
    int data;
    struct node *left;
    struct node *right;
} Node;
```

## Create a node in a binary search tree

Similar to the linked list, we can create a node in a binary search tree using the following function `createNode` that takes in the `value` of the node to be created, and returns a pointer to the newly created node.

**Code**
```{figure} ./images/createNode.png
:alt: createNode
:width: 600px
:align: center
```

To use this function to create a node in a binary search tree, we can do the following:

**Code**
```{figure} ./images/create-a-tree.png
:alt: create-a-tree
:width: 600px
:align: center
```

```{admonition} Note
Recall here that `tree` is not a pointer, it is a variable of type `BSTree`. So, when we access `root` of the binary search tree, we need to use the `.` operator. However, when we access the `data` of the `Node* p` in `createNode` function, we need to use the `->` operator, since `p` is a pointer to a `Node`.
```

## Printing the values of the nodes in order



In-progress!