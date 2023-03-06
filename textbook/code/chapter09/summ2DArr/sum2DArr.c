#include <stdio.h>

int sum2DArr(int rows, int cols, int arr2D[][cols]);

int main(void) {
  int arr2D[3][4] = {{2, 3, 1, 12}, {3, 8, 7, 10}, {8, 1, 0, 2}};
  sum2DArr(3, 4, arr2D);
  return 0;
}

int sum2DArr(int rows, int cols, int arr2D[][cols]) {
  int sum = 0;
  for (int row = 0; row < rows; row++) {
    for (int col = 0; col < cols; col++) {
      sum += arr2D[row][col];
    }
  }
  return sum;
}
