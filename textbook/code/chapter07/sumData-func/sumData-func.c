#include <stdio.h>

int sumData(int[], int);
// OR int sumData(int*, int);

int main(void) {
  const int size = 3;
  int x[size] = {1, 7, 3};
  int result = sumData(x, size);
  printf("Sum of elements in the array: %d.\n", result);
  return 0;
}

int sumData(int list[], int size) {
  // OR int sumData(int *list, int size) {
  int sum = 0;
  for (int index = 0; index < size; index++) {
    sum = sum + list[index];
    // OR sum = sum + *(list + index);
  }
  return sum;
}
