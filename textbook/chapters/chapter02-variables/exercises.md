# Exercises

Many of these exercises are taken from past exams of APS105 Computer Fundamentals courses at University of Toronto. The solutions are provided in the answer boxes.

## Math library Functions

### Practice 1

**Question 1 in Winter 2020 Final Exam**

Write a single C statement using no curly brackets that rounds a double-type variable named `value` to its nearest hundredths place, and assign the result to a new double-type variable named `approximateValue`. For example, rounding 0.843 to the nearest hundredth would give 0.84. You can use any of the C math library functions. Write your solution in the box below

````{admonition} Answer
:class: dropdown
```{code-block} c
double approximateValue = rint(value * 100) / 100;
```
````

### Practice 2

**Modified Version of Question 3 in Fall 2014 Midterm**

Write a single C statement that will compute the value of `r` according to the following expression,
and assign the value to `r`.

$r = \frac{x^n + 6 \times x^4}{\sin(y) + \cos(z)}$

You can assume that all the variables in the expression are already declared as double types, and that the math library (described by the header file math.h) is available, and that the value of y and z is in radians.

````{admonition} Answer
:class: dropdown
```{code-block} c
r = (pow(x, n) + 6 * pow(x, 4.0)) / (sin(y) + cos(z));
```
````

### Practice 3

**Question 5 in Winter 2018 Midterm Exam**

The variable `numApples` is an `int` type variable representing the number of apples in a barrel. The
owner of the apples is deciding whether to sell them in packages of $3$ or $5$ apples. Write a single
C statement that declares and initializes an `int` type variable called `leftover`. `leftover` should be
initialized to the minimum of two quantities: 1) the number of apples left over when the barrel of
apples is packaged into groups of $3$; 2) the number of apples left over when the barrel of apples is
packaged into groups of $5$.

**Hint:** Use a function in the `math` library

````{admonition} Answer
:class: dropdown
```{code-block} c
int leftover = fmin(numApples % 3, numApples % 5);
```
````

### Practice 4

**Question 8 in Winter 2019 Midterm Exam**

If you have a certain number of US dollars and wish to convert them to Canadian dollars, you could use the Canadian dollar to US dollar exchange rate (for example: 1 Canadian dollar = $0.75$ US dollar). Write a complete C program that prompts its user for the current Canadian dollar to US dollar exchange rate (e.g. $0.75$) and a value in US dollars, and then prints the value in Canadian dollars, rounding to the nearest hundredth. Your program will print the value with $6$ digits after the decimal point. Assume the user provides a valid exchange rate and US dollar amount.

Here is an example run of your program:
<pre>
Enter the exchange rate (1 CAD = ? USD): <b>0.75</b>
Enter the value in US dollars: <b>56</b>
The value in Canadian dollars is 74.670000.
</pre>

````{admonition} Answer
:class: dropdown
Download {download}`exercise-usd-to-cad.c <../../code/chapter2/exercise-usd-to-cad/exercise-usd-to-cad.c>` to get the following code.
```{code-block} c
// Sometimes in exams you won't be required 
// to add the #include statements
#include <stdio.h>
#include <math.h>
int main (void) {
    double exchangeRate = 0, cad = 0, usd = 0;
    printf("Enter the exchange rate (1 CAD = ? USD): ");
    scanf("%lf", &exchangeRate);
    printf("Enter the value in US dollars: ");
    scanf("%lf", &usd);
    cad = usd / exchangeRate;
    
    // rounding to the nearest hundredth
    double roundedCad = rint(cad * 100) / 100.0;
    printf("The value in Canadian dollars is %.6lf.\n", roundedCad); 
    //%.6lf and %.lf prints 6 digits after the decimal point
    return 0;
}
```
````

## Random Number Generation

### Practice 1

**Question 2 in Fall 2018 Final Exam**
Write a single C statement that generates a random even number in the range of [-150, 150] (inclusive), and uses it to declare and initialize an int-type variable `randomChoice`.

````{admonition} Answer
:class: dropdown
Get a range from -75 to 75. Then get from that 150, 148, ..., -2, 0, 2, ..., 148, 150.

```{code-block} c
int randomChoice = (rand() % 151 - 75) * 2;
```
````

### Practice 2

**Question 2 in Winter 2017 Final Exam**

Write a single C statement that declares a double variable `randomSelection`, and initializes it
with a number that is randomly selected from the following set: 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35,
0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95.

````{admonition} Answer
:class: dropdown
```{code-block} c
double randomSelection = (rand() % 19 + 1) * 0.05;
```

````

### Practice 3

**Question 2 in Fall 2022 Final Exam**

Write a single C statement that declares a `char` variable called `randomCharacter`, and initializes it to a random value draw from one of the three characters: 'A', 'B', 'C'.

````{admonition} Answer
:class: dropdown
```{code-block} c
char randomCharacter = 'A' + rand() % 3;
```
````
