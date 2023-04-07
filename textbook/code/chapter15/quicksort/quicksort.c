#include <stdbool.h>
#include <stdio.h>
void swap(int list[], int left, int right);
int partition(int list[], int low, int high);
void quicksortHelper(int list[], int low, int high);
void quicksort(int list[], int length);
void printArray(int list[], int listLength);

int main(void) {
  int list[9] = {10, 14, 8, 13, 20, 3, 6, 9, 4};

  quicksort(list, 9);
  printArray(list, 9);
  return 0;
}

int partition(int list[], int low, int high) {
  int pivot = low, left = low + 1, right = high;
  printf("left = %d, right = %d\n", left, right);
  while (true) {
    while (left <= right && list[left] <= list[pivot]) {
      left++;
    }

    while (left <= right && list[right] > list[pivot]) {
      right--;
    }

    if (left < right) {
      swap(list, left, right);
    } else {
      swap(list, pivot, right);
      return right;
    }
  }
}

void quicksortHelper(int list[], int low, int high) {
  if (low < high) {
    int pivot = partition(list, low, high);

    printArray(list, 9);

    quicksortHelper(list, low, pivot - 1);
    quicksortHelper(list, pivot + 1, high);
  }
}

void quicksort(int list[], int length) { quicksortHelper(list, 0, length - 1); }

void printArray(int list[], int listLength) {
  for (int i = 0; i < listLength; i++) printf("%d ", list[i]);
  printf("\n");
}

void swap(int list[], int left, int right) {
  int t = list[right];
  list[right] = list[left];
  list[left] = t;
}
