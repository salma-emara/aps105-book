#include <stdio.h>

int main(void) {
  int num;

  do {
    printf("Please enter a number between 1 and 10 (inclusive): ");
    scanf("%d", &num);
  } while (num < 1 || num > 10);

  printf("The number entered is %d.\n", num);
  return 0;
}
