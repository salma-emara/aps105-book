#include <stdio.h>
#include <stdlib.h>

double getAverage(int);

int main(void) {
  int size;
  printf("Enter size of array: ");
  scanf("%d", &size);
  double avg = getAverage(size);
  printf("Average is %.2lf\n", avg);
  return 0;
}

double getAverage(int size) {
  int* myArray = (int*)malloc(size * sizeof(int));

  printf("Enter grades: ");
  for (int index = 0; index < size; index++) {
    scanf("%d", &myArray[index]);
  }
  int sum = 0;
  for (int index = 0; index < size; index++) {
    sum += myArray[index];
  }
  free(myArray);
  return (double)sum / size;
}
