#include <stdlib.h>

int main(void) {
  // Dynamically allocate array of pointer
  int** arr = (int**)malloc(3 * sizeof(int*));

  // Dynamically allocate a 1D array for each row
  for (int row = 0; row < 3; row++) {
    *(arr + row) = (int*)malloc(4 * sizeof(int));
  }

  // Assign a value to each element
  for (int row = 0; row < 3; row++) {
    for (int col = 0; col < 4; col++) {
      *(*(arr + row) + col) = row * 4 + col + 1;
      // arr[row][col] =  row * 4 + col + 1;
    }
  }

  // Free the 1D arrays of rows first
  for (int row = 0; row < 3; row++) {
    free(*(arr + row));
    // OR
    // free(arr[row]);
    arr[row] = NULL;
  }

  // Then free the array of pointers
  free(arr);
  arr = NULL;

  return 0;
}
