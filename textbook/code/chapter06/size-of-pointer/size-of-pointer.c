#include <stdbool.h>
#include <stdio.h>

int main(void) {
  printf("Size of pointer (int*) is %d.\n", sizeof(int *));
  printf("Size of pointer (double*) is %d.\n", sizeof(double *));
  printf("Size of pointer (bool*) is %d.\n", sizeof(bool *));
  printf("Size of pointer (char*) is %d.\n", sizeof(char *));
  return 0;
}