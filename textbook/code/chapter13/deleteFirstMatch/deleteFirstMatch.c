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
void deleteFront(LinkedList *list);
bool deleteFirstMatch(LinkedList *list, int value);

int main(void) {
  LinkedList list;
  list.head = createNode(1);
  (list.head)->next = createNode(2);
  insertAtBack(&list, 3);
  insertAtBack(&list, 4);
  printList(&list);
  deleteFirstMatch(&list, 3);
  printf("\nAfter deleting a node with 3: ");
  printList(&list);
  return 0;
}

bool deleteFirstMatch(LinkedList *list, int value) {
  if (list->head == NULL) {
    // There is nothing to do in an empty list.
    return false;
  }

  if (list->head->data == value) {
    // The first node matches the value.

    deleteFront(list);
    return true;
  }

  // Search for a node that matches the value, but maintain a pointer to the
  // node just before it.
  Node *current = list->head;
  while (current->next != NULL && current->next->data != value) {
    current = current->next;
  }

  // current now points to a node just before the node that matched, OR current
  // points to the last node.
  if (current->next != NULL) {
    // current does not point to the last node.
    Node *temp = current->next;  // temp is the node we must delete.
    current->next = temp->next;  // Update n so that temp is no longer linked.
    free(temp);

    return true;
  }

  return false;
}

void deleteFront(LinkedList *list) {
  if (list->head == NULL) {
    // The list is empty, there is nothing to delete.
    return;
  }

  // Save the location of the node after head. Could be NULL, that's okay
  Node *newHead = list->head->next;
  // Free up the memory used by the current head.
  free(list->head);
  // Update the current head to the saved location.
  list->head = newHead;
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
