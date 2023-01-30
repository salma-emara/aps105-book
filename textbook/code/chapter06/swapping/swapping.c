#include <stdio.h>

void swap(int*, int*);

int main(void) {
  int a = 9, b = 13;
  printf("Before swapping\nValue of a: %d\nValue of b: %d\n", a, b);
  swap(&a, &b);
  printf("After swapping\nValue of a: %d\nValue of b: %d\n", a, b);

  return 0;
}

void swap(int* x, int* y) {
  int temp = *x;
  *x = *y;
  *y = temp;
}
