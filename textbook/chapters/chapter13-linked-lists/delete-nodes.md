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
:alt: deleteAtFront-image
:width: 600px
:align: center
```


To implement this function, we don't need to return anything, and we only pass the `LinkedList*`. We can do the following:

**Code**
```{figure} ./images/deleteAtFront-code.png
:alt: deleteAtFront-code
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
:alt: deleteBack-image
:width: 600px
:align: center

Illustration of deleting the last node in a linked list. **Step 1** is to find the second last node. **Step 2** is to free the space allocated for the last node. **Step 3** is to set the next of the second last node to `NULL` making it the last node.
```

To implement this function, we don't need to return anything, and we only pass the `LinkedList*`. To identify the last node, we previously said that if `current->next == NULL`, then `current` is pointing at the last node. If `current->next->next == NULL`, then `current` is pointing at the second last node. We can do the following to delete the last node in the list:

**Code**
```{figure} ./images/deleteBack-code.png
:alt: deleteBack-code
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

To delete all nodes in the linked list, we need to call deleteFront (or deleteBack) until the list is empty. 

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

In-progress!

## Delete all matching nodes with `data` = `searchVal`


In-progress!