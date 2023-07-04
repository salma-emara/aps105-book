# Exercises

Many of these exercises are taken from past exams of APS105 Computer Fundamentals courses at University of Toronto. The solutions are provided in the answer boxes.

Headings in this page classify the exercises into different categories: **[Easy]**, **[Intermediate]**, and **[Challenging]**. I suggest you start by easy exercises and work your way up to the challenging ones.

**Question 12 in Winter 2017 Final Exam[Easy]**


Consider the following binary search tree:
    
```{figure} ./images/q9-bst-winter18.png
:alt: q9-bst-winter18
:width: 400px
:align: center
:name: q9-bst-winter18

Binary search tree
```

This tree may have been created by inserting the elements in the following order: `5, 3, 7, 4, 6`.

Or it may have been created by inserting the elements in the following order: `5, 7, 3, 6, 4.`

But a different tree would have been created by inserting the elements in the following order: `5, 4, 6, 7, 3`.

How many different ways can the elements `{3, 4, 5, 6, 7}` be inserted into a binary tree so that the same tree is created as in the figure above?

````{admonition} Answer
:class: dropdown
6 ways:

5, 3, 4, 7, 6

5, 3, 7, 4, 6

5, 3, 7, 6, 6

5, 7, 3, 4, 6

5, 7, 3, 6, 4

5, 7, 6, 3, 4
````

**Question 10 in Winter 2018 Final Exam[Easy]**

Identify and correct all errors you find in the C program below. Each line may or may not contain errors, and there may be more than one error per line.

```{code-block} c
:linenos:
#include <stdio.h>
#include <stdlib.h>
typedef struct node {
  int data;
  struct node *left, right;
} Node;
Node *insert(Node *root, int item) {
  if (root == NULL) {
  }
  return newNode(item);
}
if (item <= (*root).data) insert(root->left, item) return root;
int main(void) {
  int list[] = {15, 3, 2};
  Node *root = NULL;
  for (int i = 0; i < 13; i++) {
  }
  return 0;
}
```

| Line   |    Description of error   | Correction   |
| -------------- | ----------- | ----------- |
|    |          |          |
|    |          |          |
|    |          |          |
|    |          |          |
|    |          |          |
|    |          |          |
|    |          |          |

````{admonition} Answer
:class: dropdown

| Line   |    Description of error   | Correction   |
| -------------- | ----------- | ----------- |
|  5  | missing * before right | Add * before right |
|  9  | `newNode()` not defined  | Define the `newNode()` function |
|  12 |   missing ;       |    Add ;      |
````



**Question 10 in Winter 2019 Final Exam[Challenging]**

Consider the binary search tree below:

```{figure} ./images/q10-bst-winter19.png
:alt: q10-bst-winter19
:width: 400px
:align: center
```

The lowest common ancestor, LCA, of two nodes `p` and `q` is either one of the two nodes having the other as a descendant, or the lowest node in the tree that has both `p` and `q` as descendants. For example, in the binary search tree above:
- The LCA of nodes `5` and `28` is `22`.
- The LCA of nodes `7` and `30` is `29`.
- The LCA of nodes `35` and `61` is `35`.
- The LCA of nodes `30` and `41` is `35`.

Complete the recursive helper function, with the prototype given on the next page, which takes the tree root and two values of node data, and returns the LCA (a node) of the given nodes.

Assume that the two `int` values provided always exist in the tree.

Assume that the binary search tree is designed as follows:

```{code-block} c
typedef struct node {
  int data;
  struct node *left, *right;
} Node;
typedef struct bstree {
  Node *root;
} BSTree;
```

The main function, `lca()`, uses an auxiliary helper function to perform the task; this helper function is called inside the `lca` function:
```{code-block} c
Node *lca(BSTree *tree, int na, int nb) {




}

Node *lcaHelper(Node *p, int na, int nb) {







}
```

````{admonition} Answer
:class: dropdown

The idea is to start from the root. If the root is larger than the two values we want to find their LCA, then the LCA must be in the left subtree. If the root is smaller than the two values, then the LCA must be in the right subtree. Otherwise, the root is the LCA, and we should return it.

