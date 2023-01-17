#include <stdio.h>

int factorial(int n);

int main(void) {
  int number = 4;

  int result = factorial(number);
  printf("Factorial of %d: %d.\n", number, result);
  return 0;
}

int factorial(int n) {
  int fact = 1;

  for (int i = 1; i <= n; i++) {
    fact = fact * i;
  }

  return fact;
}
