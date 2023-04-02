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
bool insertIntoOrderedList(LinkedList *orderedList, int value);
Node *findFirstNode(LinkedList *list, int value);

int main(void) {
  LinkedList list;
  list.head = createNode(1);
  (list.head)->next = createNode(4);
  insertIntoOrderedList(&list, 3);
  printList(&list);
    if(findFirstNode(&list, 3)!=NULL){
        printf("\nFound node with data: %d!\n", findFirstNode(&list, 3)->data);
    }
  return 0;
}

Node *findFirstNode(LinkedList *list, int value) {
  Node *current = list->head;

  while (current != NULL) {
    if (current->data == value) {
      // Found the node.
      return current;
    }

    // Did not find the node.
    // Move to the next element in the list.
    current = current->next;
  }

  // Did not find the node in the entire list.
  return NULL;
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

bool insertAtFront(LinkedList *list, int value) {
  Node *temp = createNode(value);
  if (temp == NULL) {
    return false;
  }
  temp->next = list->head;
  list->head = temp;
  return true;
}

bool insertIntoOrderedList(LinkedList *orderedList, int value) {
  Node *current = orderedList->head;
  if (current == NULL) {
    // The list is empty, insertion at front/back is the same thing.
    return insertAtFront(orderedList, value);
  }

  if (current->data > value) {
    // The value to insert comes before the current head, so insert before it.
    return insertAtFront(orderedList, value);
  }

  while (current->next != NULL && value > current->next->data) {
    // The value to insert is larger than the next element in the list.
    // Move to the next element in the list.
    current = current->next;
  }

  Node *newNode = createNode(value);
  if (newNode == NULL) {
    // Could not allocate memory for a new node.
    return false;
  }

  // current may be the last element in the list, and it may also be the last
  // element in an ordered list that is less than value.

  // Link the rest of the list with this new node.
  newNode->next = current->next;
  current->next = newNode;  // Overwrite next with the new node.

  return true;
}

