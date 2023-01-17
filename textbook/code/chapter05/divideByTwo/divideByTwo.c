#include <stdio.h>

double divideByTwo(double);

int main() {
  double n = 4.2;
  printf("Output: %.2lf\n", divideByTwo(n));
  n = 10.5;
  printf("Another output: %.2lf\n", divideByTwo(n));
  return 0;
}

double divideByTwo(double n) {
  n = n / 2;
  return n;
}
