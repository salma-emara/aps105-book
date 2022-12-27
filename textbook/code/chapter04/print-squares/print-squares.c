#include <stdio.h>

int main(void) {
  for (int num = 1; (num <= 50) && (num * num < 200); num += 1) {
    printf("%d ", num * num);
  }
  return 0;
}
