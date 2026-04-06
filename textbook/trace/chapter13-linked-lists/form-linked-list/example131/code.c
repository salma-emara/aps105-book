#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int data;
    struct node *next;
} Node;

int main(void) {
    Node *head;
    Node *newNode = (Node *)malloc(sizeof(Node));
    newNode->data = 1;
    newNode->next = NULL;

    head = newNode;

    newNode = (Node *)malloc(sizeof(Node));
    newNode->data = 2;
    newNode->next = NULL;

    head->next = newNode;

    printf("%d -> ", head->data);
    printf("%d", head->next->data);

    free(head->next);
    free(head);

    return 0;
}
