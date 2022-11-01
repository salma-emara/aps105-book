#include <stdio.h>

int main(void) {
  int numPizzas, numSlices;
  printf("How many pizzas do you have?\n");
  scanf("%d", &numPizzas);
  numSlices = numPizzas * 8;
  printf("You have %d slices in %d pizza.\n", numSlices, numPizzas);
  return 0;
}
