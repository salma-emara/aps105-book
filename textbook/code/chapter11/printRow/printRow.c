#include <stdio.h>

void printRow(int n);

int main(void) {
  int stars;
  printf("Enter number of stars: ");
  scanf("%d", &stars);
  printRow(stars);
  return 0;
}

void printRow(int n) {
  if (n == 1) {
    printf("*\n");
  } else {
    printf("*");
    printRow(n - 1);
  }
}
