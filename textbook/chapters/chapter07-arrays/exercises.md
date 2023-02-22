# Exercises

Many of these exercises are taken from past exams of APS105 Computer Fundamentals courses at University of Toronto. The solutions are provided in the answer boxes.

Headings in this page classify the exercises into different categories: **[Easy]**, **[Intermediate]**, and **[Challenging]**. I suggest you start by easy exercises and work your way up to the challenging ones.


**Part of Question 6 in Winter 2020 Midterm Exam [Easy]**

The following code segment will cause a runtime error. Identify the
potential runtime error and briefly explain how you would fix it.

```{code-block} c
char cArray[] = {'H', 'E', 'L', 'L', 'O'};
printf("The last character is %c.\n", cArray[5]);
```

```{admonition} Answer
:class: dropdown
**Problem:** The maximum index for `cArray` is 4 (array out-of-bounds error).

**Solution:** Change [5] to [4]. 
```

**Question 5 in Winter 2022 Midterm Exam [Intermediate]**

In the box provided below, write the output generated after the following program is completely executed.

```{code-block} c
:linenos:
#include <stdio.h>
int main(void) {
  int first = 1, second = 2, data[4] = {10, 20, 30, 40};
  int *third = &second, *fourth = &first, *fifth = data + first + 1;
  (*third)++;
  (*fourth)++;
  data[second] = *fifth + first + *third + *fourth;
  printf("first = %d, second = %d, third = %d, fourth = %d, fifth = %d\n",
         first, second, *third, *fourth, *fifth);
  for (int i = 0; i < 4; i++) {
    printf("%d, ", data[i]);
  }
  printf("\n");
  return 0;
}
```

````{admonition} Answer
:class: dropdown

In line 3, `first = 1`, `second = 2`, `data[0] = 10`, `data[1] = 20`, `data[2] = 30`, `data[3] = 40`.

In line 4, `third = &second`, `fourth = &first`, `fifth = data + first + 1 = &data[0] + first + 1 = &data[2].`

In line 5, `(*third)++` $\rightarrow$ `second++`, so `second = 3`.

In line 6, `(*fourth)++` $\rightarrow$ `first++`, so `first = 2`.

In line 7, `data[second] = *fifth + first + *third + *fourth = data[2] + 2 + 3 + 2 = 37`

In line 8, we print `first = 2, second = 3, third = 3, fourth = 2, fifth = 30`.

In line 11, we print `10, 20, 30, 37,`.

Output is 
<pre>
first = 2, second = 3, third = 3, fourth = 2, fifth = 30
10, 20, 30, 37,
</pre>
````

**Question 5 in Winter 2020 Midterm Exam [Intermediate]**

What is the output of the following program?

```{code-block} c
#include <stdio.h>
int main(void) {
  int *p, x;
  int fiveInt[5] = {1, 2, 3, 4, 5};
  int *q;
  p = NULL;
  q = fiveInt;
  x = 6;
  p = &x;
  printf("A: %d %d\n", x, *p);
  *(q + 3) = *p;
  *p = *q + *(q + 3);
  printf("B: %d %d %d\n", x, *p, *q);
  return 0;
}
```

```{admonition} Answer
:class: dropdown
Output is
<pre>
A: 6 6
B: 7 7 1
</pre>
```

**Question 14 in Winter 2017 Midterm Exam [Intermediate]**

Write a complete C program that prompts the user repeatedly for a sequence of up to 10 integer values. After receiving all 10 values, or if the user enters 0, the program will stop prompting for more values. You can assume that the user enters at least one value before entering 0. Your program will complete the following three tasks, in the order as given below, using the values the user entered.

• Print the total number of values entered;

• Print all the values in the order that the user entered them;

• Print whether the values are entered in ascending order, i.e., the next value is either greater than or equal to the previous one. For example, `{3, 4, 7, 7}` is a sequence of values in ascending order, but `{3, 4, 7, 6}` is not.

**Hint:** you will need to use an array for this question.

Here are a few example runs of your program.

**Example run 1:**
<pre>
Enter a value (0 to stop): 1
Enter a value (0 to stop): 2
Enter a value (0 to stop): 3
Enter a value (0 to stop): 4
Enter a value (0 to stop): 7
Enter a value (0 to stop): 7
Enter a value (0 to stop): 8
Enter a value (0 to stop): 9
Enter a value (0 to stop): 10
Enter a value (0 to stop): 11
There are a total of 10 numbers.
The values you entered are: 1 2 3 4 7 7 8 9 10 11
The values are in ascending order.
</pre>

