#include <stdio.h>

void swap(int[], int, int);
void printArray(int[], const int);

int main(void) {
  const int size = 5;
  int x[size] = {3, 5, 8, 1, 7};
  printf("Before swapping: ");
  printArray(x, size);
  swap(x, 0, 4);
  printf("After swapping: ");
  printArray(x, size);
  return 0;
}

void swap(int list[], int i, int j) {
  int temp = list[i];
  list[i] = list[j];
  list[j] = temp;
}

void printArray(int list[], const int size) {
  for (int index = 0; index < size; index++) {
    printf("%d ", list[index]);
  }
  printf("\n");
}
