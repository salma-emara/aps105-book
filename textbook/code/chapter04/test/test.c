#include <stdio.h>

int main(void) {
  for (int i = 1, j = 7; i <= 10; printf("7 * %d = %d\n", i, j), i += 1, j += 7)
    ;
  return 0;
}
