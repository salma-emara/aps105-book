# Delete nodes in a linked list

In the previous section, we have been dynamically allocating memory for nodes and never deleting them. This is a problem because we are wasting memory. We can fix this by deleting nodes when we are done with them. In this section, we will implement functions that help us delete nodes in a linked list.

**Generally**, to delete a node, we need to do the following:

1. Find the node we want to delete
2. Fix the links before and after the node we want to delete
3. `free` the dynamically allocated memory for the node we want to delete
4. (if necessary) Update the head of the list

## Deleting a node at the beginning/front of the list

To delete a node at the beginning of the list, we need to do the following:

1. Declare a pointer to the second node in the linked list
2. `free` the memory allocated for the first node pointed to by the `head` pointer of the list
3. Update the head pointer to point to the second node in the list

```{figure} ./images/deleteAtFront-image.png
:alt: delete at front-image
:width: 600px
:align: center
```


To implement this function, we don't need to return anything, and we only pass the `LinkedList*`. We can do the following:

**Code**
```{figure} ./images/deleteAtFront-code.png
:alt: delete at front-code
:width: 600px
:align: center
```

We check for if the list is empty or not, because we may not have any nodes in the list. This will cause a segmentation fault if we access `list->head->next` when the list is empty. If the list is not empty, we can safely delete the first node in the list. Otherwise, we do nothing.

The function above works if we have only one node. `newHead` will have `NULL` and eventually `list->head` will be set to `newHead` which is `NULL`. This will cause the list to be empty.

## Deleting a node at the end of the list

To delete a node at the end of the list, we need to do the following:

1. Find the second to last node in the list
2. `free` the memory allocated for the last node in the list
3. Set the next of the second to last node to `NULL`
   
The following figure illustrates the steps above:

```{figure} ./images/deleteBack-image.png
:alt: delete back image
:width: 600px
:align: center

Illustration of deleting the last node in a linked list. **Step 1** is to find the second last node. **Step 2** is to free the space allocated for the last node. **Step 3** is to set the next of the second last node to `NULL` making it the last node.
```

To implement this function, we don't need to return anything, and we only pass the `LinkedList*`. To identify the last node, we previously said that if `current->next == NULL`, then `current` is pointing at the last node. If `current->next->next == NULL`, then `current` is pointing at the second last node. We can do the following to delete the last node in the list:

**Code**
```{figure} ./images/deleteBack-code.png
:alt: delete back code
:width: 600px
:align: center
```

However, if the code above can work if we have **two** nodes in the list, otherwise `current->next->next` will cause a segmentation fault. We can fix this by checking if the list is empty or if it has one node before checking `current->next->next`.

If the list is empty, we can return as there is nothing to delete.

If the list has one node, we can delete that one node by calling `deleteFront(list)`.

The following code implements the above logic. Download {download}`deleteBack.c <../../code/chapter13/deleteBack/deleteBack.c>` if you want to play with the code.

```{code-block} c
:linenos:
:emphasize-lines: 2 - 5, 7 - 11
void deleteBack(LinkedList *list) {
  if (list->head == NULL) {
    // The list is empty, there is nothing to delete.
    return;
  }

  if (list->head->next == NULL) {
    // There is only one node in this list.
    deleteFront(list);
    return;
  }

  Node *current = list->head;

  // Traverse the list until we reach the second last element.
  // Thanks to the previous if-statement, we know that list->head->next is
  // non-NULL.
  while (current->next->next != NULL) {
    current = current->next;
  }

  // current now points to the second last element of the list.
  free(current->next);  // Delete the last element of the list.
  current->next = NULL; // The second last element is now the last element.
}
```

In lines $2 - 5$, we check if the list is empty. If it is, we return as there is nothing to delete.

In lines $7 - 11$, we check if the list has one node. If it does, we call `deleteFront(list)` to delete the only node in the list.

## Deleting all nodes in the linked list

To delete all nodes in the linked list, we need to call `deleteFront` (or `deleteBack`) until the list is empty. 

We implement a function named `deleteAllNodes` that deletes all nodes and returns the number of nodes deleted. It takes `LinkedList*` as a parameter. We implement it as follows:

**Code**
```{code-block} c 
int deleteAllNodes(LinkedList *list) {
  int numDeleted = 0;

  while (list->head != NULL) {
    deleteFront(list);
    numDeleted++;
  }

  // The list is now empty. Optionally, set it to NULL to confirm.
  // deleteFront already sets list->head to NULL.
  list->head = NULL;

  return numDeleted;
}
```

## Delete the first matching node with `data` = `searchVal`

To delete a node with a specific value, *e.g*, $3$  we need to do the following:

1. Find the node with the specified data
2. Link the previous node to the next node after the node with specified data
3. `free` the space dynamically allocated for the node with the specified data

The following figure illustrates the steps above:

```{figure} ./images/deleteFirstMatch_order.png
:alt: delete first match order
:width: 600px
:align: center
```

To find the node with the specified data, we can traverse the linked list using a `Node*` named `current`. If `current` stops at the node with the specified data, we can delete it, **but** we won't be able to go back to the previous node, and link it's next to the next of the node we want to delete. To solve this problem, we can make `current` stop at the node before the node we want to delete.

Given that `current` stopped at the node before the node we want to delete, and we were to delete the `current->next` node, we **won't** be able to access `current->next->next`, since `current->next` is freed. To solve this problem, we can store the address of the next node after `current` in a `Node*` named `temp`. Then, first link `current->next` to `temp->next`, then delete the node pointed to by `temp`. We can't link `current->next` to `temp->next` if we deleted/freed `temp` first, since we won't be able to access the `next` of the freed node `temp`. 

