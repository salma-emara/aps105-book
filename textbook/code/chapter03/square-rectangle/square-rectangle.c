#include <stdio.h>
int main(void) {
  int height = 0, width = 0;
  printf("Please enter the height and width of your shape: ");
  scanf("%d %d", &height, &width);

  if (height == width) {
    printf("The shape is a square.");
  } else {
    printf("The shape is a rectangle.");
  }
  return 0;
}
