#include <stdio.h>
int main(void) {
  char letter = ' ';
  printf("Enter a letter: ");
  scanf("%c", &letter);

  if (letter == 'A' || letter == 'a') {
    printf("You entered an upper case or lower case A.");
  } else {
    printf("You did not enter an upper case or lower case A.");
  }
  return 0;
}
