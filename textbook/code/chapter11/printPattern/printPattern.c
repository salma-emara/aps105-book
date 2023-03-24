#include <stdio.h>

void printRow(int n);
void printPattern(int n);

int main(void) {
  int rows;
  printf("Enter number of max starts in a row: ");
  scanf("%d", &rows);
  printPattern(rows);
  return 0;
}

void printPattern(int n) {
  if (n > 0) {
    printRow(n);
    printPattern(n - 1);
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
