#include <stdio.h>

void printArray(int list[], int listLength);
void swap(int *x, int *y);
void selectionSort(int list[], int listLength);

int main(void) {
  int list[] = {9, 5, 18, 8, 5, 2};
  selectionSort(list, 6);
  printArray(list, 6);
}

void swap(int *x, int *y) {
  int temp = *x;
  *x = *y;
  *y = temp;
}

void selectionSort(int list[], int n) {
  for (int top = n - 1; top > 0; top--) {
    // find largest from 0 to top
    int indexOfLargest = 0;
    for (int i = 1; i <= top; i++) {
      if (list[i] > list[indexOfLargest]) {
        indexOfLargest = i;
      }
    }
    // put largest at top
    swap(&list[indexOfLargest], &list[top]);
    printf("After iteration %d: ", n - top);
    printArray(list, 6);
  }
}

void printArray(int list[], int listLength) {
  for (int i = 0; i < listLength; i++) {
    printf("%d ", list[i]);
  }
  printf("\n");
}
