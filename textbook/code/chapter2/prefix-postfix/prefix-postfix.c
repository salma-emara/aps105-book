#include <stdio.h>
int main() {
  int i = 1, j = 31;
  j = ++i;  // Equivalent to j = i = i + 1
  printf("With prefix: i = %d, j = %d\n", i, j);

  i = 1, j = 31;
  j = i++;  // Equivalent to j = i; i = i + 1;
  printf("With postfix: i = %d, j = %d\n", i, j);
  return 0;
}
