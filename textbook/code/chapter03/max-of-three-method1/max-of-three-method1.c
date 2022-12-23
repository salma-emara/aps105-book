#include <stdio.h>
int main(void) {
  int x = 0, y = 0, z = 0;
  printf("Enter three integers: ");
  scanf("%d %d %d", &x, &y, &z);

  // Maximum of x and y
  if (x > y) {
    if (x > z) {
      printf("The maximum is the first number entered: %d", x);
    } else {
      printf("The maximum is the third number entered: %d", z);
    }
  } else {
    if (y > z) {
      printf("The maximum is the second number entered: %d", y);
    } else {
      printf("The maximum is the third number entered: %d", z);
    }
  }
  return 0;
}
