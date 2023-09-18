# What are binary trees?

A binary tree looks like an upside down tree as shown in {numref}`binary-tree`. The **root** of the binary tree at the top, and the **leaves** are at the bottom. Each node stores some data, which will be an integer value in our examples. There are no two nodes with the same `data`. Each node has at most two children, and each node has only one **parent**, except for the **root** node, which has no parent. 

A subtree is a smaller tree having a node and **all its descendants** in the original tree. In the following figure, the subtree rooted at node **4** is the left subtree of the binary tree shown in {numref}`binary-tree`. 

```{figure} ./images/binary-tree.png
:alt: binary tree
:width: 600px
:align: center
:name: binary-tree

Binary tree with 7 nodes
```

## How do we represent a binary tree in a program?

We can use a data structures to represent a node in a binary tree. Each node in the binary tree will be a node that store three member. Each node in the linked list will have a `data` field, a `left` field, and a `right` field. The `left` field will point to the left child of the node, and the `right` field will point to the right child of the node. If a node does not have a left child or a right child, then the `left` field or the `right` field will be `NULL`. 

```{code-block} c
typedef struct node {
    int data;
    struct node *left;
    struct node *right;
} Node;
```

Hence, the binary tree in {numref}`binary-tree` can be represented as follows:

```{figure} ./images/binary-tree-data-struct.png
:alt: binary tree data structure
:width: 600px
:align: center
```

Just like linked lists, where we had a `head` pointer pointing towards the first node in the linked list, we must have a `root` pointer that always points at the top of the binary tree. `LinkedList` data structure held the value of the `head` pointer in linked lists. Similarly, we will use a `BSTree` data structure to hold the value of the `root` pointer in binary trees, as shown below:

```{code-block} c 
typedef struct bstree {
    Node *root;
} BSTree;
```

## What is a binary search tree?

What is special about the above binary tree? It is ordered in such a way that the left child of every node is always smaller than the node, and the right child of a node is always larger than the node. This is the same property that for subtrees too. All nodes in a left subtree are smaller than the parent node, and all nodes in a right subtree are larger than the parent node. This is called a **binary search tree**.

## Why do we need a binary search tree?

We have seen that arrays and linked lists are not very efficient in searching for elements. We have seen how **binary search** is quick when an array or linked list is sorted. A binary search tree is ordered in a way that makes searching for elements quick. For example, to look for an item in a binary search tree, we can start at the root node. If the item is *smaller* than the root node, we can look at the **left child** of the root node. If the item is *larger* than the root node, we can look at the **right child** of the root node. We can continue this process until we find the item or we reach a leaf node and not find the item.

We will discuss details on how to search for elements in a binary search tree in the next sections.

{{quiz_embed | replace("%%FILENAME%%", "chapter-16/sec-1") }}