#include <stdio.h>
#include <string.h>

int spacesCount(char str[]);

int main(void) {
  char str[] = "Welcome to Chapter 10 in Snefru";
  printf("The number of spaces is %d.\n", spacesCount(str));

  return 0;
}

int spacesCount(char str[]) {
  int count = 0;
  for (int ind = 0; str[ind] != '\0'; ind++) {
    if (str[ind] == ' ') {
      count++;
    }
  }
  return count;
}
