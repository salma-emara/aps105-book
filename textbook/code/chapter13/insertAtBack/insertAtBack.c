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
bool insertAtBack(LinkedList *list, int value);
void printList(LinkedList *list);

int main(void) {
  LinkedList list;
  list.head = createNode(1);
  (list.head)->next = createNode(2);
  insertAtFront(&list, 0);
  printList(&list);
  return 0;
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
    // OR return insertAtFront(list, value);
  }

  // Traverse the list until we reach the last element.
  while (current->next != NULL) {
    current = current->next;
  }

  // current now points to the last element of the list.
  current->next = temp;  // Add a new node to the end.
  return true;
}