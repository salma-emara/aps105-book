#include <math.h>
#include <stdio.h>

int main(void) {
  double a = 0, b = 0, c = 0;
  printf("Enter the length of the first side: ");
  scanf("%lf", &a);
  printf("Enter the length of the second side: ");
  scanf("%lf", &b);
  c = sqrt(a * a + b * b);
  printf("The length of the hypotenuse is %.2lf\n", c);
  return 0;
}
