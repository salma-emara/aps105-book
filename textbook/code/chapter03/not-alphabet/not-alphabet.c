#include <stdio.h>
int main(void){
  char letter = ' ';
  printf("Enter a letter: ");
  scanf("%c", &letter);

  if (!(((letter >= 'A') && (letter <= 'Z')) || ((letter >= 'a') && (letter <= 'z')))){
    printf("You didn't enter an alphabet.");
  }
  return 0;
}
