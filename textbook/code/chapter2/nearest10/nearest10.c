#include <math.h>
#include <stdio.h>

int main(void) {
  double n = 0;
  printf("Enter the number you want to round to the nearest 10th: ");
  scanf("%lf", &n);

  n = rint(n * 10) / 10;
  printf("The number rounded to the nearest 10th is %.1lf\n", n);
  return 0;
}