This means that the order of steps is crucial. We should do the steps in the following order: 
1. Store the address of `current->next` in `temp`
2. Connect `current->next` to `temp->next`
3. `free` the node pointed to by `temp`

The steps are illustrated in the following figure:

```{figure} ./images/deleteFirstMatch-image.png
:alt: delete first match image
:width: 600px
:align: center
```

We can write a function named `deleteFirstMatch` that takes the `LinkedList*` and the `searchVal` as parameters to implement the steps above. It returns `true` if it found the node and deleted it, and `false` otherwise. A draft is shown below:

```{figure} ./images/deleteFirstMatch-code.png
:alt: delete first match code
:width: 600px
:align: center
```

**Special case 1: What if the node was not found?** If the node was not found, there is a possibility of segmentation fault when checking the while loop condition. `current` will traverse the list till the end `current->next == NULL`, and checking `current->next->data` will cause a segmentation fault. To solve this, we can check `current->next != NULL` before checking the `data` in the next node after current, as we show in line $5$.

```{code-block} c
:linenos:
:emphasize-lines: 5, 10, 11, 20
bool deleteFirstMatch(LinkedList *list, int searchVal) {
  // Search for a node that matches the value, but maintain a pointer to the
  // node just before it.
  Node *current = list->head;
  while (current->next != NULL && current->next->data != searchVal) {
    current = current->next;
  }

  // current now points to a node just before the node that matched, 
  // OR current points to the last node.
  if (current->next != NULL) {
    // current does not point to the last node.
    Node *temp = current->next; // temp is the node we must delete.
    current->next = temp->next; // Update n so that temp is no longer linked.
    free(temp);

    return true;
  }

  return false;
}
```

We exit the loop if `current` is pointing to the node before the node to be deleted, or if current is pointing at the last node and the node with `searchVal` is not found. In the first case, `current->next` is not `NULL`, and `current->next->data` is equal to `searchVal`, we can delete the node at `current->next` as in lines $11$ to $17$. In the second case, `current->next` is `NULL`, the node was not found, and we should return `false` as in line $20$ to indicate that the node was not found.

**Special case 2: What if the node to be deleted is the first node?** The present code starts checking `data` of nodes starting from the second node. If the node to be deleted is the first node, we can call `deleteFront(list)` to delete it. We show this in lines $2$ to $6$.

```{code-block} c
:linenos:
:emphasize-lines: 2 - 6
bool deleteFirstMatch(LinkedList *list, int searchVal) {
  if (list->head->data == searchVal) {
    // The first node matches the value.
    deleteFront(list);
    return true;
  }

  // Search for a node that matches the value, but maintain a pointer to the
  // node just before it.
  Node *current = list->head;
  while (current->next != NULL && current->next->data != searchVal) {
    current = current->next;
  }

  // current now points to a node just before the node that matched, 
  // OR current points to the last node.
  if (current->next != NULL) {
    // current does not point to the last node.
    Node *temp = current->next; // temp is the node we must delete.
    current->next = temp->next; // Update n so that temp is no longer linked.
    free(temp);

    return true;
  }

  return false;
}
```

**Special case 3: What if the linked list is empty?** If the linked list is empty, there is nothing to delete, and we can return `false` as we show in lines $2$ to $5$.

```{code-block} c
:linenos:
:emphasize-lines: 2 - 5
bool deleteFirstMatch(LinkedList *list, int searchVal) {
  if (list->head == NULL) {
    // There is nothing to do in an empty list.
    return false;
  }

  if (list->head->data == searchVal) {
    // The first node matches the value.

    deleteFront(list);
    return true;
  }

  // Search for a node that matches the value, but maintain a pointer to the
  // node just before it.
  Node *current = list->head;
  while (current->next != NULL && current->next->data != searchVal) {
    current = current->next;
  }

  // current now points to a node just before the node that matched, 
  // OR current points to the last node.
  if (current->next != NULL) {
    // current does not point to the last node.
    Node *temp = current->next; // temp is the node we must delete.
    current->next = temp->next; // Update n so that temp is no longer linked.
    free(temp);

    return true;
  }

  return false;
}
```

**Special case 4: What if the node to be deleted is the last node?** `current` will point to the second last node before the node to be deleted. In this case, our code will perfectly work to delete the last node by freeing `temp` and setting `current->next` to `NULL`.


Download {download}`deleteFirstMatch.c <../../code/chapter13/deleteFirstMatch/deleteFirstMatch.c>` if you want to play with the code we developed for `deleteFirstMatch` function.

## Delete all matching nodes with `data` = `searchVal`

In the previous section, we deleted only the first matching node in a linked list. In this section, we develop a function that deletes all the nodes in a linked list that have `data` equal to `searchVal`.

The steps to do so include:
1. Delete first match of `searchVal` using `deleteFirstMatch` function
2. Repeat 1 till there is no more matches

How can we check for the condition of no more matches? We can use a `while` loop that checks if `deleteFirstMatch` returns `true` or `false`. If it returns `true`, it means that a node was deleted, and we should repeat the process. If it returns `false`, it means that no node was deleted, and we should exit the loop.

In the body of the loop, we can increment a counter than counts the number of matches deleted. The following code shows the implementation of `deleteAllMatches` function.

```{code-block} c
int deleteAllMatches(LinkedList *list, int value) {
  int numDeleted = 0;

  while (deleteFirstMatch(list, value)) {
    numDeleted++;
  }

  return numDeleted;
}
```

{{quiz_embed | replace("%%FILENAME%%", "chapter-13/sec-4") }}