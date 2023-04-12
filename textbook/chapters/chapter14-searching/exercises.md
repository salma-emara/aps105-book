# Exercises

Many of these exercises are taken from past exams of APS105 Computer Fundamentals courses at University of Toronto. The solutions are provided in the answer boxes.

Headings in this page classify the exercises into different categories: **[Easy]**, **[Intermediate]**, and **[Challenging]**. I suggest you start by easy exercises and work your way up to the challenging ones.

**Question 5 in Winter 2018 [Easy]**

Complete the following C program by inserting the condition of the while loop in the function `search`. The function is designed to search for an int-type item, called `key`, in a linked list, pointed to by head. 

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
typedef struct node {
  int data;
  struct node *link;
} Node;

Node *search(Node *head, int key) {
  Node *current = head;
  // insert your code in the line below between the parentheses
  while (current != NULL && current->data != key) {
    current = current->link;
  }
  return current;
}
```
````

**Question 1.7 in Fall 2011 [Easy]**

Your task is to complete the function below so that it contains a non-recursive implementation of the binary search algorithm. The parameter `values` is an array of `int` type variables. The items in the values array have been sorted into descending (non-ascending) order. Parameter `n` is the number of elements in the `values` array. Parameter `item` is the item being searched for in the values array.

The function should return -1 if `item` is not found in the array. Otherwise, the function should return the index position within the array at which `item` is found.

**Important:** your function should assume that `values` is a sorted array in descending (non-ascending) order.

**Important:** Your solution must **not** use recursion.

```{code-block} c
int binSearch(int values[], int n, int item) {
  int left = 0;
  int right = n - 1;
  while (left <= right) {
    int middle = (left + right) / 2;
    if (item == values[middle]) return middle;
    // WRITE YOUR CODE HERE:
    




  }
}
```

````{admonition} Answer
:class: dropdown
```{code-block} c
int binSearch(int values[], int n, int item) {
  int left = 0;
  int right = n - 1;
  while (left <= right) {
    int middle = (left + right) / 2;
    if (item == values[middle]) return middle;
    // SOLUTION:
    if (item < values[middle])
      left = middle + 1;
    else
      right = middle - 1;
  }
}
```
````