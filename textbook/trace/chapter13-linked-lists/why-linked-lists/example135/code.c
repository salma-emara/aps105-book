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

      printf("%d -> ", head->data);

      free(head);
	  
	  // hohohohoho
	  
      return 0;
  }
