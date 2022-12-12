#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void) {
  srand(time(NULL));

  printf("Dice roll is %d\n", rand() % 6 + 1);

  return 0;
}
