#include <stdio.h>

int main() {
  int i = 1, j = 3, k = 10;
  i = j = k;  // first the value of k is assigned to j,
              // then the value of j is assigned to i
  printf("i = %d, j = %d, k = %d\n", i, j, k);
  return 0;
}
