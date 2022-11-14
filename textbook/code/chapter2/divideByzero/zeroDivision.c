#include <stdio.h>

int main(void) {
  printf("Integer 0 division %d\n", 3 % 0);
  printf("Floating point zero division %lf\n", 3.0 / 0);
  return 0;
}
