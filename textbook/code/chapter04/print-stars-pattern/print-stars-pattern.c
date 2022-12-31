#include <stdio.h>

int main(void) {
  for (int line = 0; line < 3; line += 1) {  // loop over lines
    for (int star = 0; star <= line;
         star += 1) {  // loop over stars in a single line
      printf("*");
    }
    printf("\n");
  }
  return 0;
}
