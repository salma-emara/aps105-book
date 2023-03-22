#include <stdio.h>

int factorial(int n);

int main(void) {
  printf("4! = %d\n", factorial(4));
  printf("1! = %d\n", factorial(1));
  printf("0! = %d\n", factorial(0));
  return 0;
}

int factorial(int n) {
  if (n == 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
