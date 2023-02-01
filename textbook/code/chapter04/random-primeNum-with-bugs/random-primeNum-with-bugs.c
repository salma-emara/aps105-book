// Question 11 in Winter 2018 Midterm Exam
// Debug the following code
// The program is supposed to take in from the user
// an int variable named maxRange.
// Then, it should print a prime number randomly generated
// between 1 and maxRange.
// Prime number is a number that is not divisible by any number
// except for itself and 1.

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

int main(void) {
  // Enter input
  int maxRange = 0;
  printf("Enter the maximum range: ");
  scanf("%d", &maxRange);

  // Generate a random number, check if it is prime, if yes, great, if not
  // re-generate
  bool isPrime = true;
  int primeRandNum = 0;
  do {
    primeRandNum = rand() % (maxRange - 1 + 1) + 1;

    isPrime = true;
    for (int denom = 2; denom < primeRandNum; denom++) {
      if (primeRandNum % denom == 0) {
        break;
      }
    }

  } while (!isPrime);

  printf("Random prime number generated is %d", primeRandNum);

  return 0;
}