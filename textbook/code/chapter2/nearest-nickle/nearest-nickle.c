#include <math.h>
#include <stdio.h>

int main(void) {
  double price = 0;
  printf("Enter the amount to round to the nearest nickle: ");
  scanf("%lf", &price);
  printf("$%.2lf rounded to the nearest nickle is $%.2lf\n", price,
         rint(price * 100 / 5) / 100 * 5);
  return 0;
}
