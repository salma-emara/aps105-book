# Exercises

Many of these exercises are taken from past exams of APS105 Computer Fundamentals courses at University of Toronto. The solutions are provided in the answer boxes.

Headings in this page classify the exercises into different categories: **[Easy]**, **[Intermediate]**, and **[Challenging]**. I suggest you start by easy exercises and work your way up to the challenging ones.


**Question 2 in Winter 2022 Final Exam [Easy]**

In a single C statement, define a data structure named `Student` that has three members: the `name` of the student as a string (`char*`), the `id` of the student as an `int`, and the `grades` of the student. The type of the `grades` of the student is a data structure **already** defined as follows:

```{code-block} c
struct marks {
  double labs[10];
  double exams[2];
};
```

In the same statement, declare one `Student` variable named `test` and an array named `allStudents` of $500$ `Student` elements.

````{admonition} Answer
:class: dropdown
```{code-block} c
  struct Student {
    char *name;
    int id;
    struct marks grades;
  } test, allStudents[500];
```
````


**Question 1 in Winter 2020 Final Exam [Easy]**

In a single C statement create a data structure called `AnimalSizes` having two elements, a string `name` and a size `length`. This same statement should create an array of this type called `snakes` with two entries.

Initialize each entry such that the first index has name `"Anaconda"` and `length` $3.7$, while the second index has the name `"Python"` and `length` $2.4$. You may do this in the same statement or using additional statements.

````{admonition} Answer
:class: dropdown
```{code-block} c
struct AnimalSizes {
    char name[20];
    double length;
} snakes[2] = {{"Anaconda", 3.7}, {"Python", 2.4}};
```
````

**Question 7 in Winter 2020 Final Exam [Intermediate]**

In various engineering applications, it is required to convert Polar to
Cartesian coordinates. The polar coordinates $(R, \theta)$ and rectangular coordinates $(x, y)$ are related as follows: 

$$x = R \cos(\theta) \mbox{ and } y = R \sin(\theta) $$

```{figure} ./images/q7-2019-final-image.png
:align: center
```

Complete the code below, which defines the data structures and a function that takes polar coordinates of a point and return the rectangular
coordinates. The angle is assumed to be in radians. Assuming the values passed to this function is in degrees, you need to convert the radian
value using the constant D2R below. 
    
```{code-block} c
#include <math.h>
const double D2R = 3.1415926535 / 180.0;

// rectangular coordinate structure
typedef struct rectV {



  
}

// polar coordinate structure
typedef struct polarC {  // angle in radians




}

// polar to rectangular
RectCoor polToRec(PolarCoor polin) {




  return rv;
}
```

````{admonition} Answer
:class: dropdown
```{code-block} c
#include <math.h>
const double D2R = M_PI / 180.0;

// rectangular coordinate structure
typedef struct rectV {
  double x;
  double y;
} RectCoor;

// polar coordinate structure
typedef struct polarC {  // angle in radians
  double theta;
  double r;
} PolarCoor;

// polar to rectangular
RectCoor polToRec(PolarCoor polin) {
  RectCoor rv;
  rv.x = polin.r * cos(polin.theta * D2R);
  rv.y = polin.r * sin(polin.theta * D2R);
  return rv;
}
```
````

**Question 3 in Winter 2018 Final Exam [Intermediate]**

Consider the following data structure definition:

```{code-block} c
typedef struct name {
  char *firstname;
  char *lastname;
} Name;

typedef struct employee {
  int SIN;
  int employeeNumber;
  Name *emplName;
} Empl;

Empl employees[1000];
```

Assume that all 1000 elements in the employees array have been initialized and none of the pointers
are NULL. Write a single C statement that declares a character variable `c` and assigns it the first
character of the last name of the second employee in the employees array.

````{admonition} Answer
:class: dropdown

The second employee is at index 1, so `employees[1]`.

The name is at `employees[1].emplName`, which is a pointer to `Name` structure.

To access the last name of the employee, we can use the arrow operator `->` to access the `lastname` field of the `Name` structure, `employees[1].emplName->lastname`.

The first character of the last name is at `employees[1].emplName->lastname[0]`.

```{code-block} c
char c = employees[1].emplName->lastname[0];
```
````

**Question 3 in Deferred Exam of Winter 2022 Final Exam [Intermediate]**

In the following two lines we create two data structures `petal` and `flower`. Write a single C statement that declares a variable named `Flower` of type `struct flower`. In the same statement, initialize the name of the `Flower` to `"Rose"`, the `num` of petals to `39` and the `color` of the petals to `"red"`.

```{code-block} c
struct petal {
  int num;
  char color[25];
};
struct flower {
  char name[25];
  struct petal Petals;
};
```

````{admonition} Answer
:class: dropdown
```{code-block} c
struct flower Flower = {"Rose", {39, "red"}};
```
````

**Question 5 in Winter 2022 Final Exam [Challenging]**

The following C program takes in two names from the user and saves them in the array of data structures `students`. However, the code does not output the expected output. When the user enters two different last names, the output is the last entered name for both the elements in the array. This is the output of an example run:

<pre>
Enter last name: <b>Adam</b>
Enter last name: <b>Jones</b>
Jones
Jones
</pre>

Re-write the `getNames` function **only** to have the following output:

<pre>
Enter last name: <b>Adam</b>
Enter last name: <b>Jones</b>
Adam
Jones
</pre>

```{code-block} c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
typedef struct student {
  char* lastName;
} Student;
  
void getNames(char* lastName, Student students[]) {
  for (int i = 0; i < 2; i++) {
    printf("Enter last name: ");
    scanf("%s", lastName);
    students[i].lastName = lastName;
  }
}
  
int main() {
  Student students[2];
  
  char* lastName = malloc(sizeof(char) * 20);
  getNames(lastName, students);
  
  for (int i = 0; i < 2; i++) {
    printf("%s\n", students[i].lastName);
  }
  free(lastName);
  lastName = NULL;
  return 0;
} 
```

````{admonition} Answer
:class: dropdown
```{code-block} c
void getNames(char* lastName, Student students[]) {
  for (int i = 0; i < 2; i++) {
    printf("Enter last name: ");
    scanf("%s", lastName);
    students[i].lastName = (char*) malloc(sizeof(char) * 20); // allocate memory for the string
    strcpy(students[i].lastName, lastName);
  }
}
```
````