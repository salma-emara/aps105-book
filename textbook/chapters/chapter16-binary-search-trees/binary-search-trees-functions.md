# Operations on a binary search tree

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
:alt: create node
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

### Iterative search

Since we are only traversing one branch of the tree, we only need to keep track of one node at a time. Therefore, we can use a non-recursive function to search for a node with a given value.

We can use the following function `search` to search for a node with a given value. The following function receives a pointer `tree` to the binary search tree data structure, and a value `value` to search for. The function returns a pointer to the node with the given value, or `NULL` if the value is not found.

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

Line $4$ is the condition for the loop to keep iterating. Of course, we need to keep traversing a branch of the tree if we have not found the value yet, hence we should keep iterating as long as `current->data` is not `value`. However, it will cause a segmentation fault if we try to access `current->data` when `current` is `NULL`. Therefore, we also need to check that `current` is not `NULL`. Checking for `current != NULL` should be before checking for `current->data != value`, because if `current` is `NULL`, we cannot access `current->data`. Hence, the condition for the loop to keep iterating is `current != NULL && current->data != value`. Recall that lazy evaluation is used in C, hence the second condition will not be evaluated if the first condition is `false`. 

When we exit the loop, either `current` is pointing to the node we are looking for, or `current` is `NULL` if the value is not found. Hence, we can return `current` as the result of the function.

### Recursive search

We can also write a recursive function to search for a node with a given value. The following function `searchRecursiveHelper` is a helper function that receives a pointer `n` to the current node, and a `value` to search for. The function returns a pointer to the node that was found, or `NULL` if the node was not found.

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

Lines $15$ - $21$ look into the `data` of node `n` and decide which subtree to explore. If `value < n->data` is `true`, we explore the left subtree and call `searchRecursiveHelper(n->left, value)`. Otherwise, we explore the right subtree and call `searchRecursiveHelper(n->right, value)`.

The recursive calls continue until we reach a `NULL` node, or we find the node we are looking for. These are our terminating conditions or base cases.

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

Inserting a node with a given value is a similar to searching for a node with a given value. For example, given the following binary search tree, we want to insert a node with value `9`. 

1. We have to start from the root, and compare the value of the root, which is `8` and `9`. 
2. Since `9` is larger than `8`, we can insert the node in the right subtree. 
3. Looking at the right node of `8`, we see that its value is `11`, which is larger than `9`. Hence, we can insert the node in the left subtree of `11`. 
4. Looking at the left node of `11`, we see that it is `10`, hence we can insert the node in the left subtree of `10`.
5. Looking at the left node of `10`, we see that it is `NULL`, hence we can insert the node in the left subtree of `NULL`.

```{figure} ./images/insert-9.png
:alt: insert-9
:width: 600px
:align: center
```

We can only insert a node at an empty place in the tree. Therefore, we need to traverse the tree until we reach a `NULL` node. It can be a leaf node or a node 
with only one child.

### Iterative insertion

We can use the following function `insert` to insert a node with a given value. The following function receives a pointer `tree` to the binary search tree data structure, and a value `value` to insert. The function returns a `bool` value, which is `true` if the node that was inserted, or `false` if the node was not inserted.

Similar to the `search` function, we can have a `current` pointer that points to the current node. We can stop traversing the node when `current` is `NULL`, which is where the node should be inserted. However, we need a pointer to the parent node to point its `right` or `left` to the new node inserted. This is why we additionally need a `parent` pointer that points to the parent of the `current` node.

We start at the root node, and traverse the tree using `current` and `parent` until `current` reaches a `NULL` node. At each iteration, we update the `current` and `parent` pointers. `current` moves to the left or right subtree depending on the value of `value`. `parent` is always the parent of `current`.

When we exit the loop, `current` is `NULL`, and `parent` is the parent of the node we want to insert. We can insert the node in the left or right subtree of `parent` depending on the value of `value`.

