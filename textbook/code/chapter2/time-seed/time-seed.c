#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
  srand(time(NULL));
  printf("Random number 1: %d\n", rand());
  printf("Random number 2: %d\n", rand());
  return 0;
}
