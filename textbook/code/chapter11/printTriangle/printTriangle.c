#include <stdio.h>

void printRow(int n);
void printTriangle(int n);

int main(void) {
  int rows;
  printf("Enter number of rows: ");
  scanf("%d", &rows);
  printTriangle(rows);
  return 0;
}

void printTriangle(int n) {
  if (n > 0) {
    printRow(n);
    printTriangle(n - 1);
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
