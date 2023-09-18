#include <stdio.h>

int binarySearchHelper(int list[], int low, int high, int item);
int binarySearchRecursive(int list[], int listLength, int item);

int binarySearchHelper(int list[], int low, int high, int item) {
  if (high < low)  // failure - item not in list
    return -1;

  int middle = (low + high) / 2;
  if (item == list[middle])  // success
    return middle;
  else if (item < list[middle])  // try bottom half
    return binarySearchHelper(list, low, middle - 1, item);
  else  // try top half
    return binarySearchHelper(list, middle + 1, high, item);
}

int binarySearchRecursive(int list[], int listLength, int item) {
  return binarySearchHelper(list, 0, listLength - 1, item);
}

int main(){
    int list[] = {1, 3, 5, 7, 9, 10, 12};
    printf("Found 9 in index %d", binarySearchRecursive(list, 7, 9));
    return 0;
}
