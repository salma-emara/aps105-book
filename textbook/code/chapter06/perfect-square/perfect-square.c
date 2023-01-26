#include <math.h>
#include <stdbool.h>
#include <stdio.h>

bool isPerfectSquare(int);

int main(void) {
  int num;
  printf("Enter a number: ");
  scanf("%d", &num);

  if (isPerfectSquare(num)) {
    printf("%d is a perfect square\n", num);
  } else {
    printf("%d is NOT a perfect square\n", num);
  }
  return 0;
}

bool isPerfectSquare(int x) { 
    return ((int)sqrt(x) == sqrt(x)); 
}
