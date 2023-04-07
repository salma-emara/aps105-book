#include <stdio.h>

void insertionSort(int list[], int listLength);
void printArray(int list[], int listLength);

int main(void) {
  int list[] = {9, 2, 6, 5, 1, 7};

  insertionSort(list, 6);
  printArray(list, 6);

  return 0;
}

void insertionSort(int list[], int listLength) {
  int top;

  for (top = 1; top < listLength; top++) {
    int item = list[top];
    int ind = top;

    while (ind > 0 && item < list[ind - 1]) {
      list[ind] = list[ind - 1];  // shift data to the right to make space
      ind--;
    }

    list[ind] = item;
    printf("After iteration %d: ", top);
    printArray(list, listLength);
  }
}

void printArray(int list[], int listLength) {
  for (int i = 0; i < listLength; i++) {
    printf("%d ", list[i]);
  }
  printf("\n");
}
