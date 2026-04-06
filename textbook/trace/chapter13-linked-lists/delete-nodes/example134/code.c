#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int data;
    struct node *next;
} Node;

typedef struct {
    Node *head;
} LinkedList;

Node *createNode(int value);
void deleteFront(LinkedList *list);

int main(void) {
    LinkedList list;
    list.head = NULL;

    list.head = createNode(1);
    list.head->next = createNode(2);
    list.head->next->next = createNode(4);

    deleteFront(&list);

    return 0;
}

Node *createNode(int value) {
    Node *newNode = (Node *)malloc(sizeof(Node));

    if (newNode != NULL) {
        newNode->data = value;
        newNode->next = NULL;
    }

    return newNode;
}

void deleteFront(LinkedList *list) {
    if (list->head == NULL) {
        return;
    }

    Node *newHead = list->head->next;
    free(list->head);
    list->head = newHead;
}
