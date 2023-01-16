/**
 * @file test.c
 * @brief Test code for the chapter 5 exercises.
 * @details This file contains test code for the chapter 5 exercises.
 * @author Your Name
 * @date 2018-02-01
 * @bug No known bugs.
 */

#include <stdbool.h>
#include <stdio.h>

double multiplyTwo(int, bool);
/**
 * @brief Test code for the chapter 5 exercises.
 * @details This file contains test code for the chapter 5 exercises.
 * @return 0 on success.
 */
int main() {
  printf("Output: %lf\n", multiplyTwo(2, true));
  printf("Another output: %lf\n", multiplyTwo(7, false));
  return 0;
}

/**
 * @brief Multiply a number by two.
 * @details This function multiplies a number by two.
 * @param var The number to multiply.
 * @param flag A flag to determine if the number should be multiplied by two.
 * @return The product of the multiplication.
 */
double multiplyTwo(int var, bool flag) {
  double product = 0;
  if (flag) {
    product = 2.0 * var;
  } else {
    product = var;
  }
  return product;
}
