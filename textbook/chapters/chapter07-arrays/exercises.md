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