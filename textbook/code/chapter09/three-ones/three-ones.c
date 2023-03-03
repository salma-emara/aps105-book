#include <stdio.h>

int main(void) {
  int board[6][6] = {
      {0, 1, 1, 0, 0, 0}, 
      {0, 1, 0, 1, 1, 0}, 
      {0, 1, 1, 1, 0, 0},
      {0, 0, 1, 1, 1, 0}, 
      {0, 0, 0, 1, 1, 0}, 
      {1, 1, 1, 0, 1, 1},
  };

  for (int row = 0; row < 6; row++) {
    for (int col = 0; col < 6; col++) {
      int count = 0;
      for (int step = 0; step < 3 && col + step < 6; step++) {
        if (board[row][col + step] == 1) {
          count += 1;
        }
      }
      if (count == 3) {
        printf("(row, col) = (%d, %d)\n", row, col);
      }
    }
  }
  return 0;
}
