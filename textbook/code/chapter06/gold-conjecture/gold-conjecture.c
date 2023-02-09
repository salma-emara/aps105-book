#include <stdbool.h>
#include <stdio.h>

// Function prototypes
bool testGoldbach(int);
void printConjResult(int);
void getUserInput(int *);
void nextPrimeNumber(int *);
bool isPrime(int);

int main(void) {
  // Main function is too simple, it calls a function to take input from the
  // user and calls another function that checks and verifies if the number
  // verifies the conjecture
  int number;
  getUserInput(&number);
  printConjResult(number);
  return 0;
}

void printConjResult(int number) {
  // Call a function to verify the conjecture and prints the result
  bool verified = testGoldbach(number);
  if (verified) {
    printf("Goldbach conjecture is verified.\n");
  } else {
    printf("Goldbach conjecture not verified.\n");
  }
}

void getUserInput(int *number) {
  // Get user input from the keyboard
  // and validates it is even and greater than 2  bool firstEntry = true;
  bool firstEntry = true;
  do {
    if (firstEntry) {
      printf("Enter a number to test the Goldbach conjecture: ");
      firstEntry = false;
    } else {
      printf("Your input was invalid, please enter another even number > 2: ");
    }
    scanf("%d", number);
  } while (*number <= 2 || *number % 2 != 0);
}

bool testGoldbach(int N) {
  // Tests the Goldbach conjecture and
  // returns true if verified or false if rejected
  int x = 2, y;
  bool rejected = false;
  bool verified = false;
  while (!rejected && !verified) {
    y = N - x;
    if (isPrime(y)) {
      verified = true;
    } else if (y < x) {
      rejected = true;
    } else {
      nextPrimeNumber(&x);
    }
  }
  return verified;
}

void nextPrimeNumber(int *px) {
  // We will look for the numbers after *pFrist one by one until we find the
  // next prime number
  int value = *px + 1;
  while (!isPrime(value)) {
    value += 1;
  }
  *px = value;
}

bool isPrime(int num) {
  // check if num is prime, by checking the remainder of num / all numbers from
  // 2 to num - 1
  bool prime = true;
  if (num < 2) {
    prime = false;
  } else {
    for (int denom = 2; denom <= num - 1 && prime; denom++) {
      if (num % denom == 0) {
        prime = false;
      }
    }
  }
  return prime;
}
