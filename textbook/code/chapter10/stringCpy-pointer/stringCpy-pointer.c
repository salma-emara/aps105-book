#include <stdio.h>
#include <string.h>

char* stringCopy(char* dest, const char* src);

int main(void) {
  char s[] = "Hello";
  char d[6];
  printf("d after copying has \"%s\".\n", stringCopy(d, s));
  return 0;
}

char* stringCopy(char* pdest, const char* psrc) {
  char* pdestCopy = pdest;
  while (*psrc != '\0') {
    *pdestCopy = *psrc;
    pdestCopy++;
    psrc++;
  }
  *pdestCopy = '\0';
  return pdest;
}
