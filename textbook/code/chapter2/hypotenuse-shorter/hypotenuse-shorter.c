#include <math.h>
#include <stdio.h>

int main(void) {
  double a = 0, b = 0, c = 0;
  printf("Enter the lengths of the sides: ");
  scanf("%lf %lf", &a, &b);

  c = sqrt(a * a + b * b);
  printf("The length of the hypotenuse is %.2lf\n", c);
  return 0;
}
