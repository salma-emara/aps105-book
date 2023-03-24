#include <stdio.h>

void printRow(int n);
void printInvertedTriangle(int n);

int main(void) {
  int rows;
  printf("Enter number of rows: ");
  scanf("%d", &rows);
  printInvertedTriangle(rows);
  return 0;
}

void printInvertedTriangle(int n) {
  if (n > 0) {
    printInvertedTriangle(n - 1);
    printRow(n);
  }
}

void printRow(int n) {
  if (n == 1) {
    printf("*\n");
  } else {
    printf("*");
    printRow(n - 1);
  }
}
