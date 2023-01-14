#include <stdio.h>

int factorial(int n);

int main(void) {
  int n;
  printf("Enter a positive integer: ");
  scanf("%d", &n);
  int result = factorial(n);
  printf("%d! = %d \n", n, result);
  return 0;
}

int factorial(int n) {
  int fact = 1;

  for (int i = 1; i <= n; i++) {
    fact = fact * i;
  }

  return fact;
}