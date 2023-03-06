#include <stdlib.h>

int main(void) {
  int rows = 3, cols = 4;
  int* arr = (int*)malloc(rows * cols * sizeof(int));

  for (int row = 0; row < rows; row++) {
    for (int col = 0; col < cols; col++) {
      *(arr + row * cols + col) = row * cols + col + 1;
    }
  }

  free(arr);

  return 0;
}
