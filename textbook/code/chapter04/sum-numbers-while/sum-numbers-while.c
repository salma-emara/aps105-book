#include <stdio.h>

int main(void) {
  int sum = 0;
  int num;
  printf("Enter a number: ");
  scanf("%d", &num);
  while (num >= 0) {
    sum += num;
    scanf("%d", &num);
  }
  printf("The sum is %d\n", sum);
  return 0;
}
