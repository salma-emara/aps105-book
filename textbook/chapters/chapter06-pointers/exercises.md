# Exercises

Many of these exercises are taken from past exams of APS105 Computer Fundamentals courses at University of Toronto. The solutions are provided in the answer boxes.

Headings in this page classify the exercises into different categories: **[Easy]**, **[Intermediate]**, and **[Challenging]**. I suggest you start by easy exercises and work your way up to the challenging ones.

**Question 9 in Winter 2019 Midterm Exam [Intermediate]**

There are $0.3048$ metres in a foot, $100$ centimetres in a metre, and $12$ inches in a foot. Write a program that will accept, as input, a length in feet and inches. **You do not have to check for valid input** -- assume the user enters positive, non-fractional values for the feet and inches. The program
will output the equivalent length in metres and centimetres **(rounded to the nearest centimetre)**.

Your code should include four functions: one for input, one for output, one to perform the calculation, and main. The function prototypes are below. For full marks, your code should not use
any global variables.

```{code-block} c
void getInput(int *outFeet, int *outInches);
void printOutput(int feet, int inches, int metres, int centimetres);
void convert(int feet, int inches, int *outMetres, int *outCentimetres);
```

An example of one run of the program is below:
<pre>
Please enter the feet and inches to convert: <b>5 10</b>
5 feet 10 inches is 1 metres and 78 centimetres
</pre>

````{admonition} Answer
:class: dropdown

```{code-block} c
#include <math.h>
#include <stdio.h>

void getInput(int *outFeet, int *outInches) {
  printf("Please enter the feet and inches to convert: ");
  scanf("%d %d", outFeet, outInches);
}

void printOutput(int feet, int inches, int metres, int centimetres) {
  printf("%d feet %d inches is %d metres and %d centimetres.\n", feet, inches,
         metres, centimetres);
}

void convert(int feet, int inches, int *outMetres, int *outCentimetres) {
  double length = feet + (inches / 12.0);
  double metres = length * 0.3048;
  *outMetres = metres;  // truncate to integer
  *outCentimetres = rint((metres - *outMetres) * 100);
}

int main(void) {
  int feet, inches;
  getInput(&feet, &inches);
  int metres, centimetres;
  convert(feet, inches, &metres, &centimetres);
  printOutput(feet, inches, metres, centimetres);
  return 0;
}
```

````
