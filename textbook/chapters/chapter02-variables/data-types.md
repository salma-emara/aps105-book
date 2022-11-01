# Data types

In the previous chapter, we developed a program to calculate the number of slices in a number of pizzas. The number of slices and pizzas were considered integers, i.e. whole numbers with no fractions. However, some operations may need fractional numbers. For example, if we want to convert temperatures from Celsius to Fahrenheit, or centimeters to inches, we need to use fractional numbers - with numbers after the decimal point. In this section, we will see how to represent numbers using fractional in our programs.

**Example**

> Write a program that converts inches input by a user to centimeters. The program should prompt the user for a number of inches and then output the equivalent number of centimeters. The conversion factor is $2.54$ centimeters per inch. Download {download}`inches-to-centimeters.c <../../code/chapter2/inches2cm/inches-to-cm.c>` to get started.
> ```c {.line-numbers}
> // Description: This program convert inches to centimeters
> #include <stdio.h>
>
> int main(void){
>   // Declare variables
>   const double InchesToCm = 2.54;
>   double inputInches, outputCm;
> 
>   // Prompt user for input
>   printf("Enter the number of inches to convert to cm: ");
>   scanf("%lf", &inputInches);
> 
>   // Convert inches to centimeters
>   outputCm = inputInches * InchesToCm;
> 
>   // Display output in 2 decimal places
>   printf("The number of centimeters is %.2lf\n", outputCm);
>   return 0;
>}
>```

To understand what's going on here, we can start with analyzing 

`const double InchesToCm = 2.54;`. 

`const` is a keyword that indicates that the variable `InchesToCm` is a constant. The variable `InchesToCm` cannot be changed throughout the code. This will cause an error during compilation. `double` is a data type that indicates that the variable `InchesToCm` is a fractional number. `2.54` is the value assigned to the variable `InchesToCm`.