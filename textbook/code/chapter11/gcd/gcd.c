#include <stdio.h>

int gcd(int a, int b);

int main(void) {
  int gcdAnswer = gcd(20, 8);
  printf("gcd(20, 8) = %d\n", gcdAnswer);
  return 0;
}

int gcd(int a, int b) {
  if (a == b) {
    return a;
  } else if (a > b) {
    return gcd(b, a - b);
  } else {
    return gcd(b, a);
  }
}