**Example run 2:**
<pre>
Enter a value (0 to stop): 3
Enter a value (0 to stop): 5
Enter a value (0 to stop): 5
Enter a value (0 to stop): 7
Enter a value (0 to stop): 0
There are a total of 4 numbers.
The values you entered are: 3 5 5 7
The values are in ascending order.
</pre>

**Example run 3:**
<pre>
Enter a value (0 to stop): 2
Enter a value (0 to stop): 1
Enter a value (0 to stop): 3
Enter a value (0 to stop): 0
There are a total of 3 numbers.
The values you entered are: 2 1 3
The values are not in ascending order.
</pre>

**Example run 4:**
<pre>
Enter a value (0 to stop): 1
Enter a value (0 to stop): 0
There are a total of 1 numbers.
The values you entered are: 1
The values are in ascending order.
</pre>

````{admonition} Answer
:class: dropdown

```{code-block} c
#include <stdbool.h>
#include <stdio.h>
int main(void) {
  int count = 0, maxInput = 10;
  int arr[maxInput];
  int num;
  do {
    printf("Enter a value (0 to stop): ");
    scanf("%d", &num);
    if (num != 0) {
      arr[count] = num;
      count++;
    }
  } while (count < 10 && num != 0);
  printf("There are a total of %d numbers.\n", count);
  printf("The values you entered are:");

  for (int index = 0; index < count; index++) {
    printf(" %d", arr[index]);
  }
  printf("\n");
  bool ascending = true;
  for (int index = 0; index < count - 1 && ascending; index++) {
    if (arr[index] > arr[index + 1]) {
      ascending = false;
    }
  }
  printf("The values are ");
  if (!ascending) {
    printf("not ");
  }
  printf("in ascending order.\n");

  return 0;
}
```
````

**Question 9 in Winter 2018 Midterm Exam [Intermediate]**

The dot product, an operation with which every first-year engineer is familiar, consists of the element-by-element multiplication of two vectors, and the cumulative sum of these resulting products. If vector $a = [a_1, a_2, a_3]$, and $b = [b_1, b_2, b_3]$, then the dot product $a · b = a_1 \times b_1 + a_2 \times b_2 + a_3 \times b_3$.

Smartphones, which can be found at this very moment in many first-year engineer’s pocket, do perform a similar operation when the treble or the bass are adjusted when the said engineer is enjoying a song. This operation is called *filtering*.

Suppose now that you have two vectors, one representing a song, and the other representing a filter. Write a complete C program that will calculate and print the dot product between these two vectors as a single value. Your program should simply print:

<pre>
Result = <b>calculated dot product value here</b>
</pre>

Your program must use a function, called `dotProduct`, which takes in pointers to the two vectors and their length, and returns the result. Before your program calls `dotProduct`, the two vectors should be initialized using the following elements:

<pre>
music: 0 0.707 1 0.707 0 -0.707 -1 -0.707 0 // it's a sinusoid
filter: 1 0 -1 0 2 0 -1 0 1 // it's a sinc
</pre>

Next time you listen to a song, consider that it is very possible that two 50 element long arrays are being used by a function very similar to the one you will write below, and that function is being called at least once every 48 thousandths of a second, so that you can enjoy that Taylor Swift song. Okay, make it Justin Bieber, then.

````{admonition} Answer
:class: dropdown

```{code-block} c
#include <stdio.h>
// The function prototype can also be declared as:
// double dotProduct(double music[], double filter[], int length) {
double dotProduct(double *music, double *filter, int length) {
  double sum = 0.0;
  int i;
  for (i = 0; i < length; i++) {
    sum += music[i] * filter[i];  // or *(music + i) * *(filter + i)
  }
  return sum;
}
int main(void) {
  double music[9] = {0, 0.707, 1, 0.707, 0, -0.707, -1, -0.707, 0};
  double filter[9] = {1, 0, -1, 0, 2, 0, -1, 0, 1};
  printf("Result = %lf\n", dotProduct(music, filter, 9));
}
```
````

**Question 11 in Winter 2018 Midterm Exam [Intermediate]**

Recall that the function `rand()` returns a random integer each time it is called. 

Write a complete C program to help assess the quality of `rand()`, by following the three steps provided below.

