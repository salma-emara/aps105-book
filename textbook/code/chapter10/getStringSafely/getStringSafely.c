#include <stdio.h>

char* getStringSafely(char* s, int n);

int main(void) {
  char st[10];
  printf("Enter string: \n");
  printf("User entered: %s\n", getStringSafely(st, 7));
  scanf("%s", st);
  printf("This is what's left: %s\n", st);
  return 0;
}

char* getStringSafely(char* s, int n) {
  int charCount = 0;
  char c;

  while ((charCount < n - 1) && ((c = getchar()) != '\n')) {
    s[charCount] = c;
    charCount++;
  }
  s[charCount] = '\0';
  return s;
}
