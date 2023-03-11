#include <stdio.h>

int stringLength(const char* s);

int main(void) {
  char s[] = "Hello";
  int size = stringLength(s);
  printf("String length is %d.\n", size);
  return 0;
}

int stringLength(const char* s) {
  int count = 0;
  while (s[count] != '\0') {
    count++;
  }
  return count;
}
