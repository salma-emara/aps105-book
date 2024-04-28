# Exercises

Many of these exercises are taken from past exams of APS105 Computer Fundamentals courses at University of Toronto. The solutions are provided in the answer boxes.

Headings in this page classify the exercises into different categories: **[Easy]**, **[Intermediate]**, and **[Challenging]**. I suggest you start by easy exercises and work your way up to the challenging ones.

**Question 5 in Winter 2018 Final Exam [Easy]**

Complete the following C program, designed to search for an int-type item, called `key`, in a linked list, pointed to by `head`.
```{code-block} c
typedef struct node {
  int data;
  struct node *link;
} Node;

Node *search(Node *head, int key) {
  Node *current = head;
  // insert your code in the line below between the parentheses
  while (                                          ) {
    current = current->link;
  }

  return current;
}
```

````{admonition} Answer
:class: dropdown
```{code-block} c
:linenos:
:emphasize-lines: 9
typedef struct node {
  int data;
  struct node *link;
} Node;

Node *search(Node *head, int key) {
  Node *current = head;

  while (current != NULL && current->data != key) {
    current = current->link;
  }

  return current;
}
```
````

**Question 6 in Winter 2016 Final Exam [Easy]**

Consider the following code, where head points to the head of a linked list:
```{code-block} c
typedef struct node {
  int value;
  struct node *link;
} Node;

Node *head;
```

Complete the following C function that returns a pointer to the node that precedes (comes before) `searchNode`, if it is found in the linked list. If `searchNode` is not found or the linked list is empty, the function should return `NULL`. Read the function carefully: you may need to add code
in several locations.

```{code-block} c
Node *predecessor(Node *head, Node *searchNode) {
  Node *current;
  current = head;
  if (head == searchNode) return NULL;
  // COMPLETE THE NEXT LINE:
  while (                                          ) {
    if (current->link == searchNode) return current;
    // WRITE CODE HERE:
  }
  return NULL;
}
```
    
````{admonition} Answer
:class: dropdown
```{code-block} c

Node *predecessor(Node *head, Node *searchNode) {
  Node *current;
  current = head;
  if (head == searchNode) {
    return NULL;
  }
  while (current != NULL) {
    if (current->link == searchNode) {
      return current;
    }
    // write your code HERE:
    current = current->link;
  }
  return NULL;
}

```
````

**Question 13 in Winter 2018 Final Exam [Intermediate]**

The following C structure is used to define each node in a linked list:
```{code-block} c
typedef struct node {
  int data;
  struct node *link;
} Node;
```

Write a C function called `printDuplicates` that receives a pointer to the first node (`head`) of a linked list as a parameter. The function should find and print the duplicate integers in the linked list. For
example, if the linked list contains the integers $6$, $3$, $3$, $6$, $7$, $4$, then the `printDuplicates()` function should print:
<pre>
6
3
</pre>

**Note:** In your solution, you may assume that a given integer occurs at most twice in the linked list.

```{code-block} c
void printDuplicates(Node *head) {
    // insert your code here
}
```

````{admonition} Answer
:class: dropdown
```{code-block} c

void printDuplicates(Node *head) {
  Node *current = head;

  while (current != NULL) {
    Node *runner = current->next;

    while (runner != NULL) {
      if (current->data == runner->data) {
        printf("%d\n", current->data);
      }

      runner = runner->next;
    }

    current = current->next;
  }
}
```
````

**Question 12 in Winter 2016 Final Exam [Intermediate]**

The following C structure is used to define each node in a linked list:
```{code-block} c
typedef struct node {
  int value;
  struct node* link;
} Node;
```
Assume that nodes in the linked list are maintained in order of their values, such that the value
stored in each node is greater than or equal to the value in predecessor nodes. Write a C function:

```{code-block} c
void simplify(Node *head)
```

that deletes any duplicate items in the linked list. The parameter head is a pointer to the head node of a linked list. Note that the head node of the linked list will remain unchanged after the deletions are made. For example, if before calling simplify, the linked list contains:

<pre>
13 13 15 15 17 17 17 19 22 25 25 28
</pre>

then after calling the function, the list should contain:

<pre>
13 15 17 19 22 25 28
</pre>


````{admonition} Answer
:class: dropdown
```{code-block} c
void simplify(Node *head) {
  Node *current;
  current = head;
  if (current == NULL) {
    return;
  }
  while (current->link != NULL) {
    if (current->value == current->link->value) {
      Node *nodeToRemove = current->link;
      current->link = current->link->link;
      free(nodeToRemove);
    } else
      current = current->link;
  }
}
```
````

**Question 14 in Winter 2017 Final Exam [Challenging]**

