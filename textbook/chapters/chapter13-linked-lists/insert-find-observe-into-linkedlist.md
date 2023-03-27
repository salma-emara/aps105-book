# Insert nodes into a linked list

In this section, we will discuss how to insert nodes into a linked list. We will discuss how to insert a node at the beginning of the list, at the end of the list, and in the middle of the list.

## Preliminaries

Before we implement any functions, let's recap the data structure we will be using. We will be using the following `Node` structure:

```{code-block} c
typedef struct node {
  int data;
  struct node *next;
} Node;
```

## Create a node in the linked list

In the previous section, we discussed how to create a linked list. Before inserting any node, we had to dynamically allocate it first. We can do so by using the `malloc` function. The `malloc` function takes in the size of the memory space we want to allocate, and returns a pointer to the memory space. We can then assign the pointer to a pointer variable of type `Node`. 

```{admonition} malloc returning NULL
:class: note
If `malloc` returns `NULL`, it means that it was unable to allocate memory. This can happen if the program is running out of memory. Hence, we should check if the pointer returned from `malloc` is `NULL` before we use it. If it is `NULL`, we should return `NULL` from the function.

If we use it anyway, we will get a segmentation fault. Segmentation fault is a common error that occurs when we try to access memory that we are not allowed to access. This can happen if we try to access memory that is not allocated to us, or if we try to access memory that has been freed. For example, if `newNode` is `NULL`, and we do `newNode->data = 1`, it will cause segmentation fault, since `newNode` is not pointing to any memory space.
```

```{figure} ./images/createNode-func.png
:alt: createNode function
:width: 600px
:align: center
```

We can use `createNode` to form the following linked list:

```{figure} ./images/creaNode-example-linkedlist.png
:alt: createNode linked list
:width: 600px
:align: center
```

Download the following code {download}`createNode-example.c <../../code/chapter13/createNode-example/createNode-example.c>` if you want to play with it.

**Code**
```{figure} ./images/use-createNode.png
:alt: use createNode
:width: 600px
:align: center
```
**Output**
<pre>
1 -> 2 -> 4 -> 7.
</pre>

In line $14$, we call `createNode` which returns a pointer to a newly dynamically allocated `Node` with data set to `1`. We then assign the address of this `Node` to head.

In line $16$, we call `createNode` again, which returns a pointer to a newly dynamically allocated `Node` with data set to `2`. The **mistake** is to set the address of the newly allocated `Node` to `head`. The problem is that no other pointer will have the address of the `Node` with data set to `1`. This is a memory leak, since we can never access that previously allocated node.

Instead, in line $17$, we can call `createNode` again, which returns a pointer to a newly dynamically allocated `Node` with data set to `2`. We then set the `next` pointer of the `head` to point to this newly allocated `Node`, *e.g.* `head->next = createNode(2);`. This way, we link the two nodes together, where `head` is pointing to the first node, and `head->next` is pointing to the second node.

In line $19$, we call `createNode` again, which returns a pointer to a newly dynamically allocated `Node` with data set to `4`. We then set the `next` pointer of the second node `head->next` to point to this newly allocated `Node`, *e.g.* `head->next->next = createNode(4);`. This way, we link the three nodes together, where `head` is pointing to the first node, `head->next` is pointing to the second node, and `head->next->next` is pointing to the third node.

In line $20$, we call `createNode` again, and set its return value to `head->next->next->next` to link the four nodes together.

**Note:** Of course the above code is missing the `free` statements to free the memory allocated to the nodes. We will discuss this in the next section.

```{admonition} Too many ->next
:class: note   
It can be confusing to keep track of `->next` numbers in a statement. Instead, we use different functions to insert nodes at the beginning, end, and middle of the list.
``` 

## Inserting a node at the beginning/front of the list

To insert a node at the beginning of the list, we need to create a new node, and set its `next` pointer to point to the current head. We then set the head to point to the newly created node. The steps are illustrated in the following figure.

