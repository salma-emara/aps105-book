#include <stdio.h>

int main(void) {
  int i;                       // declare the loop variable outside the loop
  for (i = 1; i <= 10; i++) {  // initialize the loop variable inside the loop
    printf("%d ", i);
  }

  printf("\nWe existed the loop with i = %d \n", i);

  return 0;
}

// Out of scope variable i in printf statement
/*
#include <stdio.h>

int main(void) {
  for (int i = 1; i <= 10;
       i++) {  // declare & initialize the loop variable inside the loop
    printf("%d ", i);
  }

  printf("\nWe existed the loop with i = %d \n", i);

  return 0;
}
*/
