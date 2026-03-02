#include <stdlib.h>

int main(void) {
  const int Rows = 3;
  const int Cols = 4;
  int** arr = (int**)malloc(sizeof(int*) * 3);
  for (int row = 0; row < Rows; row++) {
    *(arr + row) = (int*)malloc(sizeof(int) * Cols);
  }
  for (int row = 0; row < Rows; row++) {
    for (int col = 0; col < Cols; col++){
      *(*(arr + row) + col) = row * Cols + col;
    }
  }

  for (int row = 0; row < Rows; row++) {
    free(*(arr + row));
    *(arr + row) = NULL;
  }
  free(arr);
  arr = NULL;
  return 0;
}
