#include <stdlib.h>

int main(void) {
  // on Stack, statically have allocate 3 pointers,
  // each will point to a 1D array corresponding to a row
  int* arr[3];

  // Access each pointer and make it point
  // to a newly dynamically allocated array
  for (int row = 0; row < 3; row++) {
    arr[row] = (int*)malloc(4 * sizeof(int));
  }
  // Access elements as usual
  for (int row = 0; row < 3; row++) {
    for (int col = 0; col < 4; col++) {
      arr[row][col] = row * 4 + col + 1;
    }
  }
  // Free only dynamically allocated space
  for (int row = 0; row < 3; row++) {
    free(arr[row]);
  }

  return 0;
}
