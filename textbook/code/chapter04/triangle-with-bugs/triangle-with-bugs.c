#include <stdio.h>

int main(void) {
  int n = 0;
  printf("Enter the number of rows: ");
  scanf("%d", &n);

  for (int row = 1; row <= n; row += 1) {
    for (int col = 1; col < n; col += 1) {
      if (col <= n - row) {
        printf(" ");
      } else if (col >= n - row || col <= n - 1 + row) {
        printf("*");
      }
    }
    printf("\n");
  }
  return 0;
}
