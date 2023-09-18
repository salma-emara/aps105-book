# Double data type for real numbers

In the previous chapter, we developed a program to calculate the number of slices in a number of pizzas. The number of slices and pizzas were considered integers, i.e. whole numbers with no fractions. However, if a kid decided to take a bite and run 🏃‍♀️, we will be left with a fraction of a slice. At this point, we need fractional numbers/real numbers. Another example, if we want to convert temperatures from Celsius to Fahrenheit, or centimeters to inches, we need to use fractional numbers - with decimal component. In this section, we will see how to represent numbers using fractional in our programs.

(inch-cm)=
## Example: Convert Inches to Centimeters

Write a program that converts inches to centimeters. The program should prompt the user for a number of inches and then output the equivalent number of centimeters. The conversion factor is $2.54$ centimeters per inch. Download {download}`inches-to-centimeters.c <../../code/chapter2/inches2cm/inches-to-cm.c>` to get the following source code.

{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" input="3.7" output="Enter the number of inches to convert to cm: <b>3.7</b>
The number of centimeters is 9.40">
// Description: This program convert inches to centimeters
&#35;include &lt;stdio.h&gt;
<br>
int main(void){
  // Declare variables
  const double InchesToCm = 2.54;
  double inputInches, outputCm;
<br>
  // Prompt user for input
  printf("Enter the number of inches to convert to cm: ");
  scanf("%lf", &inputInches);
  // Convert inches to centimeters
  outputCm = inputInches * InchesToCm;
 <br>
  // Display output in 2 decimal places
  printf("The number of centimeters is %.2lf\n", outputCm);
  return 0;
}
</code-runner>
</pre>

Let's understand what each line is doing.

`const double InchesToCm = 2.54;`. 

* `const` is a keyword that indicates that the variable `InchesToCm` is a constant. The variable `InchesToCm` cannot be changed throughout the code. This will cause an error during compilation. 
  
  ````{admonition} Exercise: Change a constant variable
  :class: tip
  When I added in line 8 `InchesToCm = 2.53;`, which changes a `const` variable, the compiler gave me the following error. This is helpful because the `const` keyword guards against *mistakenly* changing a variable. 
    ```{figure} ./images/change-const-error.png
    :alt: Changing a constant variable
    :class: with-shadow
    :width: 400px
    :align: center

    Changing a constant variable compilation error
    
    ```
    ````

* `double` is a data type that indicates that the variable `InchesToCm` is a fractional number.   
  ```{admonition} Think! 
  :name: float-in-int
  What would happen if a number with decimal is stored in an `int` 🤔?

   If a number with decimal is stored in an `int`, the decimal part will be truncated. For example, if we store `2.54` in an `int`, the value actually stored will be `2`. 
  ```

* `2.54` is the value assigned to the variable `InchesToCm`.

`double inputInches, outputCm;` declares two variables of type `double`. The variables `inputInches` and `outputCm` are used to store the input and output values of the program. These inputs can be fractional numbers.

`printf("Enter the number of inches to convert to cm: ");` prints on the monitor a prompt to ask the user to enter inches to convert.

`scanf("%lf", &inputInches);` reads the input from the user and stores it in the variable `inputInches`. The `%lf` is a format specifier that indicates that the input is a fractional number. The `&` is the address-of operator that indicates the address of the variable `inputInches`. The address of a variable is the location in memory where the variable is stored. The `scanf` function will store the input in the memory location of the variable `inputInches`.

`outputCm = inputInches * InchesToCm;` will multiply the value in `inputInches` and `InchesToCm` and store the result in `outputCm`. The `*` is the multiplication operator.

`printf("The number of centimeters is %.2lf\n", outputCm);` prints on the monitor the value of `outputCm` with 2 decimal places. The `%lf` is a format specifier that indicates that the value is a fractional number. The `.2` indicates that the value should be printed with 2 decimal places.

<!-- **Output[^1]**
<pre>
Enter the number of inches to convert to cm: <b>3.7</b>
The number of centimeters is 9.40
</pre> -->

## Summary

So far we discussed two data types in C:

* `int`: It stores a whole number/integer, either 0, negative or positive. For example, 0, -1, or 100 are all integers. Format specifier of `int` is `%d`.
* `double`: It stores a fractional number, which is any number on the number line. For example, -2.1, 0.0001, or 3.14 are all fractional numbers. Format specifier of `double` is `%lf`. 

When you are planning your program, you must think of the variables you need and their data types. For example, if you have a variable storing:

* number of attendees: `int`
* price of a ticket: `double`
* number of protons in Calcium: `const int`
* value of $\pi$: `const double`

In the next section, we will see are these data types stored in the memory. 

{{quiz_embed | replace("%%FILENAME%%", "chapter-2/sec-1") }}