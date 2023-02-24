# Exercises

Many of these exercises are taken from past exams of APS105 Computer Fundamentals courses at University of Toronto. The solutions are provided in the answer boxes.

Headings in this page classify the exercises into different categories: **[Easy]**, **[Intermediate]**, and **[Challenging]**. I suggest you start by easy exercises and work your way up to the challenging ones.

**Question 4 in Winter 2018 Final Exam [Easy]**
Write a single C statement that declares a variable called `intPtrArray`, initialized to point to an array of 10 integers that is dynamically allocated.

````{admonition} Answer
:class: dropdown
```{code-block} c
int *intPtrArray = (int *)malloc(10 * sizeof(int));
```
````

**Question 2 in Fall 2015 Final Exam [Easy]**

Write one or more C statements that use `malloc` to dynamically allocate an array of $1000$ elements of type `double`. The allocated array should be called `list`.

````{admonition} Answer
:class: dropdown
```{code-block} c
double *list = (double *)malloc(1000 * sizeof(double));
```
````
