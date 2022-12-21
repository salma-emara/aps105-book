#include <stdio.h>
int main(void) {
  int age = 0;
  printf("Enter your age: ");
  scanf("%d", &age);
  if (age < 14) {  // Condition checking if age is less than 14
    printf("You are not yet eligible to work in Ontario.");
  } else {
    printf("You are eligible to work in Ontario.");
  }
  return 0;
}
