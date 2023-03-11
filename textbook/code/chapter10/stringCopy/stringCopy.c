#include <stdio.h>
#include <string.h>

char* stringCopy(char* dest, const char* src);

int main(void) {
  char s[] = "Hello";
  char d[6];
  printf("d after copying has \"%s\".\n", stringCopy(d, s));
  return 0;
}

char* stringCopy(char* dest, const char* src) {
  int ind = 0;

  while (src[ind] != '\0') {
    dest[ind] = src[ind];
    ind++;
  }
  dest[ind] = '\0';
  return dest;
}
