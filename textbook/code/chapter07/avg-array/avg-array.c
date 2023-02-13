// This C program calculates the average of values in the array grades
#include <stdio.h>
// Macro defining size of array
#define SIZE 7.0

int main(void) {
  // array of 7 elements
  int grades[7] = {100, 95, 67, 99, 72, 101, 200};

  // Sum will hold the summation of the 7 elements
  int sum = 0;
  // Avg will hold the average of the elements in the array grades
  double avg = 0;

  // add all the elements and save the summation in sum
  for (int index = 0; index < SIZE; index++) {
    sum = sum + grades[index];
  }
  avg = sum / SIZE;
  printf("Average is %.2lf.\n", avg);
  return 0;
}