```{figure} ./images/insertAtFront-example.png
:alt: insertAtFront example
:width: 600px
:align: center
```

We can implement a function to insert a node at the front of the list. The function can take the head of the list and the data of the node to be inserted as parameters. The function will return a `bool` that is `true` if the node was successfully inserted, `false` otherwise. The following figure illustrates the function and draws the changes to the linked list at each step.

**Errorneous Code**
```{figure} ./images/insertAtFront-by-value.png
:alt: insertAtFront by value
:width: 600px
:align: center
```

````{admonition} Issues with passing head by value
:class: warning
In the above code, we pass `head` by value, and `head` becomes a local variable holding the address of the first node of the list in `insertAtFront` function. Even if we change the value of `head` in `insertAtFront`, it will only change in `insertAtFront` function. It will not change the value of `head` in `main` function. Hence, the linked list will not be changed.

The following figure shows how `head` gets changed in `insertAtFront` function, but not the `main` function.

```{figure} ./images/issue-of-pass-by-value.png
:alt: issue of pass by value
:width: 600px
:align: center
```
````

### Solution 1: Pass pointer to head

To fix this issue, we can pass a pointer to `head` to `insertAtFront` function. The following figure shows how we can pass `head` as a pointer.

```{code-block} c
:linenos:
:emphasize-lines: 1, 6, 7, 15
bool insertAtFront(Node **headPtr, int value) {
  Node *temp = createNode(value);
  if (temp == NULL) {
    return false;
  }
  temp->next = *headPtr;
  *headPtr = temp;
  return true;
}

int main(void) {
  Node *head = createNode(1);
  head->next = createNode(2);

  insertAtFront(&head, 0);

  return 0;
}
```

In line $1$, we receive a pointer to `Node* head` variable. This is a double pointer, hence the type is `Node**`. We can use this pointer to change the value of `head` in `main` function.

In line $6$, we set `temp->next` to point to the current head. The current head is pointed to by `Node** headPtr`. We can dereference `headPtr` to get to the current head in the `main` function. Hence, we set `temp->next =  *headPtr;`. 

In line $7$, we change the `head` in `main` function to point to the newly created node pointed to by `temp`. We can dereference `headPtr` to get to the current head in the `main` function. Hence, we set `*headPtr = temp;`.

In line $15$, we call `insertAtFront` function to insert a node with data set to `0` at the beginning of the list. We pass the address of `head` to `insertAtFront` function as `&head`. Hence, `headPtr` in `insertAtFront` function will point to `head` in `main` function. We can then change the value of `head` in `main` function.

The following figure illustrated the value of variables in `main` function before and after calling `insertAtFront` function.


```{figure} ./images/double-pointer-head.png
:alt: double pointer head
:width: 600px
:align: center
```

### Solution 2: Create a new data structure

Since double pointers can be confusing to deal with, we can create a new data structure to hold the head of the list. Then, pass a pointer to the data structure if we want to change the head. 

Let's first discuss how does the new data structure look like. It looks as follows:

```{code-block} c
typedef struct list {
  Node* head;
} LinkedList;
```

We can then create a new data structure in `main` function. The following figure shows how we can create a new data structure in `main` function.

**Code**
```{figure} ./images/linkedlist-data-struct-example.png
:alt: linkedlist data struct example
:width: 600px
:align: center
```

We can then pass a pointer to the data structure `LinkedList` to the `insertAtFront` function. This serves as a pointer to the `Node* head` pointer holding the address of the first node in the list. The following figure shows how we can pass a pointer to the data structure `LinkedList` to the `insertAtFront` function.

**Code snippet**
```{figure} ./images/linkedlist-data-struct-insertAtFront.png
:alt: linkedlist data struct insertAtFront
:width: 500px
:align: center
```

## Print the linked list to check if the node was inserted

We can print the linked list to check if the node was inserted. 

We start with a pointer named `Node* current` pointing at the first node in the list. Then print `current->data`, and traverse to the next node by setting `current` to `current->next`. This can continue till `current` is `NULL`. This is when `current` reached the end of the list. The following figure shows how we can traverse the list to print the linked list.

