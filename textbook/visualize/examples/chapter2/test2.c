#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int data;
    struct node *next;
} Node;

Node *createNode(int value);

int main(void) {
    Node *head = NULL;

    head = createNode(1);
    head->next = createNode(2);
    head->next->next = createNode(4);
    head->next->next->next = createNode(7);

    printf("%d -> ", head->data);
    printf("%d -> ", head->next->data);
    printf("%d -> ", head->next->next->data);
    printf("%d.\n", head->next->next->next->data);

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
