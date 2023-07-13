#include <stdio.h>

int binarySearch(int list[], int listLength, int item) {
  int low = 0;
  int high = listLength - 1;
  int middle;

  while (low <= high) {
    middle = (low + high) / 2;
    if (item == list[middle])
      return middle;
    else if (item < list[middle])
      high = middle - 1;
    else
      low = middle + 1;
  }
  return -1;
}

int main() {
  int list[] = {1, 3, 5, 7, 9, 10, 12};
  printf("Found 9 at index %d\n", binarySearch(list, 7, 9));
  return 0;
}
