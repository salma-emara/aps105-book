#include <stdbool.h>
#include <stdio.h>

void bubbleSort(int list[], int n);
void printArray(int list[], int n);
void swap(int *x, int *y);

int main(void) {
  int list[4] = {2, 5, 3, 1};

  bubbleSort(list, 4);
  printArray(list, 4);
  return 0;
}

void printArray(int list[], int n) {
  for (int i = 0; i < n; i++) {
    printf("%d ", list[i]);
  }
  printf("\n");
}

void bubbleSort(int list[], int n) {
  bool sorted = false;

  for (int top = n - 1; top > 0 && !sorted; top--) {
    sorted = true;
    for (int i = 0; i < top; i++) {
      if (list[i] > list[i + 1]) {
        swap(&list[i], &list[i + 1]);
        sorted = false;
      }
    }
    printf("After iteration %d: ", n - top);
    printArray(list, n);
  }
}

void swap(int *x, int *y) {
  int temp = *x;
  *x = *y;
  *y = temp;
}
