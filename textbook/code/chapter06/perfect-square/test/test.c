#include <stdio.h>

int main(void) {
  int x = 7;

  int *p;

  p = &x;

  int y;

  y = *p;

  return 0;
}