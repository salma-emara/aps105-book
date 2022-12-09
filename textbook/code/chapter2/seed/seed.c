#include <stdio.h>
#include <stdlib.h>

int main() {
  srand(1);
  printf("Random number 1: %d\n", rand());
  printf("Random number 2: %d\n", rand());
  printf("Random number 3: %d\n", rand());
  srand(1);
  printf("Random number 4: %d\n", rand());
  srand(1);
  printf("Random number 5: %d\n", rand());
  printf("Random number 6: %d\n", rand());
  srand(1);
  printf("Random number 7: %d\n", rand());
  printf("Random number 8: %d\n", rand());
  printf("Random number 9: %d\n", rand());
  return 0;
}