The following C structure is used to define each node in a linked list:
```{code-block} c
typedef struct node {
  int data;
  struct node *next;
} Node;
```

Write a C function, called `buildJoinedList`, that takes two linked lists called `firstList` and `secondList` as its parameters, and returns a new list that joins the two lists, with `secondList` at the front. Both `firstList` and `secondList` are pointers to the first node of a linked list. The function should return a pointer to a new list that is dynamically allocated.

Note that the existing linked lists pointed to by `firstList` and `secondList` must not be modified in any way.

An example of how the function should work is as follows: if `firstList` points to a linked list containing nodes storing the numbers $1$, $2$, $3$, $4$, $5$ and `secondList` containing the numbers $6$, $7$, $8$, $9$, $10$, then the newly created list returned by the `buildJoinedList` function
should contain nodes storing the numbers $6$, $7$, $8$, $9$, $10$, $1$, $2$, $3$, $4$, $5$.

```{code-block} c
Node *buildJoinedList(Node *firstList, Node *secondList) {
    // insert your code here
}
```

````{admonition} Answer
:class: dropdown
```{code-block} c
Node *newNode(int newValue, Node *link) {
  Node *newNode;
  Node *node = (Node *)malloc(sizeof(Node));
  if (node != NULL) {
    node->data = newValue;
    node->next = link;
  }
  return node;
}
Node *buildJoinedList(Node *firstList, Node *secondList) {
  Node *current = secondList, *head = NULL, *tail = NULL;
  while (current != NULL) {
    if (head == NULL) {
      head = newNode(current->data, NULL);
      tail = head;
      current = current->next;
    } else {
      tail->next = newNode(current->data, NULL);
      tail = tail->next;
      current = current->next;
    }
  }
  current = firstList;
  while (current != NULL) {
    if (head == NULL) {
      head = newNode(current->data, NULL);
      tail = head;
      current = current->next;
    } else {
      tail->next = newNode(current->data, NULL);
      tail = tail->next;
      current = current->next;
    }
  }
  return head;
}
```
````

**Question 14 in Winter 2022 Final Exam [Challenging]**

The `Node` structure in a linked list has been defined as follows:

```{code-block} c
typedef struct node {
  int data;
  struct node *next;
} Node;
```

The `LinkedList` structure has also been defined to contain the `head` of a linked list:

```{code-block} c
typedef struct linkedList {
  Node *head;
} LinkedList;
```

Write a C function called `reorder`, the prototype of which is given below, that reorders the nodes in a linked list such that nodes with a value of $0$ appear at the **front** of the linked list and nodes with any other integer value appear at the end of the linked list, while maintaining the original order of non-zero nodes.

**Example 1:**
<pre>
Input List:        0   0  15   0   0  13  10
Output List:       0   0   0   0  15  13  10
</pre>


**Example 2:**
<pre>
Input List:        1   0  19   0   0   5  0
Output List:       0   0   0   0   1  19  5
</pre>

**Note:** You are not allowed to copy or modify the `data` member in any of the nodes in the linked list. However, you can modify the `next` pointer in the nodes.

````{admonition} Answer
:class: dropdown

**Solution 1:**
```{code-block} c
void reorder(LinkedList *list) {
  Node *tail = list->head, *prev = NULL, *curr = list->head;

  while (tail->next != NULL)  // Find the tail of the list
    tail = tail->next;
  Node *newTail = tail;

  while (curr->data != 0 && curr != tail) {
    newTail->next = curr;
    curr = curr->next;
    newTail->next->next = NULL;
    newTail = newTail->next;
  }

  if (curr->data == 0) {
    list->head = curr;  // Make head to point to first 0
    while (curr != tail) {
      if (curr->data == 0) {
        prev = curr;
        curr = curr->next;
      } else {
        prev->next = curr->next;
        curr->next = NULL;
        newTail->next = curr;
        newTail = curr;
        curr = prev->next;
      }
    }
  } else {
    prev = curr;
  }
  // check if more 0 nodes and end is non-zero
  if (newTail != tail && tail->data != 0) {
    prev->next = tail->next;
    tail->next = NULL;
    newTail->next = tail;
  }
}
```

**Solution 2:**
```{code-block} c
void reorderAlternative(LinkedList *list) {
  Node *current = list->head;
  Node *prev = NULL;
  while (current != NULL) {
    if (current->data == 0) {  // insert at front of list
      if (current == list->head) {
        // traverse and do nothing
        prev = current;
        current = current->next;
      } else { // order is very important
        Node *temp = current;
        prev->next = current->next;  // prev should be as is
        current = current->next;
        temp->next = list->head;
        list->head = temp;
      }
    } else {
      // traverse and do nothing
      prev = current;
      current = current->next;
    }
  }
}
```
````

