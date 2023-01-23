#include <stdio.h>

int median(int, int, int);

int main(void) {
  int a, b, c;
  printf("Please enter three integers to find the median: ");
  scanf("%d %d %d", &a, &b, &c);
  printf("The median is %d\n", median(a, b, c));
  return 0;
}

int median(int x, int y, int z) {
  int result = 0;
  if ((x >= z && x <= y) || (x >= y && x <= z))
    result = x;
  else if ((y >= x && y <= z) || (y >= z && y <= x))
    result = y;
  else
    result = z;
  return result;
}