First, declare an array with the identifier `random` that contains $1,000$ int-type integers, and then fill this array with random numbers between $0$ and $255$ (inclusive).

Second, declare another array with the identifier `h` that contains $256$ integers, and use that array to create a histogram so that at the end of the program, for each `i` between $0$ and $255$ (inclusive), `h[i]` will have a value `x` if exactly `x` elements of array `random` have the value `i`.

Finally, print out the values of all elements of `h`.

For the sake of convenience, you do not need to seed the random number generator.

(The quality of `rand()` can then be assessed by someone who uses your program as follows: if the printed-out numbers are all within a small range, then the quality of rand() is pretty good; on the other hand, if the printed-out numbers span a large range, then the quality of rand() is rather poor.)

````{admonition} Answer
:class: dropdown
```{code-block} c
int main(void) {
  int random[1000];
  for (int i = 0; i < 1000; i++) {
    random[i] = rand() % 256;
  }
  int h[256];
  // must first initialize elements of h to 0
  // can also use int h[256] = {0}; (or {})
  for (int i = 0; i < 256; i++) {
    h[i] = 0;
  }
  // now build histogram
  for (int i = 0; i < 1000; i++) {
    h[random[i]]++;
  }
  for (int i = 0; i < 256; i++) {
    printf("%d", h[i]);
  }
  printf("\n");
  return 0;
}
```
````

**Question 10 in Winter 2020 Midterm Exam [Intermediate]**

Complete the definition of a C function `secondLargest` whose prototype is shown below. The function returns the index of the second largest integer in the list array, which contains `count` elements.

For example, if the list passed to the array is `{3, 9, 7, 5, 9, 8, 2, 4, 9}`, the function returns `5`, as `list[5]` contains the second largest integer `8`. If there are multiple occurrences of the second largest integer, the function returns the first occurrence. For example, if the list is `{3, 8, 3, 5, 9, 8, 2, 3, 8}`, the function returns `1`. If there does not exist a second largest integer (i.e., all integers in the array are of the same value), the function returns `-1`. For the sake of simplicity, you may assume that all integers in the array are positive, and there exists at least one element in the array (i.e., `count > 0`).

````{admonition} Answer
:class: dropdown
If you find a number larger than the largest, update the second largest with the previous largest and the largest with the new largest. However, if you find a number that is not larger than the largest, but is larger than the second largest, then only update the second largest. 

```{code-block} c
int secondLargest(int list[], int count) {
  int largest = list[0], secondLargest = -1;
  int largestIndex = 0, secondLargestIndex = -1;
  for (int i = 1; i < count; i++) {
    if (list[i] > largest) {
      secondLargest = largest;
      secondLargestIndex = largestIndex;
      largest = list[i];
      largestIndex = i;
    } else if (list[i] < largest && list[i] > secondLargest) {
      secondLargest = list[i];
      secondLargestIndex = i;
    }
  }
  return secondLargestIndex;
}
```
````

**Question 12 in Winter 2020 Midterm Exam [Challenging]**

In a Pascal’s Triangle, the first row, row #0, has a single element 1. Each succeeding row elements are the sum of the two elements just above (if there is only one number just above, then that number is duplicated). So the first 5 rows (numbering from zero) are:

<pre>
    1
   1 1
  1 2 1
 1 3 3 1
1 4 6 4 1
</pre>

Looking at the last row, row #4, we have sums: $0 + 1$, $1 + 3$, $3 + 3$, $3 + 1$, $1 + 0$ (getting the values from the row above) to give us $1$, $4$, $6$, $4$, $1$. If we push this all left we get:

<pre>
1
1 1
1 2 1
1 3 3 1
1 4 6 4 1
</pre>

Write a function `calculatePascalRowSeven`, with the prototype given below, that calculates row#7 (the eighth row) of Pascal’s triangle, iterating from row #0. Do an in-place calculation, so that the result ends up in `pascalRow[]`. Do not use any other array. The given `main()` function prints the result.

```{code-block} c
void calculatePascalRowSeven(int pArray[]);  // function prototype

int main(void) {
  // row #n has n + 1 elements
  int pascalRow[7 + 1] = {1, 0, 0, 0, 0, 0, 0, 0};

  calculatePascalRowSeven(pascalRow);

  printf("Row 7 is:\n");
  for (int i = 0; i <= 7; i++) {
    printf("%d ", pascalRow[i]);
  }
  printf("\n");
}
```

