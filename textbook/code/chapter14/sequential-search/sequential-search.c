
#include <stdio.h>

int sequentialSearch(int list[], int listLength, int item) {
  for (int index = 0; index < listLength; index++) {
    if (item == list[index]) {
      return index;
    }
  }
  return -1;
}

int main(void) {
  int list[] = {3, 5, 6, 7, 9};
  printf("Found 7 at index %d.\n", sequentialSearch(list, 5, 7));
  return 0;
}