```{figure} ./images/traverse-LinkedList.png
:alt: traverse LinkedList
:width: 600px
:align: center
```

To implement the function that prints the data in the linked list, we can take `LinkedList *list` as input, and return `void`, since we are just printing. 

**Code snippet**
```{code-block} c
void printList(LinkedList *list) {
  Node *current = list->head;

  while (current != NULL) {
    // Print out the data at this element.
    printf("%d ->", current->data);
    // Move to the next element in the list.
    current = current->next;
  }
}
```

To fully test the function, we can create a linked list with 3 nodes, and print the linked list. The following code shows how we can create a linked list with 3 nodes, and print the linked list. Download {download}`insertAtFront.c <../../code/chapter13/insertAtFront/insertAtFront.c>` if you want to play with the code.

```{code-block} c
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

typedef struct node {
  int data;
  struct node *next;
} Node;

typedef struct list {
  Node *head;
} LinkedList;

Node *createNode(int value);
bool insertAtFront(LinkedList *list, int value);
void printList(LinkedList *list);

int main(void) {
  LinkedList list;
  list.head = createNode(1);
  (list.head)->next = createNode(2);
  insertAtFront(&list, 0);
  printList(&list);
  return 0;
}

bool insertAtFront(LinkedList *list, int value) {
  Node *temp = createNode(value);
  if (temp == NULL) {
    return false;
  }
  temp->next = list->head;
  list->head = temp;
  return true;
}

void printList(LinkedList *list) {
  Node *current = list->head;

  while (current != NULL) {
    // Print out the data at this element.
    printf("%d ->", current->data);
    // Move to the next element in the list.
    current = current->next;
  }
}

Node *createNode(int value) {
  Node *newNode = (Node *)malloc(sizeof(Node));

  if (newNode != NULL) {
    newNode->data = value;
    newNode->next = NULL;
  }

  return newNode;
}
```
**Output**
<pre>
0 ->1 ->2 ->
</pre>

## Insert a node at the end of the linked list

If we want to insert a node at the end of the linked list, we have to traverse till the last node, and insert the new node at the next of the last node. The following figure shows how we can insert a node at the end of the linked list.

```{figure} ./images/insertAtBack-traversal.png
:alt: insertAtBack traversal
:width: 600px
:align: center
```

To implement the function that inserts a node at the end of the linked list, we can take `LinkedList *list` and `int value` as input, and return `bool`, while is `true` if the node with `data` equal `value` was inserted successfully, and `false` otherwise. In the function, we will traverse the linked list with a `Node*` pointer named `current` and stop when `current->next` is equal to `NULL`. This is when `current` reached the end of the list. Then, we can insert the new node at the next of `current`. The following figure shows how we can implement the function that inserts a node at the end of the linked list.

**Missing a case: Code snippet**
```{figure} ./images/insertAtBack-func-1.png
:alt: insertAtBack func 1
:width: 600px
:align: center
```

However, the figure above is missing one case. What if the linked list is empty? `current` will be `NULL`, and we will get segmentation fault if we do `current->next`. Hence, before checking the next of `current`, if `current` was `NULL`, we just make `list->head` point to that new node. The following code shows how we can handle the case when the linked list is empty.

**Code**
```{code-block} c
:linenos:
:emphasize-lines: 8 - 12
bool insertAtBack(LinkedList *list, int value) {
  Node *temp = createNode(value);
  if (temp == NULL) {
    return false;
  }
  Node *current = list->head;

  if (current == NULL) {
    // The list is empty, there is no difference between back/front.
    list->head = temp;
    return true;
  }

  // Traverse the list until we reach the last element.
  while (current->next != NULL) {
    current = current->next;
  }

  // current now points to the last element of the list.
  current->next = temp;  // Add a new node to the end.
  return true;
}
```

In line $8$ to $12$, we handle the case if the list was empty. If the list was empty, we just make `list->head` point to the new node. 

In-progress!