````{admonition} Answer
:class: dropdown

Calculate each row in the outer loop, and each element in each row in the inner loop. You need to save `pArray[element]` in a variable named `saveElement` because you will not find it to get `pArray[element + 1]`.

```{code-block} c
void calculatePascalRowSeven(int pArray[]) {
  for (int row = 1; row < 8; row++) {
    int oneToLeft = 0;
    for (int element = 0; element < 8; element++) {
      int saveElement = pArray[element];
      pArray[element] = oneToLeft + pArray[element];
      oneToLeft = saveElement;
    }
  }
}
```
````

**Question 13 in Winter 2018 Midterm Exam [Challenging]**

The constant `E` is defined as a double constant of $2.718281828459045$.

```{code-block} c
const double E = 2.718281828459045;
```

A first positive integer is called a **mirror** of a second one if they both contain two digits, and when the two digits in the first integer are flipped, the first integer becomes the second one. For example, 81 is a mirror of 18 (and vice versa).

Implement a function called `firstMirrorInE` that returns the first two-digit number found in consecutive digits of `E` whose mirror have appeared earlier in the sequence of digits. You should only consider the first 16 digits of `E — 2.718281828459045`. The function returns $0$ if such a mirror pair
does not exist in the first 16 consecutive digits of E.

**Hint:** The `firstMirrorInE` function should return $28$, since its mirror, $82$, has appeared earlier in the sequence of digits. Your function must not simply return $28$ without doing any work. It is also incorrect to return $81$, because even though its mirror, $18$, appeared previously, $81$ is not the first
in the sequence that can be found.

Feel free to declare and implement additional functions when needed.

````{admonition} Answer
:class: dropdown

```{code-block} c
#include <stdbool.h>

bool mirror(int i, int j) {
  int firstDigit = i / 10;
  int secondDigit = i % 10;
  return j == secondDigit * 10 + firstDigit;
}
int firstMirrorInE(void) {
  const double E = 2.718281828459045;
  const int NumberOfDigits = 15;
  int count = 0;
  int twoDigitNumbers[17] = {0};
  for (int i = 0; i >= -NumberOfDigits; i--) {
    int p1 = (int)(E / pow(10, i)) % 10;
    int p2 = (int)(E / pow(10, i - 1)) % 10;
    int p = p1 * 10 + p2;
    for (int j = 0; j < count; j++) {
      if (mirror(twoDigitNumbers[j], p)) return p;
    }
    twoDigitNumbers[count] = p;
    count++;
  }
  return 0;
}
```
````

**Question 11 in Winter 2020 Midterm Exam [Challenging]**

The *Sieve of Eratosthenes* is an ancient algorithm for finding prime numbers. To use this algorithm to find all prime numbers less than a given integer, say 100, we start by making a list of consecutive integers less than $100$. We first take $p$ = 2, the smallest prime number, and print it. We then eliminate all multiples of $p$ less than $100$ in the list, (2$p$, 3$p$, 4$p$, . . .), from the list, since they are multiples of $p$ and are therefore not prime numbers. After eliminating the multiples of $p$, we find the first number after $p$ that has not yet been eliminated, as it must be the next prime number. We assign this new prime number to $p$, print it, and eliminate its multiples from the list, and so on.

We repeat this procedure until $p^2$ is greater than or equal to $100$. The numbers that remain in the list are prime numbers, and we finish by printing them out.

Write a complete C program that uses the *Sieve of Eratosthenes* algorithm to print all prime numbers less than 100. Your implementation must not use the `%` (modulo) operator. The output of your program should be:
<pre>
2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97
</pre>

**Hint:** Use an array of size $100$ to keep track of whether an integer has been eliminated or not.

````{admonition} Answer
:class: dropdown
```{code-block} c
#include <math.h>
#include <stdio.h>
int main(void) {
  int sieve[100] = {0}, i, p = 2;
  while (p < sqrt(100)) {
    printf("%d ", p);
    // eliminate multiples of p
    i = 2;
    while (i * p < 100) {
      sieve[i * p] = 1;
      i++;
    }
    p++;
    while (sieve[p] == 1) {
      p++;
    }
  }
  for (; p < 100; p++)
    if (sieve[p] == 0) printf("%d ", p);
  // Optional newline
  printf("\n");
}
```
````