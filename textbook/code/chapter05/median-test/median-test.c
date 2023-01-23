#include <stdio.h>

int median(int, int, int);

int main(void) {
  printf("The median of (%d, %d, %d) is %d\n", -105, -28, -73,
         median(-105, -28, -73));
  printf("The median of (%d, %d, %d) is %d\n", 0, -101, 98,
         median(0, -101, 98));
  printf("The median of (%d, %d, %d) is %d\n", -101, -67, 0,
         median(-101, -67, 0));
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
