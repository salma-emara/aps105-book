#include <stdio.h>
#include <stdlib.h>

int *merge(int *size);

int main(void) {
  int size;
  int *mergedArray = merge(&size);
  printf("Result: ");
  for (int i = 0; i < size; i++) {
    printf("%d ", mergedArray[i]);
  }
  printf("\n");
  free(mergedArray);
  return 0;
}

int *merge(int *size) {
  *size = 0;
  int arraysEntered = 0;
  int sizeArray[2];
  int *arrA = NULL, *arrB = NULL;
  while (arraysEntered < 2) {
    printf("Please enter the size of array number %d: ", arraysEntered + 1);
    scanf("%d", &sizeArray[arraysEntered]);

    // Dynamically allocate the array to be entered
    if (arraysEntered == 0) {
      arrA = (int *)malloc(sizeArray[arraysEntered] * sizeof(int));
    } else {
      arrB = (int *)malloc(sizeArray[arraysEntered] * sizeof(int));
    }
    // Enter elements into the arrays
    printf("Please enter the array number %d: ", arraysEntered + 1);
    for (int index = 0; index < sizeArray[arraysEntered]; index++) {
      if (arraysEntered == 0) {
        scanf("%d", &arrA[index]);
      } else {
        scanf("%d", &arrB[index]);
      }
    }
    arraysEntered++;
  }

  // Merge the two arrays
  *size = sizeArray[0] + sizeArray[1];
  int *merged = (int *)malloc((*size) * sizeof(int));
  int indexA = 0;
  int indexB = 0;
  int index = 0;

  while (index < *size) {
    if (indexA == sizeArray[0]) {
      merged[index] = arrB[indexB];
      indexB++;
      index++;
    } else if (indexB == sizeArray[1]) {
      merged[index] = arrA[indexA];
      indexA++;
      index++;
    } else if (indexA < sizeArray[0] && indexB < sizeArray[1]) {
      if (arrA[indexA] < arrB[indexB]) {
        merged[index] = arrA[indexA];
        indexA++;
        index++;
      } else if (arrA[indexA] >= arrB[indexB]) {
        merged[index] = arrB[indexB];
        indexB++;
        index++;
      }
    }
  }
  free(arrA);
  free(arrB);
  arrA = NULL;
  arrB = NULL;
  return merged;
}
