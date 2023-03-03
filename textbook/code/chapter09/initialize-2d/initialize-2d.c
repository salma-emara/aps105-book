#include <stdio.h>

int main(void) {
  int myArray[3][4];

  for (int row = 0; row < 3; row++) {
    for (int col = 0; col < 4; col++) {
      myArray[row][col] = row * 4 + col;
      printf("myArray[%d][%d] = %d\n", row, col, myArray[row][col]);
    }
  }
  return 0;
}
