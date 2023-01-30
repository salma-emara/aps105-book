#include <stdio.h>

int main(void) {
  int x = 3, y = 4;
  int *a, *b;

  a = &x;
  b = &y;
  printf("Before operations:\n");
  printf("Value of x: %d\n", x);
  printf("Value of y: %d\n", y);
  printf("Value at address a: %d\n", *a);
  printf("Value at address b: %d\n", *b);

  *a = 6;
  *b = *b + 3;
  printf("After operations:\n");
  printf("Value of x: %d\n", x);
  printf("Value of y: %d\n", y);
  printf("Value at address a: %d\n", *a);
  printf("Value at address b: %d\n", *b);
  return 0;
}