**Draft Code**
```{code-block} c
bool insert(BSTree *tree, int value) {
  // The tree is not empty.
  Node *current = tree->root;  // The current subtree.
  Node *parent = NULL;         // the root node has no parent.

  while (current != NULL) {
    parent = current;

    if (value < current->data) {
      // The new node should go to the left of the current subtree.
      current = current->left;
    } else {
      // The new node should go to the right of the current subtree.
      current = current->right;
    }
  }

  // At this point, current is NULL.
  // But also, we know that we need to insert to the right/left of parent.

  if (value < parent->data) {
    // The new node should go to the left of the parent.
    parent->left = createNode(value);

    return parent->left != NULL;
  } else {
    // The new node should go to the right of the parent.
    parent->right = createNode(value);

    return parent->right != NULL;
  }
}
```

The special case of this function is if the tree is empty. In this case, we can simply create a new node and assign it to the root of the tree. We tackle this case in the following function `insert` from lines $1$ - $5$.

**Code**
```{code-block} c
:linenos:
:emphasize-lines: 2 - 6
bool insert(BSTree *tree, int value) {
  if (tree->root == NULL) {
    // The tree is empty, add its first node.
    tree->root = createNode(value);
    return tree->root != NULL;
  }

  // The tree is not empty.
  Node *current = tree->root;  // The current subtree.
  Node *parent = NULL;         // the root node has no parent.

  while (current != NULL) {
    parent = current;

    if (value < current->data) {
      // The new node should go to the left of the current subtree.
      current = current->left;
    } else {
      // The new node should go to the right of the current subtree.
      current = current->right;
    }
  }

  // At this point, current is NULL.
  // But also, we know that we need to insert to the right/left of parent.

  if (value < parent->data) {
    // The new node should go to the left of the parent.
    parent->left = createNode(value);

    return parent->left != NULL;
  } else {
    // The new node should go to the right of the parent.
    parent->right = createNode(value);

    return parent->right != NULL;
  }
}
```

```{admonition} Note
:class: note
We are making an assumption that before calling `insert`, we have checked that the value we are inserting is not already in the tree. If the value is already in the tree, we should not insert it again.
```

### Recursive insertion

We can also implement the `insert` function recursively. The following function `insertRecursiveHelper` receives a pointer `n` to the current node, and a value `value` to insert. The function returns a pointer to the root node.

We can use the same logic as the iterative function. We start at the root node, and recursively traverse the right or left subtree depending on the value of the node `n` and `value` we want to insert until we reach a `NULL` node. Our recursive call updates the `n` pointer: `n` moves to the left or right child depending on the value of `value`.

At some point in time, we find `n` is `NULL`. This is when we exit the recursion and create the node. We return the pointer to the node that we created. This pointer is then assigned to the `left` or `right` pointer of the parent node.

The following code implements the insert function recursively. To help understand the function, we trace the execution of the function for the following tree in {numref}`insert-recursive-trace`.

**Code**
```{code-block} c
Node *insertRecursiveHelper(Node *n, int value) {
  if (n == NULL) {
    // We have reached an empty spot in the tree, create the node.
    return createNode(value);  // Base case.
  }

  if (value < n->data) {
    // The new node should go to the left of the current subtree.
    n->left = insertRecursiveHelper(n->left, value);  // Recursive call.
  } else {
    // The new node should go to the right of the parent.
    n->right = insertRecursiveHelper(n->right, value);  // Recursive call.
  }

  return n;
}
```

```{figure} ./images/insert-recursive-trace.png
:alt: insert-recursive-trace
:width: 1000px
:align: center
:name: insert-recursive-trace

Trace of the execution of the `insertRecursiveHelper` function.
```

The following `insertRecursive` function is a wrapper function that calls `insertRecursiveHelper` and updates the `tree->root` of the tree if `insertRecursiveHelper` returns a pointer to the a new root. There is a new root when the `root` of the tree was pointing to `NULL`, and the new node is inserted at the `root`. The function returns `true` if the node was inserted successfully, and `false` otherwise.

**Code**
```{code-block} c
bool insertRecursive(BSTree *tree, int value) {
  // Start at the root and recursively traverse the tree.
  Node *inserted = insertRecursiveHelper(tree->root, value);

  // The root of the tree may have been updated.
  tree->root = inserted;

  return inserted != NULL;
}
```

{{quiz_embed | replace("%%FILENAME%%", "chapter-16/sec-2") }}