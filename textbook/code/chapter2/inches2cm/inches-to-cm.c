// Description: This program convert inches to centimeters
#include <stdio.h>

int main(void) {
  // Declare variables
  const double InchesToCm = 2.54;
  double inputInches, outputCm;

  // Prompt user for input
  printf("Enter the number of inches to convert to cm: ");
  scanf("%lf", &inputInches);

  // Convert inches to centimeters
  outputCm = inputInches * InchesToCm;

  // Display output in 2 decimal places
  printf("The number of centimeters is %.2lf\n", outputCm);
  return 0;
}
