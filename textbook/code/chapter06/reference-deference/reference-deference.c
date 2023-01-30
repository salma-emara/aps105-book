#include <stdio.h>

int main(void) {
  int x = 7;
  int *p;
  p = &x;
  int y;
  y = *p;

  printf("Address of x: %p\n Value of x: %d\n", &x, x);
  printf("Address of p: %p\n Value of p: %p\n", &p, p);
  printf("Address of y: %p\n Value of y: %d\n", &y, y);
  printf("Value stored in address %p is %d\n", p, *p);

  return 0;
}