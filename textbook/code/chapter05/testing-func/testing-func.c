// This program prints a pattern of stars using two functions
#include <stdio.h>

void printPattern(int numOfRows);
void printStars(int numOfStars);

int main(void) {
  int lines;
  printf("Enter the number of lines in the pattern: ");
  scanf("%d", &lines);
  printPattern(lines);
  return 0;
}

void printPattern(int numOfRows) {
  for (int row = 1; row <= numOfRows; row++) {
    printStars(row);
  }
}

void printStars(int numOfStars) {
  for (int star = 1; star <= numOfStars; star++) {
    printf("%c", '*');
  }
  printf("\n");  // to start a newline
}