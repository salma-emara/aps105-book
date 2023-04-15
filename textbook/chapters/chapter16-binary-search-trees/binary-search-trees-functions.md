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

Recall that all elements on the left subtree are smaller than the root, and all elements on the right subtree are larger than the root. To print the values of the nodes in a binary search tree in order, we have to printing the values of the nodes in the left subtree, then printing the value of the root, and finally printing the values of the nodes in the right subtree.

If we start by printing the nodes in the left subtree, we still have to print nodes in the left subtree of the left subtree first, then its root, then the right subtree of the left subtree. For example, in the following figure, we show the order of nodes we have to traverse to print the values of the nodes in order.  

```{figure} ./images/traverse-tree-in-order.png
:alt: traverse-tree-in-order
:width: 600px
:align: center
```

If we start from the root, we can traverse the left node, then the left node of that and so on till we reach the leftmost node and print it. To able to go back to all the nodes back up to the root, we must have a way to keep track of the nodes we have visited. We can make use of recursive functions to keep track of the nodes we have visited. Recall that recursive functions are functions that call themselves, and store the values of their local variables in the stack, independent of the values of the local variables in the other instances of the function.

Therefore, we can use recursion to print the values of the nodes in order. We need to think of two things: the recursive call and the base case. The recursive call is the call to the function itself, and the base case is the case where we do not need to make a recursive call. To find the recursive call, we need to **think recursively**, or think of a smaller sized problem to the current problem. The current problem is to print the entire tree, and a smaller problem can be a smaller subtree. Refer to the following figure to see how we can think recursively to print the values of the nodes in order.

```{figure} ./images/think-recursively-to-print.png
:alt: think-recursively-to-print
:width: 600px
:align: center
```

If we start from the root, we can call the print function on the left subtree first, then print the root, and finally call the print function on the right subtree.

We can use the following helper function `printHelper` to recursively print the values of the nodes in order.

**Code**
```{code-block} c
:linenos:
:emphasize-lines: 2- 4
void printHelper(Node *n) {
  if (n == NULL) {
    return;  // Base case.
  }

  // Print all smaller values first.
  printHelper(n->left);  // Recursive call.

  // Print the parent node.
  printf("%d ", n->data);

  // Print all larger values next.
  printHelper(n->right);  // Recursive call.
}
```

In lines $2$ to $4$, we have our base case, which is when we reach a node that is `NULL`. 

We call the preceding function on the root of the binary search tree inside the following function `print`. The following function receives a pointer `tree` to the binary search tree data structure.

**Code**
```{code-block} c
void print(BSTree *tree) {
  // Starting from the root, recursively traverse and print the tree in-order.
  printHelper(tree->root);
}
```

### Tracing the print function

We will trace the `printHelper` function on the following small tree.

```{figure} ./images/print-example.png
:alt: print-example
:width: 600px
:align: center
```

The following figure shows the order of function calls when `printHelper` function is called on the root of the tree. Note that the function calls are stored in the stack, and the function calls store different values of `n` in the stack. When a function returns, it returns to where it was called in the calling function, and the values of the local variables are restored to the values they had when the function call was made.

```{figure} ./images/print-trace.png
:alt: print-trace
:width: 600px
:align: center
```

## Search for a node with a given value

### Iteratively

Searching for a node in a binary search tree is easier
than printing nodes, because printing nodes requires us to traverse the entire tree, while searching for a node requires us to traverse only a part of the tree as we will show now.

For example, we are to look for the node with the value $10$ in the following tree. Looking for `10` in the tree is similar to looking for `10` in a sorted array. We can start from the root, `8` is smaller than `10`, hence `10` should be in the right subtree. To the right of `8`, we have `11`, which is larger than `10`, hence `10` should be in the left subtree of `11`. To the left of `11`, we have `10`, which is equal to `10`, hence we have found the node we are looking for.

```{figure} ./images/search-bst-found.png
:alt: search-bst-found
:width: 600px
:align: center
```

However, if we were looking for `9` in the tree, we have to go to the right of `8`, then left of `11`, then left of `10`, then we find `NULL`. At this point, we can conclude that `9` is not found. If `9` was there, it should have been to the left of `10`.  

```{figure} ./images/search-bst-not-found.png
:alt: search-bst-not-found
:width: 600px
:align: center
```

In summary, we can start from the root, and compare the value of the root with the value we are looking for. If the value of the root is smaller than the value we are looking for, we can search for the value in the right subtree. If the value of the root is larger than the value we are looking for, we can search for the value in the left subtree. If the value of the root is equal to the value we are looking for, we have found the node we are looking for. If we reach a `NULL` node, we can conclude that the value we are looking for is not found.

Since we are only traversing one branch of the tree, we only need to keep track of one node at a time. Therefore, we can use a non-recursive function to search for a node with a given value. 

We can use the following function `search` to search for a node with a given value.

**Code**
```{code-block} c
:linenos:
:emphasize-lines: 4
Node *search(BSTree *tree, int value) {
  Node *current = tree->root;

  while (current != NULL && current->data != value) {
    // We have not found the value yet.
    if (value < current->data) {
      // Check the left subtree.
      current = current->left;
    } else {
      // Check the right subtree.
      current = current->right;
    }
  }

  // Note: current can be NULL if the value is not found.
  return current;
}
```

Line $4$ is the condition for the loop to keep iterating. As long as we have not reached a `NULL` node, and the value of the current node is not equal to the value we are looking for, we keep iterating. Otherwise, we exit the loop. When we exit the loop, either `current` is pointing to the node we are looking for, or `current` is `NULL` if the value is not found.

### Recursively

We can also write a recursive function to search for a node with a given value. The following function `searchRecursiveHelper` is a helper function that receives a pointer `n` to the current node, and a value `value` to search for. The function returns a pointer to the node that was found, or `NULL` if the node was not found.

**Code**
```{code-block} c
:linenos: 
:emphasize-lines: 2 - 5, 7 - 10, 15 - 21
Node *searchRecursiveHelper(Node *n, int value) {
  if (n == NULL) {
    // Nothing left to explore.
    return n;  // Base case.
  }

  if (n->data == value) {
    // Found the node.
    return n;  // Base case (can combine with above if-statement).
  }

  // At this point, n is non-NULL.
  // Also, n is not the node we are looking for.

  if (value < n->data) {
    // Check the left subtree.
    return searchRecursiveHelper(n->left, value);
  } else {
    // Check the right subtree.
    return searchRecursiveHelper(n->right, value);
  }
}
```

Lines $15$ - $21$ look into the `data` of node `n` and decide which subtree to explore. If `value < n->data` is `true`, we explore the left subtree. Otherwise, we explore the right subtree.

Lines $2$ - $5$ and $7$ - $10$ are the base cases. If `n` is `NULL`, we have reached a `NULL` node, and we can conclude that the value we are looking for is not found. If the value of `n` is equal to the value we are looking for, we have found the node we are looking for. In both cases, we return `n`.

The following function `searchRecursive` is a wrapper function that receives a pointer `tree` to the binary search tree data structure, and a value `value` to search for. The function returns a pointer to the node that was found, or `NULL` if the node was not found. This happens by calling `searchRecursiveHelper` on the root node of the tree.

**Code**
```{code-block} c
Node *searchRecursive(BSTree *tree, int value) {
  // Start at the root and traverse the tree recursively.
  return searchRecursiveHelper(tree->root, value);
}
```

## Inserting a node with a given value

In-progress!