```{code-block} c
Node *lca(BSTree *tree, int na, int nb) {
  return lcaHelper(tree->root, na, nb);
}
Node *lcaHelper(Node *p, int na, int nb) {
  if (p == NULL) return NULL;
  if (p->data > na && p->data > nb) return lcaHelper(p->left, na, nb);
  if (p->data < na && p->data < nb) return lcaHelper(p->right, na, nb);
  return p;
}
```
````

**Question 12 in Winter 2019 Final Exam[Challenging]**

Complete a recursive helper function and a main calling function to scan an existing binary search tree and create a new tree with only the even values from the first tree. You can use the functions developed in class, including:

```{code-block} c
void initBSTree(BSTree *tree) { tree->root = NULL; }
bool insert(BSTree *tree, int value); // implemented in previous section
````

You may assume that the following data structure types have been defined:
```{code-block} c
typedef struct node {
  int data;
  struct node *left, *right;
} Node;
typedef struct bstree {
  Node *root;
} BSTree;
```

```{code-block} c

Node *treeWithEvens(BSTree *inputTree) {

    





}
bool evensHelper(Node *current, BSTree *evenTree) {
  // helper function: check this node and connected nodes using a recursive
  // call,
  // placing even values in the new tree







}
```

````{admonition} Answer
:class: dropdown
The idea is to insert the node if it is even, and then recursively call the helper function on the left and right subtrees.
```{code-block} c
bool evensHelper(Node *current, BSTree *evenTree) {
  if (current == NULL) return;  // done this link
  if (current->data % 2 == 0)   // is even
    insert(evenTree, current->data);
  evensHelper(current->left, evenTree);
  evensHelper(current->right, evenTree);
}
Node *treeWithEvens(BSTree *inputTree) {
  BSTree newTree;
  initBSTree(&newTree);
  if (isEmpty(inputTree)) return newTree.root;
  evensHelper(inputTree->root, &newTree);
  return newTree.root;
}
```
````

**Question 12 in Winter 2017 Final Exam[Challenging]**

Recall that, in a binary tree, a node that has no children is called a leaf. Given the following node declaration:
```{code-block} c
struct treeNode {
  int value;
  struct treeNode *left;
  struct treeNode *right;
};
```

Write a function called `treeLeafCount()` that takes one `struct treeNode *root` parameter and returns the number of leaves in the tree pointed to by `root`. You may not use global variables in your solution.

````{admonition} Answer
:class: dropdown
The idea is to recursively call the function on the left and right subtrees, and return 1 to add it to count if the current node is a leaf. A node is a leaf if both its left and right pointers are NULL.
```{code-block} c
int treeLeafCount(struct treeNode *p) {
  int count = 0;
  if (p == NULL) return 0;
  if ((p->left == NULL) && (p->right == NULL)) return 1;
  if (p->left != NULL) count = treeLeafCount(p->left);
  if (p->right != NULL) count = count + treeLeafCount(p->right);
  return count;
}
```
````

**Question 16 in Winter 2018 Final Exam[Challenging]**

The following C structure is used to define each node in a binary search tree:
```{code-block} c
struct treeNode {
  int value;
  struct treeNode *left;
  struct treeNode *right;
};
```

Write a C function:
```{code-block} c
Node *secondLargestNode(Node *root);
```

that finds and returns a pointer to the node that contains the second largest value in the binary search tree. The parameter root is a pointer to the root node of a binary search tree. If the binary search tree is empty or has one node only, the function returns `NULL`. For example, if the function is called with root pointing to the binary search tree in {numref}`q9-bst-winter18`, it will return a pointer to the node that contains 6.

````{admonition} Answer
:class: dropdown
The idea is to find the largest node, and then find the largest node in the left subtree of the largest node. If the largest node has a left subtree, then the largest node in the left subtree is the second largest node. Otherwise, the parent node of the largest node is the second largest node.
```{code-block} c
Node *secondLargestNode(Node *root) {
  Node *current = root;
  Node *parent = NULL;
  // Returning NULL when the tree is empty or contains only one node
  if (root == NULL || (root->left == NULL && root->right == NULL)) {
    return NULL;
  }
  // Find the largest node first
  while (current->right != NULL) {
    parent = current;
    current = current->right;
  }
  // Now current points to the largest node
  // Does the largest node has a left subtree?
  if (current->left == NULL) {
    return parent;
  } else {
    // Look for the largest node in the left subtree
    current = current->left;
    while (current->right != NULL) {
      current = current->right;
    }
    return current;
  }
}
```
````

