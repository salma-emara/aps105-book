#include <stdio.h>

int main() {
  int var;
  printf("Value of uninitialized variable \"var\": %d\n", var);
  int var2 = 0;
  printf("Value of initialized variable \"var\": %d\n", var2);
  return 0;
}
